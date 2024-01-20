/**
 * The following methods are based on `ethereumjs/tx`, thanks for their work
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/tx
 * Distributed under the Mozilla Public License Version 2.0 software license, see the accompanying
 * file LICENSE or https://opensource.org/license/mpl-2-0/.
 */
/// <reference types="node" />
import { Address } from '../ethereumjs-util';
import { BN } from '../../../../core';
import { TxData, JsonTx, AccessListEIP2930ValuesArray, AccessListEIP2930TxData, FeeMarketEIP1559ValuesArray, FeeMarketEIP1559TxData, TxValuesArray } from './types';
import { Buffer } from 'buffer';
export declare enum Chain {
    Mainnet = 1,
    Ropsten = 3,
    Rinkeby = 4,
    Kovan = 42,
    Goerli = 5,
    Sepolia = 11155111
}
/**
 * This base class will likely be subject to further
 * refactoring along the introduction of additional tx types
 * on the Ethereum network.
 *
 * It is therefore not recommended to use directly.
 */
export declare abstract class BaseTransaction<TransactionObject> {
    private readonly _type;
    readonly nonce: BN;
    readonly gasLimit: BN;
    readonly to?: Address;
    readonly value: BN;
    readonly data: Buffer;
    readonly v?: BN;
    readonly r?: BN;
    readonly s?: BN;
    /**
     * List of tx type defining EIPs,
     * e.g. 1559 (fee market) and 2930 (access lists)
     * for FeeMarketEIP1559Transaction objects
     */
    protected activeCapabilities: number[];
    /**
     * The default chain the tx falls back to if no Common
     * is provided and if the chain can't be derived from
     * a passed in chainId (only EIP-2718 typed txs) or
     * EIP-155 signature (legacy txs).
     *
     * @hidden
     */
    protected DEFAULT_CHAIN: Chain;
    protected constructor(txData: TxData | AccessListEIP2930TxData | FeeMarketEIP1559TxData);
    /**
     * Alias for {@link BaseTransaction.type}
     *
     * @deprecated Use `type` instead
     */
    get transactionType(): number;
    /**
     * Returns the transaction type.
     *
     * Note: legacy txs will return tx type `0`.
     */
    get type(): number;
    /**
     * Returns a Buffer Array of the raw Buffers of this transaction, in order.
     *
     * Use {@link BaseTransaction.serialize} to add a transaction to a block
     * with {@link Block.fromValuesArray}.
     *
     * For an unsigned tx this method uses the empty Buffer values for the
     * signature parameters `v`, `r` and `s` for encoding. For an EIP-155 compliant
     * representation for external signing use {@link BaseTransaction.getMessageToSign}.
     */
    abstract raw(): TxValuesArray | AccessListEIP2930ValuesArray | FeeMarketEIP1559ValuesArray;
    /**
     * Returns the encoding of the transaction.
     */
    abstract serialize(): Buffer;
    abstract getMessageToSign(hashMessage: false): Buffer | Buffer[];
    abstract getMessageToSign(hashMessage?: true): Buffer;
    abstract hash(): Buffer;
    isSigned(): boolean;
    /**
     * Returns an object with the JSON representation of the transaction
     */
    abstract toJSON(): JsonTx;
    /**
     * Signs a transaction.
     *
     * Note that the signed tx is returned as a new object,
     * use as follows:
     * ```javascript
     * const signedTx = tx.sign(privateKey)
     * ```
     */
    sign(privateKey: Buffer): TransactionObject;
    protected abstract _processSignature(v: number, r: Buffer, s: Buffer): TransactionObject;
    protected abstract _processSignatureWithRawV(v: number, r: Buffer, s: Buffer): TransactionObject;
    /**
     * Validates that an object with BN values cannot exceed the specified bit limit.
     * @param values Object containing string keys and BN values
     * @param bits Number of bits to check (64 or 256)
     * @param cannotEqual Pass true if the number also cannot equal one less the maximum value
     */
    protected _validateCannotExceedMaxInteger(values: {
        [key: string]: BN | undefined;
    }, bits?: number, cannotEqual?: boolean): void;
    /**
     * Returns the shared error postfix part for _error() method
     * tx type implementations.
     */
    protected _getSharedErrorPostfix(): string;
    /**
     * Return a compact error string representation of the object
     */
    abstract errorStr(): string;
    /**
     * Internal helper function to create an annotated error message
     *
     * @param msg Base error message
     * @hidden
     */
    protected abstract _errorMsg(msg: string): string;
    /**
     * Accept the v,r,s values from the `sign` method, and convert this into a TransactionObject
     *
     * @param v
     * @param r
     * @param s
     */
    processSignature(v: number, r: Buffer, s: Buffer): TransactionObject;
    processSignatureWithRawV(v: number, r: Buffer, s: Buffer): TransactionObject;
}
