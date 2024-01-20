'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.base58 = exports.fromBase58 = exports.toBase58 = void 0;
const base_1 = require('@scure/base');
Object.defineProperty(exports, 'base58', {
    enumerable: true,
    get: function () {
        return base_1.base58;
    },
});
function toBase58(data) {
    const a = Buffer.from(data);
    return base_1.base58.encode(Uint8Array.from(a));
}
exports.toBase58 = toBase58;
function fromBase58(data) {
    return base_1.base58.decode(data);
}
exports.fromBase58 = fromBase58;
