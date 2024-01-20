'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.fromBech32 = exports.toBech32 = void 0;
const base_1 = require('@scure/base');
function toBech32(prefix, data) {
    const a = Buffer.from(data);
    const bit5 = base_1.bech32.toWords(Uint8Array.from(a));
    return base_1.bech32.encode(prefix, bit5);
}
exports.toBech32 = toBech32;
function fromBech32(data, limit) {
    const d = base_1.bech32.decode(data, limit);
    const bit8 = base_1.bech32.fromWords(d.words);
    return [d.prefix, Buffer.from(bit8)];
}
exports.fromBech32 = fromBech32;
