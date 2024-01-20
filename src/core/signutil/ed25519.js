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
exports.fromSecret =
    exports.fromSeed =
    exports.privateKeyVerify =
    exports.publicKeyVerify =
    exports.publicKeyCreate =
    exports.verify =
    exports.sign =
        void 0;
const elliptic = __importStar(require('../elliptic'));
const base_1 = require('../base');
const bn_js_1 = __importDefault(require('bn.js'));
const ed25519 = new elliptic.eddsa('ed25519');
const curve = ed25519.curve;
function sign(message, secretKey) {
    let pk = secretKey;
    if (pk.length == 64) {
        pk = pk.slice(0, 32);
    }
    const key = ed25519.keyFromSecret(Array.from(pk));
    const signature = key.sign(Array.from(message)).toBytes();
    return Uint8Array.from(signature);
}
exports.sign = sign;
// note: publicKey and signature need be converted to an array
function verify(message, signature, publicKey) {
    const key = ed25519.keyFromPublic(Array.from(publicKey));
    return key.verify(Array.from(message), Array.from(signature));
}
exports.verify = verify;
function publicKeyCreate(secretKey) {
    let pk = secretKey;
    if (pk.length == 64) {
        pk = pk.slice(0, 32);
    }
    const key = ed25519.keyFromSecret(Array.from(pk));
    return Uint8Array.from(key.getPublic());
}
exports.publicKeyCreate = publicKeyCreate;
function publicKeyVerify(pubkey) {
    const point = ed25519.decodePoint(Array.from(pubkey));
    return curve.validate(point);
}
exports.publicKeyVerify = publicKeyVerify;
function privateKeyVerify(seckey) {
    const bn = new bn_js_1.default(Array.from(seckey));
    return bn.cmp(curve.n) < 0 && !bn.isZero();
}
exports.privateKeyVerify = privateKeyVerify;
// 32bytes
function fromSeed(seed) {
    const key = ed25519.keyFromSecret(Array.from(seed));
    const pk = Uint8Array.from(key.getPublic());
    return { publicKey: pk, secretKey: (0, base_1.concatBytes)(seed, pk) };
}
exports.fromSeed = fromSeed;
// 64bytes private key + public key
function fromSecret(secretKey) {
    const privateKey = secretKey.slice(0, 32);
    const key = ed25519.keyFromSecret(Array.from(privateKey));
    return {
        publicKey: Uint8Array.from(key.getPublic()),
        secretKey: Uint8Array.from(privateKey),
    };
}
exports.fromSecret = fromSecret;
