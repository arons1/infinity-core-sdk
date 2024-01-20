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
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.loadUncompressedPublicKey =
    exports.loadCompressedPublicKey =
    exports.publicKeyConvert =
    exports.publicKeyCreate =
    exports.publicKeyVerify =
    exports.privateKeyVerify =
    exports.loadPublicKey =
    exports.recover =
    exports.verifyWithNoRecovery =
    exports.verify =
    exports.getV =
    exports.sign =
        void 0;
const elliptic = __importStar(require('../elliptic'));
const ec = new elliptic.ec('secp256k1');
const base_1 = require('../base');
const bn_js_1 = __importDefault(require('bn.js'));
function sign(message, seckey, canonical = true) {
    const sig = ec.sign(Array.from(message), Buffer.from(seckey), {
        canonical: canonical,
    });
    return { signature: sig.toBytes(), recovery: sig.recoveryParam };
}
exports.sign = sign;
function getV(message, r, s, pubkey, canonical = true) {
    const p = loadPublicKey(pubkey);
    if (p == null) {
        throw new Error('pubkey error');
    }
    const point = ec.keyPair({ pub: { x: p.x, y: p.y } }).getPublic();
    return ec.getKeyRecoveryParam(message, { r: r, s: s }, point, canonical);
}
exports.getV = getV;
function verify(message, signature, recovery, publicKey) {
    const r = recover(signature, recovery, message, true);
    if (r == null) {
        return false;
    }
    const p = publicKeyConvert(publicKey, true);
    if (p == null) {
        return false;
    }
    return r.equals(p);
}
exports.verify = verify;
function verifyWithNoRecovery(message, signature, publicKey) {
    const p = loadPublicKey(publicKey);
    if (p == null) {
        throw new Error('pubkey error');
    }
    const kp = ec.keyPair({ pub: { x: p.x, y: p.y } });
    const sigObj = {
        r: (0, base_1.toHex)(signature.slice(0, 32)),
        s: (0, base_1.toHex)(signature.slice(32, 64)),
    };
    return kp.verify(message, sigObj);
}
exports.verifyWithNoRecovery = verifyWithNoRecovery;
function recover(sig, recid, msg32, compress) {
    const sigObj = {
        r: Array.from(sig.slice(0, 32)),
        s: Array.from(sig.slice(32, 64)),
    };
    const sigr = new bn_js_1.default(sigObj.r);
    const sigs = new bn_js_1.default(sigObj.s);
    if (sigr.cmp(ec.curve.n) >= 0 || sigs.cmp(ec.curve.n) >= 0) return null;
    if (sigr.isZero() || sigs.isZero()) return null;
    // Can throw `throw new Error('Unable to find sencond key candinate');`
    let point;
    try {
        point = ec.recoverPubKey(Array.from(msg32), sigObj, recid, null);
    } catch (err) {
        return null;
    }
    return Buffer.from(point.encode(null, compress));
}
exports.recover = recover;
function loadPublicKey(pubKey) {
    const pk = Buffer.from(pubKey);
    // length should be validated in interface
    const first = pk[0];
    switch (first) {
        case 0x02:
        case 0x03:
            if (pk.length !== 33) return null;
            return loadCompressedPublicKey(first, pk.subarray(1, 33));
        case 0x04:
        case 0x06:
        case 0x07:
            if (pk.length !== 65) return null;
            return loadUncompressedPublicKey(
                first,
                pk.subarray(1, 33),
                pk.subarray(33, 65),
            );
        default:
            return null;
    }
}
exports.loadPublicKey = loadPublicKey;
function privateKeyVerify(seckey) {
    const bn = new bn_js_1.default(Array.from(seckey));
    return bn.cmp(ec.curve.n) < 0 && !bn.isZero();
}
exports.privateKeyVerify = privateKeyVerify;
function publicKeyVerify(pubkey) {
    const pair = loadPublicKey(pubkey);
    return pair !== null;
}
exports.publicKeyVerify = publicKeyVerify;
function publicKeyCreate(seckey, compress) {
    const point = ec.keyFromPrivate(Array.from(seckey), 'bytes').getPublic();
    return Buffer.from(point.encode(null, compress));
}
exports.publicKeyCreate = publicKeyCreate;
function publicKeyConvert(pubkey, compress) {
    const p = loadPublicKey(pubkey);
    if (p == null) {
        return null;
    }
    const point = ec.keyPair({ pub: { x: p.x, y: p.y } }).getPublic();
    return Buffer.from(point.encode(null, compress));
}
exports.publicKeyConvert = publicKeyConvert;
function loadCompressedPublicKey(first, xbuf) {
    let x = new bn_js_1.default(Array.from(xbuf));
    // overflow
    if (x.cmp(ec.curve.p) >= 0) return null;
    const xx = x.toRed(ec.curve.red);
    // compute corresponding Y
    let y = xx.redSqr().redIMul(xx).redIAdd(ec.curve.b).redSqrt();
    if ((first === 0x03) !== y.isOdd()) y = y.redNeg();
    return { x: xx, y: y };
}
exports.loadCompressedPublicKey = loadCompressedPublicKey;
function loadUncompressedPublicKey(first, xbuf, ybuf) {
    let x = new bn_js_1.default(Array.from(xbuf));
    let y = new bn_js_1.default(Array.from(ybuf));
    // overflow
    if (x.cmp(ec.curve.p) >= 0 || y.cmp(ec.curve.p) >= 0) return null;
    const xx = x.toRed(ec.curve.red);
    const yy = y.toRed(ec.curve.red);
    // is odd flag
    if ((first === 0x06 || first === 0x07) && yy.isOdd() !== (first === 0x07))
        return null;
    // x*x*x + b = y*y
    const x3 = xx.redSqr().redIMul(xx);
    if (!yy.redSqr().redISub(x3.redIAdd(ec.curve.b)).isZero()) return null;
    return { x: xx, y: yy };
}
exports.loadUncompressedPublicKey = loadUncompressedPublicKey;
