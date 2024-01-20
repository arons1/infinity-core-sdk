/**
 * The following methods are based on `ethereumjs/util`, thanks for their work
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/util
 * Distributed under the Mozilla Public License Version 2.0 software license, see the accompanying
 * file LICENSE or https://opensource.org/license/mpl-2-0/.
 */
/// <reference types="node" />
import * as rlp from './rlp';
import { Buffer } from 'buffer';
export declare const keccak: (a: number[] | Uint8Array | Buffer, bits?: number) => Buffer;
/**
 * Creates Keccak-256 hash of the input, alias for keccak(a, 256).
 * @param a The input data (Buffer)
 */
export declare const keccak256: (a: Buffer | Uint8Array) => Buffer;
/**
 * Creates Keccak hash of a utf-8 string input
 * @param a The input data (String)
 * @param bits (number = 256) The Keccak width
 */
export declare const keccakFromString: (a: string, bits?: number) => Buffer;
/**
 * Creates SHA-3 hash of the RLP encoded version of the input.
 * @param a The input data
 */
export declare const rlphash: (a: rlp.Input) => Buffer;
