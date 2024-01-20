/// <reference types="node" />
import { SignatureWithRecovery } from './secp256k1';
import BN from 'bn.js';
export declare function sign(message: Buffer, seckey: Buffer | Uint8Array, canonical?: boolean): SignatureWithRecovery;
export declare function verify(message: Buffer | Uint8Array, signature: Buffer | Uint8Array, recovery: number, publicKey: Buffer | Uint8Array): boolean;
export declare function recover(sig: Buffer | Uint8Array, recid: number, msg32: Buffer | Uint8Array, compress: boolean): Buffer | null;
export declare function loadPublicKey(pubKey: Buffer | Uint8Array): {
    x: BN;
    y: BN;
} | null;
export declare function privateKeyVerify(seckey: Buffer | Uint8Array): boolean;
export declare function publicKeyVerify(pubkey: Buffer | Uint8Array): boolean;
export declare function publicKeyCreate(seckey: Buffer | Uint8Array, compress: boolean): Buffer;
export declare function publicKeyConvert(pubkey: Buffer | Uint8Array, compress: boolean): Buffer | null;
export declare function loadCompressedPublicKey(first: number, xbuf: Buffer | Uint8Array): {
    x: BN;
    y: BN;
} | null;
export declare function loadUncompressedPublicKey(first: number, xbuf: Buffer | Uint8Array, ybuf: Buffer | Uint8Array): {
    x: BN;
    y: BN;
} | null;
