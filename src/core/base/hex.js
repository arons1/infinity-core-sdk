'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.isHexPrefixed =
    exports.stripHexPrefix =
    exports.fromHex =
    exports.toHex =
        void 0;
function toHex(data, addPrefix = false) {
    const buffer = Buffer.from(data);
    return addPrefix ? '0x' + buffer.toString('hex') : buffer.toString('hex');
}
exports.toHex = toHex;
function fromHex(data) {
    if (data.startsWith('0x')) {
        data = data.substring(2);
    }
    return Buffer.from(data, 'hex');
}
exports.fromHex = fromHex;
function stripHexPrefix(hex) {
    if (hex.startsWith('0x')) {
        return hex.substring(2);
    }
    return hex;
}
exports.stripHexPrefix = stripHexPrefix;
function isHexPrefixed(hex) {
    return hex.startsWith('0x');
}
exports.isHexPrefixed = isHexPrefixed;
