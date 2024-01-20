/**
 * The following methods are based on `ethereumjs/util`, thanks for their work
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/util
 * Distributed under the Mozilla Public License Version 2.0 software license, see the accompanying
 * file LICENSE or https://opensource.org/license/mpl-2-0/.
 */
/// <reference types="node" />
import { BNLike } from './types';
/**
 * Checks if the address is a valid. Accepts checksummed addresses too.
 */
export declare const isValidAddress: (hexAddress: string) => boolean;
/**
 * Returns a checksummed address.
 *
 * If a eip1191ChainId is provided, the chainId will be included in the checksum calculation. This
 * has the effect of checksummed addresses for one chain having invalid checksums for others.
 * For more details see [EIP-1191](https://eips.ethereum.org/EIPS/eip-1191).
 *
 * WARNING: Checksums with and without the chainId will differ. As of 2019-06-26, the most commonly
 * used variation in Ethereum was without the chainId. This may change in the future.
 */
export declare const toChecksumAddress: (hexAddress: string, eip1191ChainId?: BNLike) => string;
/**
 * Returns the ethereum address of a given public key.
 * Accepts "Ethereum public keys" and SEC1 encoded keys.
 * @param pubKey The two points of an uncompressed key, unless sanitize is enabled
 * @param sanitize Accept public keys in other formats
 */
export declare const pubToAddress: (pubKey: Buffer, sanitize?: boolean) => Buffer;
export declare const publicToAddress: (pubKey: Buffer, sanitize?: boolean) => Buffer;
/**
 * Returns the ethereum public key of a given private key.
 * @param privateKey A private key must be 256 bits wide
 */
export declare const privateToPublic: (privateKey: Buffer) => Buffer;
/**
 * Returns the ethereum address of a given private key.
 * @param privateKey A private key must be 256 bits wide
 */
export declare const privateToAddress: (privateKey: Buffer) => Buffer;
