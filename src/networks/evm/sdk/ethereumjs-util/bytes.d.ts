/**
 * The following methods are based on `ethereumjs/util`, thanks for their work
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/util
 * Distributed under the Mozilla Public License Version 2.0 software license, see the accompanying
 * file LICENSE or https://opensource.org/license/mpl-2-0/.
 */
/// <reference types="node" />
import { BN } from '../../../../core';
import { PrefixedHexString, TransformableToArray, TransformableToBuffer } from './types';
/**
 * Returns a buffer filled with 0s.
 * @param bytes the number of bytes the buffer should be
 */
export declare const zeros: (bytes: number) => Buffer;
/**
 * Left Pads a `Buffer` with leading zeros till it has `length` bytes.
 * Or it truncates the beginning if it exceeds.
 * @param msg the value to pad (Buffer)
 * @param length the number of bytes the output should be
 * @return (Buffer)
 */
export declare const setLengthLeft: (msg: Buffer, length: number) => Buffer;
/**
 * Trims leading zeros from a `Buffer`, `String` or `Number[]`.
 * @param a (Buffer|Array|String)
 * @return (Buffer|Array|String)
 */
export declare const stripZeros: (a: any) => Buffer | number[] | string;
/**
 * Trims leading zeros from a `Buffer`.
 * @param a (Buffer)
 * @return (Buffer)
 */
export declare const unpadBuffer: (a: Buffer) => Buffer;
/**
 * Trims leading zeros from an `Array` (of numbers).
 * @param a (number[])
 * @return (number[])
 */
export declare const unpadArray: (a: number[]) => number[];
export type ToBufferInputTypes = PrefixedHexString | number | BN | Buffer | Uint8Array | number[] | TransformableToArray | TransformableToBuffer | null | undefined;
/**
 * Attempts to turn a value into a `Buffer`.
 * Inputs supported: `Buffer`, `String`, `Number`, null/undefined, `BN` and other objects with a `toArray()` or `toBuffer()` method.
 * @param v the value
 */
export declare const toBuffer: (v: ToBufferInputTypes) => Buffer;
/**
 * Converts a `Buffer` into a `0x`-prefixed hex `String`.
 * @param buf `Buffer` object to convert
 */
export declare const bufferToHex: (buf: Buffer) => string;
/**
 * Interprets a `Buffer` as a signed integer and returns a `BN`. Assumes 256-bit numbers.
 * @param num Signed integer value
 */
export declare const fromSigned: (num: Buffer) => BN;
/**
 * Converts a `BN` to an unsigned integer and returns it as a `Buffer`. Assumes 256-bit numbers.
 * @param num
 */
export declare const toUnsigned: (num: BN) => Buffer;
/**
 * Adds "0x" to a given `String` if it does not already start with "0x".
 */
export declare const addHexPrefix: (str: string) => string;
