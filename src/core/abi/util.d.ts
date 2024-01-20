/**
 * Mozilla Public License Version 2.0
 *
 *
 * https://github.com/ethereumjs/ethereumjs-monorepo/blob/master/packages/util/LICENSE
 *
 * */
/// <reference types="node" />
export declare const assertIsBuffer: (input: Buffer) => void;
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
 * Right Pads a `Buffer` with trailing zeros till it has `length` bytes.
 * it truncates the end if it exceeds.
 * @param msg the value to pad (Buffer)
 * @param length the number of bytes the output should be
 * @return (Buffer)
 */
export declare const setLengthRight: (msg: Buffer, length: number) => Buffer;
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
