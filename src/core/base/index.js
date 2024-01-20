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
exports.randomBytes =
    exports.concatBytes =
    exports.reverseBuffer =
    exports.rsa =
    exports.aes =
    exports.md5 =
    exports.rlp =
        void 0;
__exportStar(require('./base58'), exports);
__exportStar(require('./base58Check'), exports);
__exportStar(require('./bech32'), exports);
__exportStar(require('./hex'), exports);
__exportStar(require('./base64'), exports);
__exportStar(require('./hash'), exports);
__exportStar(require('./hmac'), exports);
__exportStar(require('./utf8'), exports);
__exportStar(require('./bignumber-plus'), exports);
__exportStar(require('./precondtion'), exports);
exports.rlp = __importStar(require('../abi/rlp'));
__exportStar(require('./helper'), exports);
exports.md5 = __importStar(require('./md5'));
exports.aes = __importStar(require('./aes'));
exports.rsa = __importStar(require('./rsa'));
__exportStar(require('@scure/base'), exports);
__exportStar(require('@noble/hashes/sha256'), exports);
__exportStar(require('@noble/hashes/hmac'), exports);
__exportStar(require('@noble/hashes/ripemd160'), exports);
__exportStar(require('@noble/hashes/sha512'), exports);
__exportStar(require('@noble/hashes/sha3'), exports);
__exportStar(require('@noble/hashes/blake2b'), exports);
__exportStar(require('@noble/hashes/blake2s'), exports);
__exportStar(require('@noble/hashes/pbkdf2'), exports);
__exportStar(require('@noble/hashes/scrypt'), exports);
__exportStar(require('@noble/hashes/blake3'), exports);
const utils = __importStar(require('@noble/hashes/utils'));
const _randomBytes = require('randombytes');
function reverseBuffer(buffer) {
    if (buffer.length < 1) return buffer;
    let j = buffer.length - 1;
    let tmp = 0;
    for (let i = 0; i < buffer.length / 2; i++) {
        tmp = buffer[i];
        buffer[i] = buffer[j];
        buffer[j] = tmp;
        j--;
    }
    return buffer;
}
exports.reverseBuffer = reverseBuffer;
function concatBytes(b1, b2) {
    return utils.concatBytes(Uint8Array.from(b1), Uint8Array.from(b2));
}
exports.concatBytes = concatBytes;
function randomBytes(length) {
    return _randomBytes(length);
}
exports.randomBytes = randomBytes;
