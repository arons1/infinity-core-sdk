'use strict';
/**
 * The following methods are based on `ethereumjs/util`, thanks for their work
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/util
 * Distributed under the Mozilla Public License Version 2.0 software license, see the accompanying
 * file LICENSE or https://opensource.org/license/mpl-2-0/.
 */
Object.defineProperty(exports, '__esModule', { value: true });
exports.toType =
    exports.TypeOutput =
    exports.bnToRlp =
    exports.bnToUnpaddedBuffer =
    exports.validateNoLeadingZeroes =
    exports.bnToHex =
        void 0;
const core_1 = require('../../../../core');
const util_1 = require('./util');
const bytes_1 = require('./bytes');
/**
 * Convert BN to 0x-prefixed hex string.
 */
function bnToHex(value) {
    return `0x${value.toString(16)}`;
}
exports.bnToHex = bnToHex;
/**
 * Checks provided Buffers for leading zeroes and throws if found.
 *
 * Examples:
 *
 * Valid values: 0x1, 0x, 0x01, 0x1234
 * Invalid values: 0x0, 0x00, 0x001, 0x0001
 *
 * Note: This method is useful for validating that RLP encoded integers comply with the rule that all
 * integer values encoded to RLP must be in the most compact form and contain no leading zero bytes
 * @param values An object containing string keys and Buffer values
 * @throws if any provided value is found to have leading zero bytes
 */
const validateNoLeadingZeroes = function (values) {
    for (const [k, v] of Object.entries(values)) {
        if (v !== undefined && v.length > 0 && v[0] === 0) {
            throw new Error(
                `${k} cannot have leading zeroes, received: ${v.toString('hex')}`,
            );
        }
    }
};
exports.validateNoLeadingZeroes = validateNoLeadingZeroes;
/**
 * Convert value from BN to an unpadded Buffer
 * (useful for RLP transport)
 * @param value value to convert
 */
function bnToUnpaddedBuffer(value) {
    // Using `bn.toArrayLike(Buffer)` instead of `bn.toBuffer()`
    // for compatibility with browserify and similar tools
    return (0, bytes_1.unpadBuffer)(value.toArrayLike(Buffer));
}
exports.bnToUnpaddedBuffer = bnToUnpaddedBuffer;
/**
 * Convert value from BN to RLP (unpadded buffer)
 * @param value value to convert
 */
function bnToRlp(value) {
    // Using `bn.toArrayLike(Buffer)` instead of `bn.toBuffer()`
    // for compatibility with browserify and similar tools
    return (0, bytes_1.unpadBuffer)(value.toArrayLike(Buffer));
}
exports.bnToRlp = bnToRlp;
/**
 * Type output options
 */
var TypeOutput;
(function (TypeOutput) {
    TypeOutput[(TypeOutput['Number'] = 0)] = 'Number';
    TypeOutput[(TypeOutput['BN'] = 1)] = 'BN';
    TypeOutput[(TypeOutput['Buffer'] = 2)] = 'Buffer';
    TypeOutput[(TypeOutput['PrefixedHexString'] = 3)] = 'PrefixedHexString';
})(TypeOutput || (exports.TypeOutput = TypeOutput = {}));
/**
 * Convert an input to a specified type
 * @param input value to convert
 * @param outputType type to output
 */
function toType(input, outputType) {
    if (typeof input === 'string' && !(0, util_1.isHexString)(input)) {
        throw new Error(
            `A string must be provided with a 0x-prefix, given: ${input}`,
        );
    } else if (typeof input === 'number' && !Number.isSafeInteger(input)) {
        throw new Error(
            'The provided number is greater than MAX_SAFE_INTEGER (please use an alternative input type)',
        );
    }
    input = (0, bytes_1.toBuffer)(input);
    if (outputType === TypeOutput.Buffer) {
        return input;
    } else if (outputType === TypeOutput.BN) {
        return new core_1.BN(input);
    } else if (outputType === TypeOutput.Number) {
        const bn = new core_1.BN(input);
        const max = new core_1.BN(Number.MAX_SAFE_INTEGER.toString());
        if (bn.gt(max)) {
            throw new Error(
                'The provided number is greater than MAX_SAFE_INTEGER (please use an alternative output type)',
            );
        }
        return bn.toNumber();
    } else {
        // outputType === TypeOutput.PrefixedHexString
        return `0x${input.toString('hex')}`;
    }
}
exports.toType = toType;
