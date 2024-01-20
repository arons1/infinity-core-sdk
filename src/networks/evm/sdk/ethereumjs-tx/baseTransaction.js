'use strict';
/**
 * The following methods are based on `ethereumjs/tx`, thanks for their work
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/tx
 * Distributed under the Mozilla Public License Version 2.0 software license, see the accompanying
 * file LICENSE or https://opensource.org/license/mpl-2-0/.
 */
Object.defineProperty(exports, '__esModule', { value: true });
exports.BaseTransaction = exports.Chain = void 0;
const ethereumjs_util_1 = require('../ethereumjs-util');
const core_1 = require('../../../../core');
var Chain;
(function (Chain) {
    Chain[(Chain['Mainnet'] = 1)] = 'Mainnet';
    Chain[(Chain['Ropsten'] = 3)] = 'Ropsten';
    Chain[(Chain['Rinkeby'] = 4)] = 'Rinkeby';
    Chain[(Chain['Kovan'] = 42)] = 'Kovan';
    Chain[(Chain['Goerli'] = 5)] = 'Goerli';
    Chain[(Chain['Sepolia'] = 11155111)] = 'Sepolia';
})(Chain || (exports.Chain = Chain = {}));
/**
 * This base class will likely be subject to further
 * refactoring along the introduction of additional tx types
 * on the Ethereum network.
 *
 * It is therefore not recommended to use directly.
 */
class BaseTransaction {
    constructor(txData) {
        /**
         * List of tx type defining EIPs,
         * e.g. 1559 (fee market) and 2930 (access lists)
         * for FeeMarketEIP1559Transaction objects
         */
        this.activeCapabilities = [];
        /**
         * The default chain the tx falls back to if no Common
         * is provided and if the chain can't be derived from
         * a passed in chainId (only EIP-2718 typed txs) or
         * EIP-155 signature (legacy txs).
         *
         * @hidden
         */
        this.DEFAULT_CHAIN = Chain.Mainnet;
        const { nonce, gasLimit, to, value, data, v, r, s, type } = txData;
        this._type = new core_1.BN(
            (0, ethereumjs_util_1.toBuffer)(type),
        ).toNumber();
        const toB = (0, ethereumjs_util_1.toBuffer)(to === '' ? '0x' : to);
        const vB = (0, ethereumjs_util_1.toBuffer)(v === '' ? '0x' : v);
        const rB = (0, ethereumjs_util_1.toBuffer)(r === '' ? '0x' : r);
        const sB = (0, ethereumjs_util_1.toBuffer)(s === '' ? '0x' : s);
        this.nonce = new core_1.BN(
            (0, ethereumjs_util_1.toBuffer)(nonce === '' ? '0x' : nonce),
        );
        this.gasLimit = new core_1.BN(
            (0, ethereumjs_util_1.toBuffer)(gasLimit === '' ? '0x' : gasLimit),
        );
        this.to =
            toB.length > 0 ? new ethereumjs_util_1.Address(toB) : undefined;
        this.value = new core_1.BN(
            (0, ethereumjs_util_1.toBuffer)(value === '' ? '0x' : value),
        );
        this.data = (0, ethereumjs_util_1.toBuffer)(data === '' ? '0x' : data);
        this.v = vB.length > 0 ? new core_1.BN(vB) : undefined;
        this.r = rB.length > 0 ? new core_1.BN(rB) : undefined;
        this.s = sB.length > 0 ? new core_1.BN(sB) : undefined;
        this._validateCannotExceedMaxInteger({
            value: this.value,
            r: this.r,
            s: this.s,
        });
        // geth limits gasLimit to 2^64-1
        this._validateCannotExceedMaxInteger({ gasLimit: this.gasLimit }, 64);
        // EIP-2681 limits nonce to 2^64-1 (cannot equal 2^64-1)
        this._validateCannotExceedMaxInteger({ nonce: this.nonce }, 64, true);
    }
    /**
     * Alias for {@link BaseTransaction.type}
     *
     * @deprecated Use `type` instead
     */
    get transactionType() {
        return this.type;
    }
    /**
     * Returns the transaction type.
     *
     * Note: legacy txs will return tx type `0`.
     */
    get type() {
        return this._type;
    }
    isSigned() {
        const { v, r, s } = this;
        if (this.type === 0) {
            if (!v || !r || !s) {
                return false;
            } else {
                return true;
            }
        } else {
            if (v === undefined || !r || !s) {
                return false;
            } else {
                return true;
            }
        }
    }
    /**
     * Signs a transaction.
     *
     * Note that the signed tx is returned as a new object,
     * use as follows:
     * ```javascript
     * const signedTx = tx.sign(privateKey)
     * ```
     */
    sign(privateKey) {
        if (privateKey.length !== 32) {
            const msg = this._errorMsg(
                'Private key must be 32 bytes in length.',
            );
            throw new Error(msg);
        }
        const msgHash = this.getMessageToSign(true);
        const { v, r, s } = (0, ethereumjs_util_1.ecdsaSign)(
            msgHash,
            privateKey,
        );
        return this._processSignature(v, r, s);
    }
    /**
     * Validates that an object with BN values cannot exceed the specified bit limit.
     * @param values Object containing string keys and BN values
     * @param bits Number of bits to check (64 or 256)
     * @param cannotEqual Pass true if the number also cannot equal one less the maximum value
     */
    _validateCannotExceedMaxInteger(values, bits = 256, cannotEqual = false) {
        for (const [key, value] of Object.entries(values)) {
            switch (bits) {
                case 64:
                    if (cannotEqual) {
                        if (value?.gte(ethereumjs_util_1.MAX_UINT64)) {
                            const msg = this._errorMsg(
                                `${key} cannot equal or exceed MAX_UINT64 (2^64-1), given ${value}`,
                            );
                            throw new Error(msg);
                        }
                    } else {
                        if (value?.gt(ethereumjs_util_1.MAX_UINT64)) {
                            const msg = this._errorMsg(
                                `${key} cannot exceed MAX_UINT64 (2^64-1), given ${value}`,
                            );
                            throw new Error(msg);
                        }
                    }
                    break;
                case 256:
                    if (cannotEqual) {
                        if (value?.gte(ethereumjs_util_1.MAX_INTEGER)) {
                            const msg = this._errorMsg(
                                `${key} cannot equal or exceed MAX_INTEGER (2^256-1), given ${value}`,
                            );
                            throw new Error(msg);
                        }
                    } else {
                        if (value?.gt(ethereumjs_util_1.MAX_INTEGER)) {
                            const msg = this._errorMsg(
                                `${key} cannot exceed MAX_INTEGER (2^256-1), given ${value}`,
                            );
                            throw new Error(msg);
                        }
                    }
                    break;
                default: {
                    const msg = this._errorMsg('unimplemented bits value');
                    throw new Error(msg);
                }
            }
        }
    }
    /**
     * Returns the shared error postfix part for _error() method
     * tx type implementations.
     */
    _getSharedErrorPostfix() {
        let hash = '';
        try {
            hash = this.isSigned()
                ? (0, ethereumjs_util_1.bufferToHex)(this.hash())
                : 'not available (unsigned)';
        } catch (e) {
            hash = 'error';
        }
        let isSigned = '';
        try {
            isSigned = this.isSigned().toString();
        } catch (e) {
            hash = 'error';
        }
        let postfix = `tx type=${this.type} hash=${hash} nonce=${this.nonce} value=${this.value} `;
        postfix += `signed=${isSigned}`;
        return postfix;
    }
    /**
     * Accept the v,r,s values from the `sign` method, and convert this into a TransactionObject
     *
     * @param v
     * @param r
     * @param s
     */
    processSignature(v, r, s) {
        return this._processSignature(v, r, s);
    }
    // v - It has already been transformed based on the chainId and txType.
    processSignatureWithRawV(v, r, s) {
        return this._processSignatureWithRawV(v, r, s);
    }
}
exports.BaseTransaction = BaseTransaction;
