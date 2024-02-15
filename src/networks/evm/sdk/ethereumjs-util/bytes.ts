/**
 * The following methods are based on `ethereumjs/util`, thanks for their work
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/util
 * Distributed under the Mozilla Public License Version 2.0 software license, see the accompanying
 * file LICENSE or https://opensource.org/license/mpl-2-0/.
 */

import { base, BN } from '../../../../core';
import { isHexString, padToEven } from '../../../../core/abi/internal';
import { intToBuffer } from '../../../../core/abi/bytes';

import {
    PrefixedHexString,
    TransformableToArray,
    TransformableToBuffer,
} from './types';
import { assertIsBuffer } from './helpers';
import { stripZeros } from '../../../../core/abi/util';

/**
 * Trims leading zeros from a `Buffer`.
 * @param a (Buffer)
 * @return (Buffer)
 */
export const unpadBuffer = function (a: Buffer): Buffer {
    assertIsBuffer(a);
    return stripZeros(a) as Buffer;
};

export type ToBufferInputTypes =
    | PrefixedHexString
    | number
    | BN
    | Buffer
    | Uint8Array
    | number[]
    | TransformableToArray
    | TransformableToBuffer
    | null
    | undefined;

/**
 * Attempts to turn a value into a `Buffer`.
 * Inputs supported: `Buffer`, `String`, `Number`, null/undefined, `BN` and other objects with a `toArray()` or `toBuffer()` method.
 * @param v the value
 */
export const toBuffer = function (v: ToBufferInputTypes): Buffer {
    if (v === null || v === undefined) {
        return Buffer.allocUnsafe(0);
    }

    if (Buffer.isBuffer(v)) {
        return Buffer.from(v);
    }

    if (Array.isArray(v) || v instanceof Uint8Array) {
        return Buffer.from(v as Uint8Array);
    }

    if (typeof v === 'string') {
        if (!isHexString(v)) {
            throw new Error(
                `Cannot convert string to buffer. toBuffer only supports 0x-prefixed hex strings and this string was given: ${v}`,
            );
        }
        return Buffer.from(padToEven(base.stripHexPrefix(v)), 'hex');
    }

    if (typeof v === 'number') {
        return intToBuffer(v);
    }

    if (BN.isBN(v)) {
        return v.toArrayLike(Buffer);
    }

    if (v.toArray) {
        // converts a BN to a Buffer
        return Buffer.from(v.toArray());
    }

    if (v.toBuffer) {
        return Buffer.from(v.toBuffer());
    }

    throw new Error('invalid type');
};

/**
 * Converts a `Buffer` into a `0x`-prefixed hex `String`.
 * @param buf `Buffer` object to convert
 */
export const bufferToHex = function (buf: Buffer): string {
    buf = toBuffer(buf);
    return '0x' + buf.toString('hex');
};

/**
 * Interprets a `Buffer` as a signed integer and returns a `BN`. Assumes 256-bit numbers.
 * @param num Signed integer value
 */
export const fromSigned = function (num: Buffer): BN {
    return new BN(num).fromTwos(256);
};

/**
 * Converts a `BN` to an unsigned integer and returns it as a `Buffer`. Assumes 256-bit numbers.
 * @param num
 */
export const toUnsigned = function (num: BN): Buffer {
    return Buffer.from(num.toTwos(256).toArray());
};

/**
 * Adds "0x" to a given `String` if it does not already start with "0x".
 */
export const addHexPrefix = function (str: string): string {
    if (typeof str !== 'string') {
        return str;
    }

    return base.isHexPrefixed(str) ? str : '0x' + str;
};
