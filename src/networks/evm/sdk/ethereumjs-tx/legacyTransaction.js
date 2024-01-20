'use strict';
/**
 * The following methods are based on `ethereumjs/tx`, thanks for their work
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/tx
 * Distributed under the Mozilla Public License Version 2.0 software license, see the accompanying
 * file LICENSE or https://opensource.org/license/mpl-2-0/.
 */
Object.defineProperty(exports, '__esModule', { value: true });
const ethereumjs_util_1 = require('../ethereumjs-util');
const baseTransaction_1 = require('./baseTransaction');
const core_1 = require('../../../../core');
const TRANSACTION_TYPE = 0;
/**
 * An Ethereum non-typed (legacy) transaction
 */
class Transaction extends baseTransaction_1.BaseTransaction {
    /**
     * Instantiate a transaction from a data dictionary.
     *
     * Format: { nonce, gasPrice, gasLimit, to, value, data, v, r, s }
     *
     * Notes:
     * - All parameters are optional and have some basic default values
     */
    static fromTxData(txData) {
        return new Transaction(txData);
    }
    /**
     * Instantiate a transaction from the serialized tx.
     *
     * Format: `rlp([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`
     */
    static fromSerializedTx(serialized, chainId) {
        const values = ethereumjs_util_1.rlp.decode(serialized);
        if (!Array.isArray(values)) {
            throw new Error('Invalid serialized tx input. Must be array');
        }
        return this.fromValuesArray(values, chainId);
    }
    /**
     * Create a transaction from a values array.
     *
     * Format: `[nonce, gasPrice, gasLimit, to, value, data, v, r, s]`
     */
    static fromValuesArray(values, chainId) {
        // If length is not 6, it has length 9. If v/r/s are empty Buffers, it is still an unsigned transaction
        // This happens if you get the RLP data from `raw()`
        if (values.length !== 6 && values.length !== 9) {
            throw new Error(
                'Invalid transaction. Only expecting 6 values (for unsigned tx) or 9 values (for signed tx).',
            );
        }
        const [nonce, gasPrice, gasLimit, to, value, data, v, r, s] = values;
        (0, ethereumjs_util_1.validateNoLeadingZeroes)({
            nonce,
            gasPrice,
            gasLimit,
            value,
            v,
            r,
            s,
        });
        return new Transaction({
            nonce,
            gasPrice,
            gasLimit,
            to,
            value,
            data,
            v,
            r,
            s,
            chainId,
        });
    }
    /**
     * This constructor takes the values, validates them, assigns them and freezes the object.
     *
     * It is not recommended to use this constructor directly. Instead use
     * the static factory methods to assist in creating a Transaction object from
     * varying data types.
     */
    constructor(txData) {
        super({ ...txData, type: TRANSACTION_TYPE });
        this.gasPrice = new core_1.BN(
            (0, ethereumjs_util_1.toBuffer)(
                txData.gasPrice === '' ? '0x' : txData.gasPrice,
            ),
        );
        this.chainId = new core_1.BN(
            (0, ethereumjs_util_1.toBuffer)(
                txData.chainId === '' ? '0x' : txData.chainId,
            ),
        );
        if (
            this.gasPrice.mul(this.gasLimit).gt(ethereumjs_util_1.MAX_INTEGER)
        ) {
            const msg = this._errorMsg(
                'gas limit * gasPrice cannot exceed MAX_INTEGER (2^256-1)',
            );
            throw new Error(msg);
        }
        this._validateCannotExceedMaxInteger({ gasPrice: this.gasPrice });
    }
    /**
     * Returns a Buffer Array of the raw Buffers of the legacy transaction, in order.
     *
     * Format: `[nonce, gasPrice, gasLimit, to, value, data, v, r, s]`
     *
     * For legacy txs this is also the correct format to add transactions
     * to a block with {@link Block.fromValuesArray} (use the `serialize()` method
     * for typed txs).
     *
     * For an unsigned tx this method returns the empty Buffer values
     * for the signature parameters `v`, `r` and `s`. For an EIP-155 compliant
     * representation have a look at {@link Transaction.getMessageToSign}.
     */
    raw() {
        return [
            (0, ethereumjs_util_1.bnToUnpaddedBuffer)(this.nonce),
            (0, ethereumjs_util_1.bnToUnpaddedBuffer)(this.gasPrice),
            (0, ethereumjs_util_1.bnToUnpaddedBuffer)(this.gasLimit),
            this.to !== undefined ? this.to.buf : Buffer.from([]),
            (0, ethereumjs_util_1.bnToUnpaddedBuffer)(this.value),
            this.data,
            this.v !== undefined
                ? (0, ethereumjs_util_1.bnToUnpaddedBuffer)(this.v)
                : Buffer.from([]),
            this.r !== undefined
                ? (0, ethereumjs_util_1.bnToUnpaddedBuffer)(this.r)
                : Buffer.from([]),
            this.s !== undefined
                ? (0, ethereumjs_util_1.bnToUnpaddedBuffer)(this.s)
                : Buffer.from([]),
        ];
    }
    /**
     * Returns the serialized encoding of the legacy transaction.
     *
     * Format: `rlp([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`
     *
     * For an unsigned tx this method uses the empty Buffer values for the
     * signature parameters `v`, `r` and `s` for encoding. For an EIP-155 compliant
     * representation for external signing use {@link Transaction.getMessageToSign}.
     */
    serialize() {
        return ethereumjs_util_1.rlp.encode(this.raw());
    }
    _getMessageToSign() {
        const values = [
            (0, ethereumjs_util_1.bnToUnpaddedBuffer)(this.nonce),
            (0, ethereumjs_util_1.bnToUnpaddedBuffer)(this.gasPrice),
            (0, ethereumjs_util_1.bnToUnpaddedBuffer)(this.gasLimit),
            this.to !== undefined ? this.to.buf : Buffer.from([]),
            (0, ethereumjs_util_1.bnToUnpaddedBuffer)(this.value),
            this.data,
            (0, ethereumjs_util_1.toBuffer)(this.chainId),
            (0, ethereumjs_util_1.unpadBuffer)(
                (0, ethereumjs_util_1.toBuffer)(0),
            ),
            (0, ethereumjs_util_1.unpadBuffer)(
                (0, ethereumjs_util_1.toBuffer)(0),
            ),
        ];
        return values;
    }
    getMessageToSign(hashMessage = true) {
        const message = this._getMessageToSign();
        if (hashMessage) {
            return (0, ethereumjs_util_1.rlphash)(message);
        } else {
            return message;
        }
    }
    /**
     * Computes a sha3-256 hash of the serialized tx.
     *
     * This method can only be used for signed txs (it throws otherwise).
     * Use {@link Transaction.getMessageToSign} to get a tx hash for the purpose of signing.
     */
    hash() {
        // In contrast to the tx type transaction implementations the `hash()` function
        // for the legacy tx does not throw if the tx is not signed.
        // This has been considered for inclusion but lead to unexpected backwards
        // compatibility problems (no concrete reference found, needs validation).
        //
        // For context see also https://github.com/ethereumjs/ethereumjs-monorepo/pull/1445,
        // September, 2021 as well as work done before.
        //
        // This should be updated along the next major version release by adding:
        //
        //if (!this.isSigned()) {
        //  const msg = this._errorMsg('Cannot call hash method if transaction is not signed')
        //  throw new Error(msg)
        //}
        return (0, ethereumjs_util_1.rlphash)(this.raw());
    }
    /**
     * Process the v, r, s values from the `sign` method of the base transaction.
     */
    _processSignature(v, r, s) {
        const vBN = new core_1.BN(2 * this.chainId.toNumber() + v + 8);
        return Transaction.fromTxData({
            nonce: this.nonce,
            gasPrice: this.gasPrice,
            gasLimit: this.gasLimit,
            to: this.to,
            value: this.value,
            data: this.data,
            chainId: this.chainId,
            v: vBN,
            r: new core_1.BN(r),
            s: new core_1.BN(s),
        });
    }
    _processSignatureWithRawV(v, r, s) {
        return Transaction.fromTxData({
            nonce: this.nonce,
            gasPrice: this.gasPrice,
            gasLimit: this.gasLimit,
            to: this.to,
            value: this.value,
            data: this.data,
            chainId: this.chainId,
            v: new core_1.BN(v),
            r: new core_1.BN(r),
            s: new core_1.BN(s),
        });
    }
    /**
     * Returns an object with the JSON representation of the transaction.
     */
    toJSON() {
        return {
            nonce: (0, ethereumjs_util_1.bnToHex)(this.nonce),
            gasPrice: (0, ethereumjs_util_1.bnToHex)(this.gasPrice),
            gasLimit: (0, ethereumjs_util_1.bnToHex)(this.gasLimit),
            to: this.to !== undefined ? this.to.toString() : undefined,
            value: (0, ethereumjs_util_1.bnToHex)(this.value),
            data: '0x' + this.data.toString('hex'),
            v:
                this.v !== undefined
                    ? (0, ethereumjs_util_1.bnToHex)(this.v)
                    : undefined,
            r:
                this.r !== undefined
                    ? (0, ethereumjs_util_1.bnToHex)(this.r)
                    : undefined,
            s:
                this.s !== undefined
                    ? (0, ethereumjs_util_1.bnToHex)(this.s)
                    : undefined,
        };
    }
    /**
     * Return a compact error string representation of the object
     */
    errorStr() {
        let errorStr = this._getSharedErrorPostfix();
        errorStr += ` gasPrice=${this.gasPrice}`;
        return errorStr;
    }
    /**
     * Internal helper function to create an annotated error message
     *
     * @param msg Base error message
     * @hidden
     */
    _errorMsg(msg) {
        return `${msg} (${this.errorStr()})`;
    }
}
exports.default = Transaction;
