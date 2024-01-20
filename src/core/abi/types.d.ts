/// <reference types="node" />
import type { ToBufferInputTypes } from './bytes';
export type BigIntLike = bigint | PrefixedHexString | number | Buffer;
export type BufferLike = Buffer | Uint8Array | number[] | number | bigint | TransformableToBuffer | PrefixedHexString;
export type PrefixedHexString = string;
export interface TransformableToArray {
    toArray(): Uint8Array;
    toBuffer?(): Buffer;
}
export interface TransformableToBuffer {
    toBuffer(): Buffer;
    toArray?(): Uint8Array;
}
export type NestedUint8Array = Array<Uint8Array | NestedUint8Array>;
export type NestedBufferArray = Array<Buffer | NestedBufferArray>;
/**
 * Type output options
 */
export declare enum TypeOutput {
    Number = 0,
    BigInt = 1,
    Buffer = 2,
    PrefixedHexString = 3
}
export type TypeOutputReturnType = {
    [TypeOutput.Number]: number;
    [TypeOutput.BigInt]: bigint;
    [TypeOutput.Buffer]: Buffer;
    [TypeOutput.PrefixedHexString]: PrefixedHexString;
};
/**
 * Convert an input to a specified type.
 * Input of null/undefined returns null/undefined regardless of the output type.
 * @param input value to convert
 * @param outputType type to output
 */
export declare function toType<T extends TypeOutput>(input: null, outputType: T): null;
export declare function toType<T extends TypeOutput>(input: undefined, outputType: T): undefined;
export declare function toType<T extends TypeOutput>(input: ToBufferInputTypes, outputType: T): TypeOutputReturnType[T];
