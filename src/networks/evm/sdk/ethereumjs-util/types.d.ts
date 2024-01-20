/**
 * The following methods are based on `ethereumjs/util`, thanks for their work
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/util
 * Distributed under the Mozilla Public License Version 2.0 software license, see the accompanying
 * file LICENSE or https://opensource.org/license/mpl-2-0/.
 */
/// <reference types="node" />
import { BN } from '../../../../core';
import { Address } from './address';
import { ToBufferInputTypes } from './bytes';
export type BNLike = BN | PrefixedHexString | number | Buffer;
export type BufferLike = Buffer | Uint8Array | number[] | number | BN | TransformableToBuffer | PrefixedHexString;
export type PrefixedHexString = string;
/**
 * A type that represents an Address-like value.
 * To convert to address, use `new Address(toBuffer(value))`
 */
export type AddressLike = Address | Buffer | PrefixedHexString;
export interface TransformableToArray {
    toArray(): Uint8Array;
    toBuffer?(): Buffer;
}
export interface TransformableToBuffer {
    toBuffer(): Buffer;
    toArray?(): Uint8Array;
}
/**
 * Convert BN to 0x-prefixed hex string.
 */
export declare function bnToHex(value: BN): PrefixedHexString;
/**
 * Checks provided Buffers for leading zeroes and throws if found.
 *
 * Examples:
 *
 * Valid values: 0x1, 0x, 0x01, 0x1234
 * Invalid values: 0x0, 0x00, 0x001, 0x0001
 *
 * Note: This method is useful for validating that RLP encoded integers comply with the rule that all
 * integer values encoded to RLP must be in the most compact form and contain no leading zero bytes
 * @param values An object containing string keys and Buffer values
 * @throws if any provided value is found to have leading zero bytes
 */
export declare const validateNoLeadingZeroes: (values: {
    [key: string]: Buffer | undefined;
}) => void;
/**
 * Convert value from BN to an unpadded Buffer
 * (useful for RLP transport)
 * @param value value to convert
 */
export declare function bnToUnpaddedBuffer(value: BN): Buffer;
/**
 * Convert value from BN to RLP (unpadded buffer)
 * @param value value to convert
 */
export declare function bnToRlp(value: BN): Buffer;
/**
 * Type output options
 */
export declare enum TypeOutput {
    Number = 0,
    BN = 1,
    Buffer = 2,
    PrefixedHexString = 3
}
export type TypeOutputReturnType = {
    [TypeOutput.Number]: number;
    [TypeOutput.BN]: BN;
    [TypeOutput.Buffer]: Buffer;
    [TypeOutput.PrefixedHexString]: PrefixedHexString;
};
/**
 * Convert an input to a specified type
 * @param input value to convert
 * @param outputType type to output
 */
export declare function toType<T extends TypeOutput>(input: ToBufferInputTypes, outputType: T): TypeOutputReturnType[T];
