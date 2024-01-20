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
var __exportStar =
    (this && this.__exportStar) ||
    function (m, exports) {
        for (var p in m)
            if (
                p !== 'default' &&
                !Object.prototype.hasOwnProperty.call(exports, p)
            )
                __createBinding(exports, m, p);
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.rsa =
    exports.cryptoJS =
    exports.secp256k1 =
    exports.ed25519 =
    exports.Long =
    exports._m0 =
    exports.protobuf =
    exports.typeforce =
    exports.safeBuffer =
    exports.BigNumber =
    exports.BN =
    exports.math =
    exports.signUtil =
    exports.abi =
    exports.elliptic =
    exports.bip39 =
    exports.bip32 =
    exports.base =
        void 0;
// hash/codec implemnt such as  sha256/base58/base64/hex/bech32.
exports.base = __importStar(require('./base'));
// bip32 Seed - Master private key - Derived private key
exports.bip32 = __importStar(require('./bip32'));
// bip39 Mnemonics - Seeds
exports.bip39 = __importStar(require('./bip39'));
// Encryption library, support secp256k1 and ed25519
exports.elliptic = __importStar(require('./elliptic'));
// abi
exports.abi = __importStar(require('./abi'));
exports.signUtil = __importStar(require('./signutil'));
exports.math = __importStar(require('./math'));
const bn_js_1 = __importDefault(require('bn.js'));
exports.BN = bn_js_1.default;
const bignumber_js_1 = __importDefault(require('bignumber.js'));
exports.BigNumber = bignumber_js_1.default;
const safe_buffer_1 = __importDefault(require('safe-buffer'));
exports.safeBuffer = safe_buffer_1.default;
const typeforce = require('typeforce');
exports.typeforce = typeforce;
exports.protobuf = __importStar(require('protobufjs'));
exports._m0 = __importStar(require('protobufjs/minimal'));
const long_1 = __importDefault(require('long'));
exports.Long = long_1.default;
exports.ed25519 = __importStar(require('@noble/ed25519'));
exports.secp256k1 = __importStar(require('@noble/secp256k1'));
__exportStar(require('bigint-conversion'), exports);
__exportStar(require('bigint-crypto-utils'), exports);
const cryptoJS = __importStar(require('crypto-js'));
exports.cryptoJS = cryptoJS;
const rsa = __importStar(require('jsrsasign'));
exports.rsa = rsa;
