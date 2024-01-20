/**
 * The following methods are based on `ethereumjs/tx`, thanks for their work
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/tx
 * Distributed under the Mozilla Public License Version 2.0 software license, see the accompanying
 * file LICENSE or https://opensource.org/license/mpl-2-0/.
 */
/// <reference types="node" />
import { TypedTransaction, TxData, AccessListEIP2930TxData, FeeMarketEIP1559TxData } from './types';
export default class TransactionFactory {
    /**
     * Create a transaction from a `txData` object
     *
     * @param txData - The transaction data. The `type` field will determine which transaction type is returned (if undefined, creates a legacy transaction)
     * @param txOptions - Options to pass on to the constructor of the transaction
     */
    static fromTxData(txData: TxData | AccessListEIP2930TxData | FeeMarketEIP1559TxData): TypedTransaction;
    /**
     * This method tries to decode serialized data.
     *
     * @param data - The data Buffer
     * @param chainId
     */
    static fromSerializedData(data: Buffer, chainId?: number): TypedTransaction;
}
