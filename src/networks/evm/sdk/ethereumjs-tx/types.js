'use strict';
/**
 * The following methods are based on `ethereumjs/tx`, thanks for their work
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/tx
 * Distributed under the Mozilla Public License Version 2.0 software license, see the accompanying
 * file LICENSE or https://opensource.org/license/mpl-2-0/.
 */
Object.defineProperty(exports, '__esModule', { value: true });
exports.isAccessList = exports.isAccessListBuffer = void 0;
function isAccessListBuffer(input) {
    if (input.length === 0) {
        return true;
    }
    const firstItem = input[0];
    if (Array.isArray(firstItem)) {
        return true;
    }
    return false;
}
exports.isAccessListBuffer = isAccessListBuffer;
function isAccessList(input) {
    return !isAccessListBuffer(input); // This is exactly the same method, except the output is negated.
}
exports.isAccessList = isAccessList;
