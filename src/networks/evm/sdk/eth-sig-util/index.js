'use strict';
/**
 * The following methods are based on `metamask/eth-sig-util`, thanks for their work
 * https://github.com/MetaMask/eth-sig-util
 * Copyright (c) 2020 MetaMask
 * Distributed under the ISC software license, see the accompanying
 * file LICENSE or https://opensource.org/license/isc-license-txt/.
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
Object.defineProperty(exports, '__esModule', { value: true });
exports.isNullish = exports.legacyToBuffer = exports.padWithZeroes = void 0;
__exportStar(require('./sign-typed-data'), exports);
__exportStar(require('./encryption'), exports);
const ethereumjs_util_1 = require('../ethereumjs-util');
/**
 * Pads the front of the given hex string with zeroes until it reaches the
 * target length. If the input string is already longer than or equal to the
 * target length, it is returned unmodified.
 *
 * If the input string is "0x"-prefixed or not a hex string, an error will be
 * thrown.
 *
 * @param hexString - The hexadecimal string to pad with zeroes.
 * @param targetLength - The target length of the hexadecimal string.
 * @returns The input string front-padded with zeroes, or the original string
 * if it was already greater than or equal to to the target length.
 */
function padWithZeroes(hexString, targetLength) {
    if (hexString !== '' && !/^[a-f0-9]+$/iu.test(hexString)) {
        throw new Error(
            `Expected an unprefixed hex string. Received: ${hexString}`,
        );
    }
    if (targetLength < 0) {
        throw new Error(
            `Expected a non-negative integer target length. Received: ${targetLength}`,
        );
    }
    return String.prototype.padStart.call(hexString, targetLength, '0');
}
exports.padWithZeroes = padWithZeroes;
/**
 * Convert a value to a Buffer. This function should be equivalent to the `toBuffer` function in
 * `ethereumjs-util@5.2.1`.
 *
 * @param value - The value to convert to a Buffer.
 * @returns The given value as a Buffer.
 */
function legacyToBuffer(value) {
    return typeof value === 'string' &&
        !(0, ethereumjs_util_1.isHexString)(value)
        ? Buffer.from(value)
        : (0, ethereumjs_util_1.toBuffer)(value);
}
exports.legacyToBuffer = legacyToBuffer;
/**
 * Returns `true` if the given value is nullish.
 *
 * @param value - The value being checked.
 * @returns Whether the value is nullish.
 */
function isNullish(value) {
    return value === null || value === undefined;
}
exports.isNullish = isNullish;
