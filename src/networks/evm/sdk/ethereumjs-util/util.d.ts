/**
 * The following methods are based on `ethereumjs/util`, thanks for their work
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/util
 * Distributed under the Mozilla Public License Version 2.0 software license, see the accompanying
 * file LICENSE or https://opensource.org/license/mpl-2-0/.
 */
/// <reference types="node" />
/**
 * Pads a `String` to have an even length
 * @param {String} value
 * @return {String} output
 */
export declare function padToEven(value: string): string;
/**
 * Converts a `Number` into a hex `String`
 * @param {Number} i
 * @return {String}
 */
export declare function intToHex(i: Number): string;
/**
 * Converts an `Number` to a `Buffer`
 * @param {Number} i
 * @return {Buffer}
 */
export declare function intToBuffer(i: Number): Buffer;
/**
 * Get the binary size of a string
 * @param {String} str
 * @return {Number}
 */
export declare function getBinarySize(str: string): number;
/**
 * Should be called to get utf8 from it's hex representation
 *
 * @method toUtf8
 * @param {String} hex
 * @returns {String} ascii string representation of hex value
 */
export declare function toUtf8(hex: string): string;
/**
 * Should be called to get ascii from it's hex representation
 *
 * @method toAscii
 * @param {String} hex
 * @returns {String} ascii string representation of hex value
 */
export declare function toAscii(hex: string): string;
/**
 * Should be called to get hex representation (prefixed by 0x) of utf8 string
 *
 * @method fromUtf8
 * @param {String} string
 * @param {Number} optional padding
 * @returns {String} hex representation of input string
 */
export declare function fromUtf8(stringValue: string): string;
/**
 * Should be called to get hex representation (prefixed by 0x) of ascii string
 *
 * @method fromAscii
 * @param {String} string
 * @param {Number} optional padding
 * @returns {String} hex representation of input string
 */
export declare function fromAscii(stringValue: string): string;
/**
 * getKeys([{a: 1, b: 2}, {a: 3, b: 4}], 'a') => [1, 3]
 *
 * @method getKeys get specific key from inner object array of objects
 * @param {String} params
 * @param {String} key
 * @param {Boolean} allowEmpty
 * @returns {Array} output just a simple array of output keys
 */
export declare function getKeys(params: string, key: string, allowEmpty: boolean): any[];
/**
 * Is the string a hex string.
 *
 * @method check if string is hex string of specific length
 * @param {String} value
 * @param {Number} length
 * @returns {Boolean} output the string is a hex string
 */
export declare function isHexString(value: string, length?: number): boolean;
/**
 * Node's Buffer.from() method does not seem to buffer numbers correctly out of the box.
 * This helper method formats the number correct for Buffer.from to return correct buffer.
 *
 * @param num - The number to convert to buffer.
 * @returns The number in buffer form.
 */
export declare function numberToBuffer(num: number): Buffer;
