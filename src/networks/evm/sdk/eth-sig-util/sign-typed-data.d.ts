/**
 * The following methods are based on `metamask/eth-sig-util`, thanks for their work
 * https://github.com/MetaMask/eth-sig-util
 * Copyright (c) 2020 MetaMask
 * Distributed under the ISC software license, see the accompanying
 * file LICENSE or https://opensource.org/license/isc-license-txt/.
 */
/// <reference types="node" />
import { Struct } from 'superstruct';
/**
 * This is the message format used for `V1` of `signTypedData`.
 */
export type TypedDataV1 = TypedDataV1Field[];
export type Hex = `0x${string}`;
export declare const StrictHexStruct: Struct<`0x${string}`, null>;
/**
 * This represents a single field in a `V1` `signTypedData` message.
 *
 * @property name - The name of the field.
 * @property type - The type of a field (must be a supported Solidity type).
 * @property value - The value of the field.
 */
export interface TypedDataV1Field {
    name: string;
    type: string;
    value: any;
}
/**
 * Represents the version of `signTypedData` being used.
 *
 * V1 is based upon [an early version of EIP-712](https://github.com/ethereum/EIPs/pull/712/commits/21abe254fe0452d8583d5b132b1d7be87c0439ca)
 * that lacked some later security improvements, and should generally be neglected in favor of
 * later versions.
 *
 * V3 is based on EIP-712, except that arrays and recursive data structures are not supported.
 *
 * V4 is based on EIP-712, and includes full support of arrays and recursive data structures.
 */
export declare enum SignTypedDataVersion {
    V1 = "V1",
    V3 = "V3",
    V4 = "V4"
}
export interface MessageTypeProperty {
    name: string;
    type: string;
}
export interface MessageTypes {
    EIP712Domain: MessageTypeProperty[];
    [additionalProperties: string]: MessageTypeProperty[];
}
export type Bytes = bigint | number | string | Uint8Array;
export declare function assert(condition: any, errorMsg: string): void;
/**
 * Convert a `number` to a `Uint8Array`.
 *
 * @param value - The number to convert to bytes.
 * @returns The bytes as `Uint8Array`.
 * @throws If the number is not a safe integer.
 */
export declare function numberToBytes(value: number): Uint8Array;
/**
 * Convert a `string` to a UTF-8 encoded `Uint8Array`.
 *
 * @param value - The string to convert to bytes.
 * @returns The bytes as `Uint8Array`.
 */
export declare function stringToBytes(value: string): Uint8Array;
/**
 * Check if a value is a `Uint8Array`.
 *
 * @param value - The value to check.
 * @returns Whether the value is a `Uint8Array`.
 */
export declare function isBytes(value: unknown): value is Uint8Array;
/**
 * Convert a byte-like value to a `Uint8Array`. The value can be a `Uint8Array`,
 * a `bigint`, a `number`, or a `string`.
 *
 * This will attempt to guess the type of the value based on its type and
 * contents. For more control over the conversion, use the more specific
 * conversion functions, such as {@link hexToBytes} or {@link stringToBytes}.
 *
 * If the value is a `string`, and it is prefixed with `0x`, it will be
 * interpreted as a hexadecimal string. Otherwise, it will be interpreted as a
 * UTF-8 string. To convert a hexadecimal string to bytes without interpreting
 * it as a UTF-8 string, use {@link hexToBytes} instead.
 *
 * If the value is a `bigint`, it is assumed to be unsigned. To convert a signed
 * `bigint` to bytes, use {@link signedBigIntToBytes} instead.
 *
 * If the value is a `Uint8Array`, it will be returned as-is.
 *
 * @param value - The value to convert to bytes.
 * @returns The bytes as `Uint8Array`.
 */
export declare function valueToBytes(value: Bytes): Uint8Array;
/**
 * Concatenate multiple byte-like values into a single `Uint8Array`. The values
 * can be `Uint8Array`, `bigint`, `number`, or `string`. This uses
 * {@link valueToBytes} under the hood to convert each value to bytes. Refer to
 * the documentation of that function for more information.
 *
 * @param values - The values to concatenate.
 * @returns The concatenated bytes as `Uint8Array`.
 */
export declare function concatBytes(values: Bytes[]): Uint8Array;
/**
 * Assert that a value is a valid hex string.
 *
 * @param value - The value to check.
 * @throws If the value is not a valid hex string.
 */
export declare function assertIsHexString(value: unknown): asserts value is string;
/**
 * Strictly check if a string is a valid hex string. A valid hex string must
 * start with the "0x"-prefix.
 *
 * @param value - The value to check.
 * @returns Whether the value is a valid hex string.
 */
export declare function isStrictHexString(value: unknown): value is Hex;
/**
 * Convert a hexadecimal string to a `Uint8Array`. The string can optionally be
 * prefixed with `0x`. It accepts even and odd length strings.
 *
 * If the value is "0x", an empty `Uint8Array` is returned.
 *
 * @param value - The hexadecimal string to convert to bytes.
 * @returns The bytes as `Uint8Array`.
 */
export declare function hexToBytes(value: string): Uint8Array;
/**
 * Add the `0x`-prefix to a hexadecimal string. If the string already has the
 * prefix, it is returned as-is.
 *
 * @param hexadecimal - The hexadecimal string to add the prefix to.
 * @returns The prefixed hexadecimal string.
 */
export declare function add0x(hexadecimal: string): Hex;
/**
 * Remove the `0x`-prefix from a hexadecimal string. If the string doesn't have
 * the prefix, it is returned as-is.
 *
 * @param hexadecimal - The hexadecimal string to remove the prefix from.
 * @returns The un-prefixed hexadecimal string.
 */
export declare function remove0x(hexadecimal: string): string;
/**
 * Convert a `bigint` to a `Uint8Array`.
 *
 * This assumes that the `bigint` is an unsigned integer. To convert a signed
 * `bigint` instead, use {@link signedBigIntToBytes}.
 *
 * @param value - The bigint to convert to bytes.
 * @returns The bytes as `Uint8Array`.
 */
export declare function bigIntToBytes(value: bigint): Uint8Array;
/**
 * Add padding to a buffer. If the buffer is larger than `length`, this function won't do anything. If it's smaller, the
 * buffer will be padded to the specified length, with extra zeroes at the start.
 *
 * @param buffer - The buffer to add padding to.
 * @param length - The number of bytes to pad the buffer to.
 * @returns The padded buffer.
 */
export declare function padStart(buffer: Uint8Array, length?: number): Uint8Array;
/**
 * Get the error stack from a value. If the value is an error, the error's stack
 * is returned. Otherwise, it returns `undefined`.
 *
 * @param error - The value to get an error stack from.
 * @returns The error stack, or `undefined` if the value is not an error.
 * @internal
 */
export declare const getErrorStack: (error?: unknown) => string | undefined;
/**
 * Get the length of the specified type. If a length is not specified, if the
 * length is out of range (8 <= n <= 256), or if the length is not a multiple of
 * 8, this will throw an error.
 *
 * @param type - The type to get the length for.
 * @returns The bit length of the type.
 */
export declare const getLength: (type: string) => number;
/**
 * This is the message format used for `signTypeData`, for all versions
 * except `V1`.
 *
 * @template T - The custom types used by this message.
 * @property types - The custom types used by this message.
 * @property primaryType - The type of the message.
 * @property domain - Signing domain metadata. The signing domain is the intended context for the
 * signature (e.g. the dapp, protocol, etc. that it's intended for). This data is used to
 * construct the domain seperator of the message.
 * @property domain.name - The name of the signing domain.
 * @property domain.version - The current major version of the signing domain.
 * @property domain.chainId - The chain ID of the signing domain.
 * @property domain.verifyingContract - The address of the contract that can verify the signature.
 * @property domain.salt - A disambiguating salt for the protocol.
 * @property message - The message to be signed.
 */
export interface TypedMessage<T extends MessageTypes> {
    types: T;
    primaryType: keyof T;
    domain: {
        name?: string;
        version?: string;
        chainId?: number;
        verifyingContract?: string;
        salt?: ArrayBuffer;
    };
    message: Record<string, unknown>;
}
export declare const TYPED_MESSAGE_SCHEMA: {
    type: string;
    properties: {
        types: {
            type: string;
            additionalProperties: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        name: {
                            type: string;
                        };
                        type: {
                            type: string;
                            enum: string[];
                        };
                    };
                    required: string[];
                };
            };
        };
        primaryType: {
            type: string;
        };
        domain: {
            type: string;
        };
        message: {
            type: string;
        };
    };
    required: string[];
};
/**
 * Encodes an object by encoding and concatenating each of its members.
 *
 * @param primaryType - The root type.
 * @param data - The object to encode.
 * @param types - Type definitions for all types included in the message.
 * @param version - The EIP-712 version the encoding should comply with.
 * @returns An encoded representation of an object.
 */
declare function encodeData(primaryType: string, data: Record<string, unknown>, types: Record<string, MessageTypeProperty[]>, version: SignTypedDataVersion.V3 | SignTypedDataVersion.V4): Buffer;
/**
 * Encodes the type of an object by encoding a comma delimited list of its members.
 *
 * @param primaryType - The root type to encode.
 * @param types - Type definitions for all types included in the message.
 * @returns An encoded representation of the primary type.
 */
declare function encodeType(primaryType: string, types: Record<string, MessageTypeProperty[]>): string;
/**
 * Hashes the type of an object.
 *
 * @param primaryType - The root type to hash.
 * @param types - Type definitions for all types included in the message.
 * @returns The hash of the object type.
 */
declare function hashType(primaryType: string, types: Record<string, MessageTypeProperty[]>): Buffer;
/**
 * Hash a typed message according to EIP-712. The returned message starts with the EIP-712 prefix,
 * which is "1901", followed by the hash of the domain separator, then the data (if any).
 * The result is hashed again and returned.
 *
 * This function does not sign the message. The resulting hash must still be signed to create an
 * EIP-712 signature.
 *
 * @param typedData - The typed message to hash.
 * @param version - The EIP-712 version the encoding should comply with.
 * @returns The hash of the typed message.
 */
declare function eip712Hash<T extends MessageTypes>(typedData: TypedMessage<T>, version: SignTypedDataVersion.V3 | SignTypedDataVersion.V4): Buffer;
/**
 * A collection of utility functions used for signing typed data.
 */
export declare const TypedDataUtils: {
    encodeData: typeof encodeData;
    encodeType: typeof encodeType;
    hashType: typeof hashType;
    eip712Hash: typeof eip712Hash;
};
/**
 * Generate the "V1" hash for the provided typed message.
 *
 * The hash will be generated in accordance with an earlier version of the EIP-712
 * specification. This hash is used in `signTypedData_v1`.
 *
 * @param typedData - The typed message.
 * @returns The '0x'-prefixed hex encoded hash representing the type of the provided message.
 */
export declare function typedSignatureHash(typedData: TypedDataV1Field[]): string;
export {};
