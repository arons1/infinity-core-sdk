'use strict';
/**
 * The following methods are based on `ethereumjs/util`, thanks for their work
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/util
 * Distributed under the Mozilla Public License Version 2.0 software license, see the accompanying
 * file LICENSE or https://opensource.org/license/mpl-2-0/.
 */
Object.defineProperty(exports, '__esModule', { value: true });
exports.numberToBuffer =
    exports.isHexString =
    exports.getKeys =
    exports.fromAscii =
    exports.fromUtf8 =
    exports.toAscii =
    exports.toUtf8 =
    exports.getBinarySize =
    exports.intToBuffer =
    exports.intToHex =
    exports.padToEven =
        void 0;
const core_1 = require('../../../../core');
/**
 * Pads a `String` to have an even length
 * @param {String} value
 * @return {String} output
 */
function padToEven(value) {
    let a = value; // eslint-disable-line
    if (typeof a !== 'string') {
        throw new Error(
            `[ethjs-util] while padding to even, value must be string, is currently ${typeof a}, while padToEven.`,
        );
    }
    if (a.length % 2) {
        a = `0${a}`;
    }
    return a;
}
exports.padToEven = padToEven;
/**
 * Converts a `Number` into a hex `String`
 * @param {Number} i
 * @return {String}
 */
function intToHex(i) {
    const hex = i.toString(16); // eslint-disable-line
    return `0x${hex}`;
}
exports.intToHex = intToHex;
/**
 * Converts an `Number` to a `Buffer`
 * @param {Number} i
 * @return {Buffer}
 */
function intToBuffer(i) {
    const hex = intToHex(i);
    return Buffer.from(padToEven(hex.slice(2)), 'hex');
}
exports.intToBuffer = intToBuffer;
/**
 * Get the binary size of a string
 * @param {String} str
 * @return {Number}
 */
function getBinarySize(str) {
    if (typeof str !== 'string') {
        throw new Error(
            `[ethjs-util] while getting binary size, method getBinarySize requires input 'str' to be type String, got '${typeof str}'.`,
        );
    }
    return Buffer.byteLength(str, 'utf8');
}
exports.getBinarySize = getBinarySize;
/**
 * Should be called to get utf8 from it's hex representation
 *
 * @method toUtf8
 * @param {String} hex
 * @returns {String} ascii string representation of hex value
 */
function toUtf8(hex) {
    const bufferValue = new Buffer(
        padToEven(core_1.base.stripHexPrefix(hex).replace(/^0+|0+$/g, '')),
        'hex',
    );
    return bufferValue.toString('utf8');
}
exports.toUtf8 = toUtf8;
/**
 * Should be called to get ascii from it's hex representation
 *
 * @method toAscii
 * @param {String} hex
 * @returns {String} ascii string representation of hex value
 */
function toAscii(hex) {
    var str = ''; // eslint-disable-line
    var i = 0,
        l = hex.length; // eslint-disable-line
    if (hex.substring(0, 2) === '0x') {
        i = 2;
    }
    for (; i < l; i += 2) {
        const code = parseInt(hex.substr(i, 2), 16);
        str += String.fromCharCode(code);
    }
    return str;
}
exports.toAscii = toAscii;
/**
 * Should be called to get hex representation (prefixed by 0x) of utf8 string
 *
 * @method fromUtf8
 * @param {String} string
 * @param {Number} optional padding
 * @returns {String} hex representation of input string
 */
function fromUtf8(stringValue) {
    const str = new Buffer(stringValue, 'utf8');
    return `0x${padToEven(str.toString('hex')).replace(/^0+|0+$/g, '')}`;
}
exports.fromUtf8 = fromUtf8;
/**
 * Should be called to get hex representation (prefixed by 0x) of ascii string
 *
 * @method fromAscii
 * @param {String} string
 * @param {Number} optional padding
 * @returns {String} hex representation of input string
 */
function fromAscii(stringValue) {
    var hex = ''; // eslint-disable-line
    for (var i = 0; i < stringValue.length; i++) {
        // eslint-disable-line
        const code = stringValue.charCodeAt(i);
        const n = code.toString(16);
        hex += n.length < 2 ? `0${n}` : n;
    }
    return `0x${hex}`;
}
exports.fromAscii = fromAscii;
/**
 * getKeys([{a: 1, b: 2}, {a: 3, b: 4}], 'a') => [1, 3]
 *
 * @method getKeys get specific key from inner object array of objects
 * @param {String} params
 * @param {String} key
 * @param {Boolean} allowEmpty
 * @returns {Array} output just a simple array of output keys
 */
function getKeys(params, key, allowEmpty) {
    if (!Array.isArray(params)) {
        throw new Error(
            `[ethjs-util] method getKeys expecting type Array as 'params' input, got '${typeof params}'`,
        );
    }
    if (typeof key !== 'string') {
        throw new Error(
            `[ethjs-util] method getKeys expecting type String for input 'key' got '${typeof key}'.`,
        );
    }
    // eslint-disable-line
    var result = [];
    for (var i = 0; i < params.length; i++) {
        // eslint-disable-line
        var value = params[i][key];
        // eslint-disable-line
        if (allowEmpty && !value) {
            value = '';
        } else if (typeof value !== 'string') {
            throw new Error('invalid abi');
        }
        result.push(value);
    }
    return result;
}
exports.getKeys = getKeys;
/**
 * Is the string a hex string.
 *
 * @method check if string is hex string of specific length
 * @param {String} value
 * @param {Number} length
 * @returns {Boolean} output the string is a hex string
 */
function isHexString(value, length) {
    if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
        return false;
    }
    if (length && value.length !== 2 + 2 * length) {
        return false;
    }
    return true;
}
exports.isHexString = isHexString;
/**
 * Node's Buffer.from() method does not seem to buffer numbers correctly out of the box.
 * This helper method formats the number correct for Buffer.from to return correct buffer.
 *
 * @param num - The number to convert to buffer.
 * @returns The number in buffer form.
 */
function numberToBuffer(num) {
    const hexVal = num.toString(16);
    const prepend = hexVal.length % 2 ? '0' : '';
    return Buffer.from(prepend + hexVal, 'hex');
}
exports.numberToBuffer = numberToBuffer;
