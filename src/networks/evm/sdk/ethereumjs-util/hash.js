'use strict';
/**
 * The following methods are based on `ethereumjs/util`, thanks for their work
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/util
 * Distributed under the Mozilla Public License Version 2.0 software license, see the accompanying
 * file LICENSE or https://opensource.org/license/mpl-2-0/.
 */
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
exports.rlphash =
    exports.keccakFromString =
    exports.keccak256 =
    exports.keccak =
        void 0;
const rlp = __importStar(require('./rlp'));
const helpers_1 = require('./helpers');
const core_1 = require('../../../../core');
const buffer_1 = require('buffer');
exports.keccak = core_1.base.keccak;
/**
 * Creates Keccak-256 hash of the input, alias for keccak(a, 256).
 * @param a The input data (Buffer)
 */
const keccak256 = function (a) {
    return (0, exports.keccak)(a, 256);
};
exports.keccak256 = keccak256;
/**
 * Creates Keccak hash of a utf-8 string input
 * @param a The input data (String)
 * @param bits (number = 256) The Keccak width
 */
const keccakFromString = function (a, bits = 256) {
    (0, helpers_1.assertIsString)(a);
    const buf = buffer_1.Buffer.from(a, 'utf8');
    return (0, exports.keccak)(buf, bits);
};
exports.keccakFromString = keccakFromString;
/**
 * Creates SHA-3 hash of the RLP encoded version of the input.
 * @param a The input data
 */
const rlphash = function (a) {
    return (0, exports.keccak)(rlp.encode(a));
};
exports.rlphash = rlphash;
