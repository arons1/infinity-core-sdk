'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.string2BigNumber =
    exports.bigNumber2String =
    exports.fromBigIntHex =
    exports.toBigIntHex =
        void 0;
const index_1 = require('../index');
const precondtion_1 = require('./precondtion');
const toBigIntHex = value => {
    let hexStr = value.integerValue().toString(16);
    hexStr = '0x' + hexStr;
    return hexStr;
};
exports.toBigIntHex = toBigIntHex;
const fromBigIntHex = value => {
    (0, precondtion_1.check)(
        value && value.startsWith('0x'),
        `Invalid hex string. value: ${value}`,
    );
    return new index_1.BigNumber(value).integerValue();
};
exports.fromBigIntHex = fromBigIntHex;
const bigNumber2String = (value, base) => {
    return value.integerValue().toString(base);
};
exports.bigNumber2String = bigNumber2String;
const string2BigNumber = (n, base) => {
    return new index_1.BigNumber(n, base);
};
exports.string2BigNumber = string2BigNumber;
