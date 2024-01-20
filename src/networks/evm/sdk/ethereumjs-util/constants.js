'use strict';
/**
 * The following methods are based on `ethereumjs/util`, thanks for their work
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/util
 * Distributed under the Mozilla Public License Version 2.0 software license, see the accompanying
 * file LICENSE or https://opensource.org/license/mpl-2-0/.
 */
Object.defineProperty(exports, '__esModule', { value: true });
exports.MAX_UINT64 = exports.MAX_INTEGER = void 0;
const core_1 = require('../../../../core');
/**
 * The max integer that this VM can handle
 */
exports.MAX_INTEGER = new core_1.BN(
    'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    16,
);
exports.MAX_UINT64 = new core_1.BN('ffffffffffffffff', 16);
