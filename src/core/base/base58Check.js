'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.fromBase58Check = exports.toBase58Check = void 0;
const hash_1 = require('./hash');
const base_1 = require('@scure/base');
function toBase58Check(data) {
    const bytesCoder = (0, base_1.base58check)(hash_1.sha256);
    return bytesCoder.encode(Buffer.from(data));
}
exports.toBase58Check = toBase58Check;
function fromBase58Check(data) {
    const bytesCoder = (0, base_1.base58check)(hash_1.sha256);
    return Buffer.from(bytesCoder.decode(data));
}
exports.fromBase58Check = fromBase58Check;
