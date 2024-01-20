/**
 * The following methods are based on `ethereumjs/util`, thanks for their work
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/util
 * Distributed under the Mozilla Public License Version 2.0 software license, see the accompanying
 * file LICENSE or https://opensource.org/license/mpl-2-0/.
 */
/// <reference types="node" />
import { BN } from '../../../../core';
import { Buffer } from 'buffer';
/**
 * Returns the keccak-256 hash of `message`, prefixed with the header used by the `eth_sign` RPC call.
 * The output of this function can be fed into `ecsign` to produce the same signature as the `eth_sign`
 * call for a given `message`, or fed to `ecrecover` along with a signature to recover the public key
 * used to produce the signature.
 */
export declare const hashPersonalMessage: (message: Buffer) => Buffer;
export declare function isValidSigRecovery(recovery: number | BN): boolean;
export declare function calculateSigRecovery(v: number, chainId?: number): BN;
export declare function makeSignature(v: number, r: Buffer, s: Buffer): string;
export declare function ecdsaSign(msgHash: Buffer, privateKey: Buffer, chainId?: number): {
    v: number;
    r: Buffer;
    s: Buffer;
};
export declare function recoverFromSignature(msgHash: Buffer, v: number, r: Buffer, s: Buffer, chainId?: number): Buffer;
