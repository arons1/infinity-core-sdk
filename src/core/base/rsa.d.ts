/// <reference types="node" />
import * as jsrsasign from 'jsrsasign';
export declare function encode(plain: string, rsaKey: jsrsasign.RSAKey): Buffer;
export declare function decode(cipherHex: string, rsaKey: jsrsasign.RSAKey): string;
export declare function encodeAny(plain: string, publicKey: string): string;
export declare function decodeAny(cipher: string, privateKey: string): string;
export declare function genKeyPair(keyBit: number): {
    privateKey: string;
    publicKey: string;
};
export declare function covertPublicKeyFromPkcs8ToPkix(b64: string): string;
export declare function covertPublicKeyFromPkcs8ToPkcs1(b64: string): string;
export declare function unwrapPEM(pem: string, pub: boolean): string;
export declare function wrapPEM(b64: string, pub: boolean): string;
