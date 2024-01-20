/**
 * The following methods are based on `ethereumjs/util`, thanks for their work
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/util
 * Distributed under the Mozilla Public License Version 2.0 software license, see the accompanying
 * file LICENSE or https://opensource.org/license/mpl-2-0/.
 */
/// <reference types="node" />
import { BN } from '../../../../core';
export type Input = Buffer | string | number | bigint | Uint8Array | BN | List | null;
export interface List extends Array<Input> {
}
export interface Decoded {
    data: Buffer | Buffer[];
    remainder: Buffer;
}
/**
 * RLP Encoding based on: https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-RLP
 * This function takes in a data, convert it to buffer if not, and a length for recursion
 * @param input - will be converted to buffer
 * @returns returns buffer of encoded data
 **/
export declare function encode(input: Input): Buffer;
/**
 * RLP Decoding based on: {@link https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-RLP|RLP}
 * @param input - will be converted to buffer
 * @param stream - Is the input a stream (false by default)
 * @returns - returns decode Array of Buffers containg the original message
 **/
export declare function decode(input: Buffer, stream?: boolean): Buffer;
export declare function decode(input: Buffer[], stream?: boolean): Buffer[];
export declare function decode(input: Input, stream?: boolean): Buffer[] | Buffer | Decoded;
/**
 * Get the length of the RLP input
 * @param input
 * @returns The length of the input or an empty Buffer if no input
 */
export declare function getLength(input: Input): Buffer | number;
/** Check if a string is prefixed by 0x */
export declare function isHexPrefixed(str: string): boolean;
/** Removes 0x from a given String */
export declare function stripHexPrefix(str: string): string;
