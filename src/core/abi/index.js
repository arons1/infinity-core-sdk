'use strict';
/**
 * Mozilla Public License Version 2.0
 *
 *
 * https://github.com/ethereumjs/ethereumjs-monorepo/blob/master/packages/util/LICENSE
 *
 * */
Object.defineProperty(exports, '__esModule', { value: true });
exports.SoliditySHA3 = exports.RawEncode = exports.ABI = void 0;
const ABI = require('./abi.js');
exports.ABI = ABI;
function RawEncode(types, values) {
    return ABI.rawEncode(types, values);
}
exports.RawEncode = RawEncode;
function SoliditySHA3(types, values) {
    return ABI.soliditySHA3(types, values);
}
exports.SoliditySHA3 = SoliditySHA3;
