'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.isHexString = void 0;
function isHexString(value, length) {
    if (!value.match(/^0x[0-9A-Fa-f]*$/)) {
        return false;
    }
    return !(length && value.length !== 2 + 2 * length);
}
exports.isHexString = isHexString;
