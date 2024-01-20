'use strict';
var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              var desc = Object.getOwnPropertyDescriptor(m, k);
              if (
                  !desc ||
                  ('get' in desc
                      ? !m.__esModule
                      : desc.writable || desc.configurable)
              ) {
                  desc = {
                      enumerable: true,
                      get: function () {
                          return m[k];
                      },
                  };
              }
              Object.defineProperty(o, k2, desc);
          }
        : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
          });
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function (o, v) {
              Object.defineProperty(o, 'default', {
                  enumerable: true,
                  value: v,
              });
          }
        : function (o, v) {
              o['default'] = v;
          });
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (
                    k !== 'default' &&
                    Object.prototype.hasOwnProperty.call(mod, k)
                )
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.wrapPEM =
    exports.unwrapPEM =
    exports.covertPublicKeyFromPkcs8ToPkcs1 =
    exports.covertPublicKeyFromPkcs8ToPkix =
    exports.genKeyPair =
    exports.decodeAny =
    exports.encodeAny =
    exports.decode =
    exports.encode =
        void 0;
const jsrsasign = __importStar(require('jsrsasign'));
var BigInteger = jsrsasign.BigInteger;
const hex_1 = require('./hex');
const base64_1 = require('./base64');
// encode plain(utf-8) publicKey (base64)
function encode(plain, rsaKey) {
    let cipher = jsrsasign.KJUR.crypto.Cipher.encrypt(plain, rsaKey, 'RSA');
    return (0, hex_1.fromHex)(cipher);
}
exports.encode = encode;
// decode cipher(hex) privateKey(base64)
function decode(cipherHex, rsaKey) {
    return jsrsasign.KJUR.crypto.Cipher.decrypt(cipherHex, rsaKey, 'RSA');
}
exports.decode = decode;
function encodeAny(plain, publicKey) {
    const rsaKey = loadRsaKeyFromPkcs1(publicKey);
    // @ts-ignore
    const keySize = Math.floor((rsaKey.n.bitLength() + 7) / 8);
    const srcSize = plain.length;
    let offSet = 0;
    const once = keySize - 11;
    const bufferList = [];
    while (true) {
        if (offSet + once >= srcSize) {
            // encrypt one part
            const bytesOnce = encode(plain.slice(offSet), rsaKey);
            bufferList.push(bytesOnce);
            break;
        }
        const bytesOnce = encode(plain.slice(offSet, offSet + once), rsaKey);
        bufferList.push(bytesOnce);
        offSet += once;
    }
    return jsrsasign.hextob64((0, hex_1.toHex)(Buffer.concat(bufferList)));
}
exports.encodeAny = encodeAny;
function decodeAny(cipher, privateKey) {
    const a = jsrsasign.RSAKey.getHexValueArrayOfChildrenFromHex(
        jsrsasign.b64tohex(privateKey),
    );
    const rsaKey = new jsrsasign.RSAKey();
    // @ts-ignore
    rsaKey.setPrivateEx(a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
    // @ts-ignore
    const keySize = Math.floor((rsaKey.n.bitLength() + 7) / 8);
    const cipherByes = (0, base64_1.fromBase64)(cipher);
    const srcSize = cipherByes.length;
    let offSet = 0;
    const bufferList = [];
    while (true) {
        if (offSet + keySize >= srcSize) {
            // decrypt one part
            const once = decode(
                (0, hex_1.toHex)(cipherByes.slice(offSet)),
                rsaKey,
            );
            bufferList.push(once);
            break;
        }
        const once = decode(
            (0, hex_1.toHex)(cipherByes.slice(offSet, offSet + keySize)),
            rsaKey,
        );
        bufferList.push(once);
        offSet += keySize;
    }
    return bufferList.join('');
}
exports.decodeAny = decodeAny;
// get key pair (pkcs#1 base64)
function genKeyPair(keyBit) {
    let key = jsrsasign.KEYUTIL.generateKeypair('RSA', keyBit);
    let privateKey = jsrsasign.KEYUTIL.getPEM(key.prvKeyObj, 'PKCS1PRV');
    let publicKey = jsrsasign.KEYUTIL.getPEM(key.pubKeyObj);
    const pkcs1PubKey = covertPublicKeyFromPkcs8ToPkcs1(
        unwrapPEM(publicKey, true),
    );
    return { privateKey: unwrapPEM(privateKey, false), publicKey: pkcs1PubKey };
}
exports.genKeyPair = genKeyPair;
// convert publicKey (base64) from pkcs#8 to pkcs#1
function covertPublicKeyFromPkcs8ToPkix(b64) {
    let rsaKey = jsrsasign.KEYUTIL.getKey(wrapPEM(b64, true));
    const first_sequence = new jsrsasign.KJUR.asn1.DERSequence({
        array: [
            new jsrsasign.KJUR.asn1.DERObjectIdentifier({
                oid: '1.2.840.113549.1.1.1',
            }),
            new jsrsasign.KJUR.asn1.DERNull(),
        ],
    });
    const second_sequence = new jsrsasign.KJUR.asn1.DERSequence({
        array: [
            // @ts-ignore
            new jsrsasign.KJUR.asn1.DERInteger({ bigint: rsaKey.n }),
            // @ts-ignore
            new jsrsasign.KJUR.asn1.DERInteger({ int: rsaKey.e }),
        ],
    });
    const bit_string = new jsrsasign.KJUR.asn1.DERBitString({
        // @ts-ignore
        hex: '00' + second_sequence.getEncodedHex(),
    });
    const seq = new jsrsasign.KJUR.asn1.DERSequence({
        // @ts-ignore
        array: [first_sequence, bit_string],
    });
    // @ts-ignore
    return jsrsasign.hextob64(seq.getEncodedHex());
}
exports.covertPublicKeyFromPkcs8ToPkix = covertPublicKeyFromPkcs8ToPkix;
// load pkcs#1 key (base64)
// convert publicKey (base64) from pkcs#8 to pkcs#1
function covertPublicKeyFromPkcs8ToPkcs1(b64) {
    let rsaKey = jsrsasign.KEYUTIL.getKey(wrapPEM(b64, true));
    const seq = new jsrsasign.KJUR.asn1.DERSequence({
        array: [
            // @ts-ignore
            new jsrsasign.KJUR.asn1.DERInteger({ bigint: rsaKey.n }),
            // @ts-ignore
            new jsrsasign.KJUR.asn1.DERInteger({ int: rsaKey.e }),
        ],
    });
    // @ts-ignore
    return jsrsasign.hextob64(seq.getEncodedHex());
}
exports.covertPublicKeyFromPkcs8ToPkcs1 = covertPublicKeyFromPkcs8ToPkcs1;
// load pkcs#1 key (base64)
function loadRsaKeyFromPkcs1(publicKeyB64) {
    const publicKey = jsrsasign.b64tohex(publicKeyB64);
    if (!jsrsasign.ASN1HEX.isASN1HEX(publicKey)) {
        throw new Error('keyHex is not ASN.1 hex string');
    }
    let ids = jsrsasign.ASN1HEX.getChildIdx(publicKey, 0);
    const rsaKey = new jsrsasign.RSAKey();
    const nHex = jsrsasign.ASN1HEX.getV(publicKey, ids[0]);
    // @ts-ignore
    rsaKey.n = new BigInteger(nHex, 16);
    const eHex = jsrsasign.ASN1HEX.getV(publicKey, ids[1]);
    // @ts-ignore
    rsaKey.e = parseInt(eHex, 16);
    // @ts-ignore
    rsaKey.isPublic = true;
    // @ts-ignore
    rsaKey.isPrivate = false;
    return rsaKey;
}
// from pem get key (base64)
function unwrapPEM(pem, pub) {
    const header = pub ? 'PUBLIC KEY' : 'RSA PRIVATE KEY';
    return jsrsasign.hextob64(jsrsasign.pemtohex(pem, header));
}
exports.unwrapPEM = unwrapPEM;
// from key (base64) get pem
function wrapPEM(b64, pub) {
    const header = pub ? 'PUBLIC KEY' : 'RSA PRIVATE KEY';
    return jsrsasign.hextopem(jsrsasign.b64tohex(b64), header);
}
exports.wrapPEM = wrapPEM;
