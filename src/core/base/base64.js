'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.fromBase64 = exports.toBase64 = void 0;
const base_1 = require('@scure/base');
function toBase64(data) {
    const a = Buffer.from(data);
    return base_1.base64.encode(Uint8Array.from(a));
}
exports.toBase64 = toBase64;
function fromBase64(data) {
    return base_1.base64.decode(data);
}
exports.fromBase64 = fromBase64;
