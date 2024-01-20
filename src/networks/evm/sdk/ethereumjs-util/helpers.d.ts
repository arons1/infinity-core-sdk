/**
 * The following methods are based on `ethereumjs/util`, thanks for their work
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/util
 * Distributed under the Mozilla Public License Version 2.0 software license, see the accompanying
 * file LICENSE or https://opensource.org/license/mpl-2-0/.
 */
/// <reference types="node" />
/**
 * Throws if a string is not hex prefixed
 * @param {string} input string to check hex prefix of
 */
export declare const assertIsHexString: (input: string) => void;
/**
 * Throws if input is not a buffer
 * @param {Buffer} input value to check
 */
export declare const assertIsBuffer: (input: Buffer) => void;
/**
 * Throws if input is not an array
 * @param {number[]} input value to check
 */
export declare const assertIsArray: (input: number[]) => void;
/**
 * Throws if input is not a string
 * @param {string} input value to check
 */
export declare const assertIsString: (input: string) => void;
