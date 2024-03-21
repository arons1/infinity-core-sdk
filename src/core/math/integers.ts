/* eslint-disable no-bitwise */
import BN from 'bn.js';
import Long from 'long';

const uint64MaxValue = new BN('18446744073709551615', 10, 'be');

interface Integer {
    readonly toNumber: () => number;
    readonly toString: () => string;
}

interface WithByteConverters {
    readonly toBytesBigEndian: () => Uint8Array;
    readonly toBytesLittleEndian: () => Uint8Array;
}

export class Uint32 implements Integer, WithByteConverters {
    /** @deprecated use Uint32.fromBytes */
    public static fromBigEndianBytes(bytes: ArrayLike<number>): Uint32 {
        return Uint32.fromBytes(bytes);
    }

    /**
     * Creates a Uint32 from a fixed length byte array.
     *
     * @param bytes a list of exactly 4 bytes
     * @param endianess defaults to big endian
     */
    public static fromBytes(
        bytes: ArrayLike<number>,
        endianess: 'be' | 'le' = 'be',
    ): Uint32 {
        if (bytes.length !== 4) {
            throw new Error('Invalid input length. Expected 4 bytes.');
        }

        for (let i = 0; i < bytes.length; ++i) {
            if (!Number.isInteger(bytes[i]) || bytes[i] > 255 || bytes[i] < 0) {
                throw new Error('Invalid value in byte. Found: ' + bytes[i]);
            }
        }

        const beBytes =
            endianess === 'be' ? bytes : Array.from(bytes).reverse();

        // Use mulitiplication instead of shifting since bitwise operators are defined
        // on SIGNED int32 in JavaScript and we don't want to risk surprises
        return new Uint32(
            beBytes[0] * 2 ** 24 +
                beBytes[1] * 2 ** 16 +
                beBytes[2] * 2 ** 8 +
                beBytes[3],
        );
    }

    public static fromString(str: string): Uint32 {
        if (!str.match(/^[0-9]+$/)) {
            throw new Error('Invalid string format');
        }
        return new Uint32(Number.parseInt(str, 10));
    }

    protected readonly data: number;

    public constructor(input: number) {
        if (Number.isNaN(input)) {
            throw new Error('Input is not a number');
        }

        if (!Number.isInteger(input)) {
            throw new Error('Input is not an integer');
        }

        if (input < 0 || input > 4294967295) {
            throw new Error('Input not in uint32 range: ' + input.toString());
        }

        this.data = input;
    }

    public toBytesBigEndian(): Uint8Array {
        // Use division instead of shifting since bitwise operators are defined
        // on SIGNED int32 in JavaScript and we don't want to risk surprises
        return new Uint8Array([
            Math.floor(this.data / 2 ** 24) & 0xff,
            Math.floor(this.data / 2 ** 16) & 0xff,
            Math.floor(this.data / 2 ** 8) & 0xff,
            Math.floor(this.data / 2 ** 0) & 0xff,
        ]);
    }

    public toBytesLittleEndian(): Uint8Array {
        // Use division instead of shifting since bitwise operators are defined
        // on SIGNED int32 in JavaScript and we don't want to risk surprises
        return new Uint8Array([
            Math.floor(this.data / 2 ** 0) & 0xff,
            Math.floor(this.data / 2 ** 8) & 0xff,
            Math.floor(this.data / 2 ** 16) & 0xff,
            Math.floor(this.data / 2 ** 24) & 0xff,
        ]);
    }

    public toNumber(): number {
        return this.data;
    }

    public toString(): string {
        return this.data.toString();
    }
}

export class Int53 implements Integer {
    public static fromString(str: string): Int53 {
        if (!str.match(/^-?[0-9]+$/)) {
            throw new Error('Invalid string format');
        }

        return new Int53(Number.parseInt(str, 10));
    }

    protected readonly data: number;

    public constructor(input: number) {
        if (Number.isNaN(input)) {
            throw new Error('Input is not a number');
        }

        if (!Number.isInteger(input)) {
            throw new Error('Input is not an integer');
        }

        if (
            input < Number.MIN_SAFE_INTEGER ||
            input > Number.MAX_SAFE_INTEGER
        ) {
            throw new Error('Input not in int53 range: ' + input.toString());
        }

        this.data = input;
    }

    public toNumber(): number {
        return this.data;
    }

    public toString(): string {
        return this.data.toString();
    }
}

export class Uint53 implements Integer {
    public static fromString(str: string): Uint53 {
        const signed = Int53.fromString(str);
        return new Uint53(signed.toNumber());
    }

    protected readonly data: Int53;

    public constructor(input: number) {
        const signed = new Int53(input);
        if (signed.toNumber() < 0) {
            throw new Error('Input is negative');
        }
        this.data = signed;
    }

    public toNumber(): number {
        return this.data.toNumber();
    }

    public toString(): string {
        return this.data.toString();
    }
}

export class Uint64 implements Integer, WithByteConverters {
    /** @deprecated use Uint64.fromBytes */
    public static fromBytesBigEndian(bytes: ArrayLike<number>): Uint64 {
        return Uint64.fromBytes(bytes);
    }

    /**
     * Creates a Uint64 from a fixed length byte array.
     *
     * @param bytes a list of exactly 8 bytes
     * @param endianess defaults to big endian
     */
    public static fromBytes(
        bytes: ArrayLike<number>,
        endianess: 'be' | 'le' = 'be',
    ): Uint64 {
        if (bytes.length !== 8) {
            throw new Error('Invalid input length. Expected 8 bytes.');
        }

        for (let i = 0; i < bytes.length; ++i) {
            if (!Number.isInteger(bytes[i]) || bytes[i] > 255 || bytes[i] < 0) {
                throw new Error('Invalid value in byte. Found: ' + bytes[i]);
            }
        }

        const beBytes =
            endianess === 'be'
                ? Array.from(bytes)
                : Array.from(bytes).reverse();
        return new Uint64(new BN(beBytes));
    }

    public static fromString(str: string): Uint64 {
        if (!str.match(/^[0-9]+$/)) {
            throw new Error('Invalid string format');
        }
        return new Uint64(new BN(str, 10, 'be'));
    }

    public static fromNumber(input: number): Uint64 {
        if (Number.isNaN(input)) {
            throw new Error('Input is not a number');
        }

        if (!Number.isInteger(input)) {
            throw new Error('Input is not an integer');
        }

        let bigint: BN;
        try {
            bigint = new BN(input);
        } catch (e) {
            throw new Error('Input is not a safe integer');
        }
        return new Uint64(bigint);
    }

    private readonly data: BN;

    private constructor(data: BN) {
        if (data.isNeg()) {
            throw new Error('Input is negative');
        }
        if (data.gt(uint64MaxValue)) {
            throw new Error('Input exceeds uint64 range');
        }
        this.data = data;
    }

    public toBytesBigEndian(): Uint8Array {
        return Uint8Array.from(this.data.toArray('be', 8));
    }

    public toBytesLittleEndian(): Uint8Array {
        return Uint8Array.from(this.data.toArray('le', 8));
    }

    public toString(): string {
        return this.data.toString(10);
    }

    public toNumber(): number {
        return this.data.toNumber();
    }
}

export function shortenKey(key: Uint8Array): Long {
    var res = Long.fromValue(0, true);
    var temp = Long.fromValue(0, true);
    var toShift = 0;
    var i = 1;
    var len = 0;

    while (len <= 12) {
        //assert(i < 33, "Means the key has > 20 bytes with trailing zeroes...")
        temp = Long.fromValue(key[i], true).and(len == 12 ? 0x0f : 0x1f);
        if (temp == Long.fromInt(0)) {
            i += 1;
            continue;
        }
        if (len == 12) {
            toShift = 0;
        } else {
            toShift = 5 * (12 - len) - 1;
        }
        temp = Long.fromValue(temp, true).shiftLeft(toShift);

        res = Long.fromValue(res, true).or(temp);
        len += 1;
        i += 1;
    }

    return res;
}
export function stringFromUInt64T(temp: Long): string {
    var charmap = '.12345abcdefghijklmnopqrstuvwxyz'.split('');

    var str = new Array(13);
    str[12] = charmap[Long.fromValue(temp, true).and(0x0f).toInt()];

    temp = Long.fromValue(temp, true).shiftRight(4);
    for (var i = 1; i <= 12; i++) {
        var c = charmap[Long.fromValue(temp, true).and(0x1f).toInt()];
        str[12 - i] = c;
        temp = Long.fromValue(temp, true).shiftRight(5);
    }
    var result = str.join('');
    if (result.length > 12) {
        result = result.substring(0, 12);
    }
    return result;
}
