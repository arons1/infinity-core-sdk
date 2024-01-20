/**
 * The following methods are based on `ethereumjs/util`, thanks for their work
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/util
 * Distributed under the Mozilla Public License Version 2.0 software license, see the accompanying
 * file LICENSE or https://opensource.org/license/mpl-2-0/.
 */
/// <reference types="node" />
export declare class Address {
    readonly buf: Buffer;
    constructor(buf: Buffer);
    /**
     * Returns the zero address.
     */
    static zero(): Address;
    /**
     * Returns an Address object from a hex-encoded string.
     * @param str - Hex-encoded address
     */
    static fromString(str: string): Address;
    /**
     * Returns an address for a given public key.
     * @param pubKey The two points of an uncompressed key
     */
    static fromPublicKey(pubKey: Buffer): Address;
    /**
     * Returns an address for a given private key.
     * @param privateKey A private key must be 256 bits wide
     */
    static fromPrivateKey(privateKey: Buffer): Address;
    /**
     * Is address equal to another.
     */
    equals(address: Address): boolean;
    /**
     * Is address zero.
     */
    isZero(): boolean;
    /**
     * Returns hex encoding of address.
     */
    toString(): string;
    /**
     * Returns Buffer representation of address.
     */
    toBuffer(): Buffer;
}
