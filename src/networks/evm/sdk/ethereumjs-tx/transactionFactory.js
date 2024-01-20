'use strict';
/**
 * The following methods are based on `ethereumjs/tx`, thanks for their work
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/tx
 * Distributed under the Mozilla Public License Version 2.0 software license, see the accompanying
 * file LICENSE or https://opensource.org/license/mpl-2-0/.
 */
Object.defineProperty(exports, '__esModule', { value: true });
const ethereumjs_util_1 = require('../ethereumjs-util');
const core_1 = require('../../../../core');
const _1 = require('.');
class TransactionFactory {
    /**
     * Create a transaction from a `txData` object
     *
     * @param txData - The transaction data. The `type` field will determine which transaction type is returned (if undefined, creates a legacy transaction)
     * @param txOptions - Options to pass on to the constructor of the transaction
     */
    static fromTxData(txData) {
        if (!('type' in txData) || txData.type === undefined) {
            // Assume legacy transaction
            return _1.Transaction.fromTxData(txData);
        } else {
            const txType = new core_1.BN(
                (0, ethereumjs_util_1.toBuffer)(txData.type),
            ).toNumber();
            if (txType === 0) {
                return _1.Transaction.fromTxData(txData);
            } else if (txType === 1) {
                return _1.AccessListEIP2930Transaction.fromTxData(txData);
            } else if (txType === 2) {
                return _1.FeeMarketEIP1559Transaction.fromTxData(txData);
            } else {
                throw new Error(
                    `Tx instantiation with type ${txType} not supported`,
                );
            }
        }
    }
    /**
     * This method tries to decode serialized data.
     *
     * @param data - The data Buffer
     * @param chainId
     */
    static fromSerializedData(data, chainId) {
        if (data[0] <= 0x7f) {
            // Determine the type.
            let EIP;
            switch (data[0]) {
                case 1:
                    EIP = 2930;
                    break;
                case 2:
                    EIP = 1559;
                    break;
                default:
                    throw new Error(
                        `TypedTransaction with ID ${data[0]} unknown`,
                    );
            }
            if (EIP === 1559) {
                return _1.FeeMarketEIP1559Transaction.fromSerializedTx(data);
            } else {
                // EIP === 2930
                return _1.AccessListEIP2930Transaction.fromSerializedTx(data);
            }
        } else {
            return _1.Transaction.fromSerializedTx(data, chainId);
        }
    }
}
exports.default = TransactionFactory;
