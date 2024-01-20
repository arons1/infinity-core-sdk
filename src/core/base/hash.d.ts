/// <reference types="node" />
import { sha256 } from '@noble/hashes/sha256';
import { sha512 } from '@noble/hashes/sha512';
import { ripemd160 } from '@noble/hashes/ripemd160';
import { sha3_256, sha3_512 } from '@noble/hashes/sha3';
import { Input } from '@noble/hashes/utils';
export declare function doubleSha256(data: Input): Uint8Array;
export declare function hash160(data: Input): Uint8Array;
export declare const keccak: (a: Buffer | Uint8Array | number[], bits?: number) => Buffer;
/**
 * Creates Keccak-256 hash of the input, alias for keccak(a, 256).
 * @param a The input data (Buffer)
 */
export declare const keccak256: (a: Buffer | Uint8Array | number[]) => Buffer;
export declare function blake2(data: Uint8Array, bitLength: number, key: Uint8Array | undefined): Uint8Array;
export { sha256, sha512, ripemd160, sha3_256, sha3_512 };
