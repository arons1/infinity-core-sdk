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
const baseTransaction_1 = require('./baseTransaction');
const util_1 = require('./util');
const TRANSACTION_TYPE = 1;
const TRANSACTION_TYPE_BUFFER = Buffer.from(
    TRANSACTION_TYPE.toString(16).padStart(2, '0'),
    'hex',
);
/**
 * Typed transaction with optional access lists
 *
 * - TransactionType: 1
 * - EIP: [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)
 */
class AccessListEIP2930Transaction extends baseTransaction_1.BaseTransaction {
    /**
     * Instantiate a transaction from a data dictionary.
     *
     * Format: { chainId, nonce, gasPrice, gasLimit, to, value, data, accessList,
     * v, r, s }
     *
     * Notes:
     * - `chainId` will be set automatically if not provided
     * - All parameters are optional and have some basic default values
     */
    static fromTxData(txData) {
        return new AccessListEIP2930Transaction(txData);
    }
    /**
     * Instantiate a transaction from the serialized tx.
     *
     * Format: `0x01 || rlp([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList,
     * signatureYParity (v), signatureR (r), signatureS (s)])`
     */
    static fromSerializedTx(serialized) {
        if (!serialized.slice(0, 1).equals(TRANSACTION_TYPE_BUFFER)) {
            throw new Error(
                `Invalid serialized tx input: not an EIP-2930 transaction (wrong tx type, expected: ${TRANSACTION_TYPE}, received: ${serialized
                    .slice(0, 1)
                    .toString('hex')}`,
            );
        }
        const values = ethereumjs_util_1.rlp.decode(serialized.slice(1));
        if (!Array.isArray(values)) {
            throw new Error('Invalid serialized tx input: must be array');
        }
        return AccessListEIP2930Transaction.fromValuesArray(values);
    }
    /**
     * Create a transaction from a values array.
     *
     * Format: `[chainId, nonce, gasPrice, gasLimit, to, value, data, accessList,
     * signatureYParity (v), signatureR (r), signatureS (s)]`
     */
    static fromValuesArray(values) {
        if (values.length !== 8 && values.length !== 11) {
            throw new Error(
                'Invalid EIP-2930 transaction. Only expecting 8 values (for unsigned tx) or 11 values (for signed tx).',
            );
        }
        const [
            chainId,
            nonce,
            gasPrice,
            gasLimit,
            to,
            value,
            data,
            accessList,
            v,
            r,
            s,
        ] = values;
        (0, ethereumjs_util_1.validateNoLeadingZeroes)({
            nonce,
            gasPrice,
            gasLimit,
            value,
            v,
            r,
            s,
        });
        const emptyAccessList = [];
        return new AccessListEIP2930Transaction({
            chainId: new core_1.BN(chainId),
            nonce,
            gasPrice,
            gasLimit,
            to,
            value,
            data,
            accessList: accessList ?? emptyAccessList,
            v: v !== undefined ? new core_1.BN(v) : undefined,
            r,
            s,
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
        const { chainId, accessList, gasPrice } = txData;
        this.chainId = (0, ethereumjs_util_1.toType)(
            chainId,
            ethereumjs_util_1.TypeOutput.BN,
        );
        this.activeCapabilities = this.activeCapabilities.concat([2718, 2930]);
        // Populate the access list fields
        const accessListData = util_1.AccessLists.getAccessListData(
            accessList ?? [],
        );
        this.accessList = accessListData.accessList;
        this.AccessListJSON = accessListData.AccessListJSON;
        // Verify the access list format.
        util_1.AccessLists.verifyAccessList(this.accessList);
        this.gasPrice = new core_1.BN(
            (0, ethereumjs_util_1.toBuffer)(gasPrice === '' ? '0x' : gasPrice),
        );
        this._validateCannotExceedMaxInteger({
            gasPrice: this.gasPrice,
        });
        if (
            this.gasPrice.mul(this.gasLimit).gt(ethereumjs_util_1.MAX_INTEGER)
        ) {
            const msg = this._errorMsg(
                'gasLimit * gasPrice cannot exceed MAX_INTEGER',
            );
            throw new Error(msg);
        }
        if (this.v && !this.v.eqn(0) && !this.v.eqn(1)) {
            const msg = this._errorMsg(
                'The y-parity of the transaction should either be 0 or 1',
            );
            throw new Error(msg);
        }
    }
    /**
     * Returns a Buffer Array of the raw Buffers of the EIP-2930 transaction, in order.
     *
     * Format: `[chainId, nonce, gasPrice, gasLimit, to, value, data, accessList,
     * signatureYParity (v), signatureR (r), signatureS (s)]`
     *
     *
     * For an unsigned tx this method uses the empty Buffer values for the
     * signature parameters `v`, `r` and `s` for encoding. For an EIP-155 compliant
     * representation for external signing use {@link AccessListEIP2930Transaction.getMessageToSign}.
     */
    raw() {
        return [
            (0, ethereumjs_util_1.bnToUnpaddedBuffer)(this.chainId),
            (0, ethereumjs_util_1.bnToUnpaddedBuffer)(this.nonce),
            (0, ethereumjs_util_1.bnToUnpaddedBuffer)(this.gasPrice),
            (0, ethereumjs_util_1.bnToUnpaddedBuffer)(this.gasLimit),
            this.to !== undefined ? this.to.buf : Buffer.from([]),
            (0, ethereumjs_util_1.bnToUnpaddedBuffer)(this.value),
            this.data,
            this.accessList,
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
     * Returns the serialized encoding of the EIP-2930 transaction.
     *
     * Format: `0x01 || rlp([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList,
     * signatureYParity (v), signatureR (r), signatureS (s)])`
     *
     * Note that in contrast to the legacy tx serialization format this is not
     * valid RLP any more due to the raw tx type preceding and concatenated to
     * the RLP encoding of the values.
     */
    serialize() {
        const base = this.raw();
        return Buffer.concat([
            TRANSACTION_TYPE_BUFFER,
            ethereumjs_util_1.rlp.encode(base),
        ]);
    }
    /**
     * Returns the serialized unsigned tx (hashed or raw), which can be used
     * to sign the transaction (e.g. for sending to a hardware wallet).
     *
     * Note: in contrast to the legacy tx the raw message format is already
     * serialized and doesn't need to be RLP encoded any more.
     *
     * ```javascript
     * const serializedMessage = tx.getMessageToSign(false) // use this for the HW wallet input
     * ```
     *
     * @param hashMessage - Return hashed message if set to true (default: true)
     */
    getMessageToSign(hashMessage = true) {
        const base = this.raw().slice(0, 8);
        const message = Buffer.concat([
            TRANSACTION_TYPE_BUFFER,
            ethereumjs_util_1.rlp.encode(base),
        ]);
        if (hashMessage) {
            return (0, ethereumjs_util_1.keccak256)(message);
        } else {
            return message;
        }
    }
    /**
     * Computes a sha3-256 hash of the serialized tx.
     *
     * This method can only be used for signed txs (it throws otherwise).
     * Use {@link AccessListEIP2930Transaction.getMessageToSign} to get a tx hash for the purpose of signing.
     */
    hash() {
        if (!this.isSigned()) {
            const msg = this._errorMsg(
                'Cannot call hash method if transaction is not signed',
            );
            throw new Error(msg);
        }
        return (0, ethereumjs_util_1.keccak256)(this.serialize());
    }
    _processSignature(v, r, s) {
        return AccessListEIP2930Transaction.fromTxData({
            chainId: this.chainId,
            nonce: this.nonce,
            gasPrice: this.gasPrice,
            gasLimit: this.gasLimit,
            to: this.to,
            value: this.value,
            data: this.data,
            accessList: this.accessList,
            v: new core_1.BN(v - 27),
            r: new core_1.BN(r),
            s: new core_1.BN(s),
        });
    }
    _processSignatureWithRawV(v, r, s) {
        return AccessListEIP2930Transaction.fromTxData({
            chainId: this.chainId,
            nonce: this.nonce,
            gasPrice: this.gasPrice,
            gasLimit: this.gasLimit,
            to: this.to,
            value: this.value,
            data: this.data,
            accessList: this.accessList,
            v: new core_1.BN(v),
            r: new core_1.BN(r),
            s: new core_1.BN(s),
        });
    }
    /**
     * Returns an object with the JSON representation of the transaction
     */
    toJSON() {
        const accessListJSON = util_1.AccessLists.getAccessListJSON(
            this.accessList,
        );
        return {
            chainId: (0, ethereumjs_util_1.bnToHex)(this.chainId),
            nonce: (0, ethereumjs_util_1.bnToHex)(this.nonce),
            gasPrice: (0, ethereumjs_util_1.bnToHex)(this.gasPrice),
            gasLimit: (0, ethereumjs_util_1.bnToHex)(this.gasLimit),
            to: this.to !== undefined ? this.to.toString() : undefined,
            value: (0, ethereumjs_util_1.bnToHex)(this.value),
            data: '0x' + this.data.toString('hex'),
            accessList: accessListJSON,
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
        // Keep ? for this.accessList since this otherwise causes Hardhat E2E tests to fail
        errorStr += ` gasPrice=${this.gasPrice} accessListCount=${this.accessList?.length ?? 0}`;
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
exports.default = AccessListEIP2930Transaction;
