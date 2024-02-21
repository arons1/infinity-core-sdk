import { base58 } from '@scure/base';
import bs58check from 'bs58check';

export function toBase58(data: any): string {
    const a = Buffer.from(data);
    return base58.encode(Uint8Array.from(a));
}

export function fromBase58(data: string): Uint8Array {
    return base58.decode(data);
}
export function b58cencode(value: string | Uint8Array, prefix: Uint8Array) {
    const payloadAr =
        typeof value === 'string'
            ? Uint8Array.from(Buffer.from(value, 'hex'))
            : value;
    const n = new Uint8Array(prefix.length + payloadAr.length);
    n.set(prefix);
    n.set(payloadAr, prefix.length);
    return bs58check.encode(Buffer.from(n.buffer));
}
export { base58 };
