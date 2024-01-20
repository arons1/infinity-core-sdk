'use strict';
/**
 * The following methods are based on `ethereumjs/util`, thanks for their work
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/util
 * Distributed under the Mozilla Public License Version 2.0 software license, see the accompanying
 * file LICENSE or https://opensource.org/license/mpl-2-0/.
 */
Object.defineProperty(exports, '__esModule', { value: true });
exports.Address = void 0;
const assert = require('assert');
const bytes_1 = require('./bytes');
const account_1 = require('./account');
class Address {
    constructor(buf) {
        assert(buf.length === 20, 'Invalid address length');
        this.buf = buf;
    }
    /**
     * Returns the zero address.
     */
    static zero() {
        return new Address((0, bytes_1.zeros)(20));
    }
    /**
     * Returns an Address object from a hex-encoded string.
     * @param str - Hex-encoded address
     */
    static fromString(str) {
        assert((0, account_1.isValidAddress)(str), 'Invalid address');
        return new Address((0, bytes_1.toBuffer)(str));
    }
    /**
     * Returns an address for a given public key.
     * @param pubKey The two points of an uncompressed key
     */
    static fromPublicKey(pubKey) {
        assert(Buffer.isBuffer(pubKey), 'Public key should be Buffer');
        const buf = (0, account_1.pubToAddress)(pubKey);
        return new Address(buf);
    }
    /**
     * Returns an address for a given private key.
     * @param privateKey A private key must be 256 bits wide
     */
    static fromPrivateKey(privateKey) {
        assert(Buffer.isBuffer(privateKey), 'Private key should be Buffer');
        const buf = (0, account_1.privateToAddress)(privateKey);
        return new Address(buf);
    }
    /**
     * Is address equal to another.
     */
    equals(address) {
        return this.buf.equals(address.buf);
    }
    /**
     * Is address zero.
     */
    isZero() {
        return this.equals(Address.zero());
    }
    /**
     * Returns hex encoding of address.
     */
    toString() {
        return '0x' + this.buf.toString('hex');
    }
    /**
     * Returns Buffer representation of address.
     */
    toBuffer() {
        return Buffer.from(this.buf);
    }
}
exports.Address = Address;
