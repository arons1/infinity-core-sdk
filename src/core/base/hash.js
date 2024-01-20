'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.sha3_512 =
    exports.sha3_256 =
    exports.ripemd160 =
    exports.sha512 =
    exports.sha256 =
    exports.blake2 =
    exports.keccak256 =
    exports.keccak =
    exports.hash160 =
    exports.doubleSha256 =
        void 0;
const sha256_1 = require('@noble/hashes/sha256');
Object.defineProperty(exports, 'sha256', {
    enumerable: true,
    get: function () {
        return sha256_1.sha256;
    },
});
const sha512_1 = require('@noble/hashes/sha512');
Object.defineProperty(exports, 'sha512', {
    enumerable: true,
    get: function () {
        return sha512_1.sha512;
    },
});
const ripemd160_1 = require('@noble/hashes/ripemd160');
Object.defineProperty(exports, 'ripemd160', {
    enumerable: true,
    get: function () {
        return ripemd160_1.ripemd160;
    },
});
const sha3_1 = require('@noble/hashes/sha3');
Object.defineProperty(exports, 'sha3_256', {
    enumerable: true,
    get: function () {
        return sha3_1.sha3_256;
    },
});
Object.defineProperty(exports, 'sha3_512', {
    enumerable: true,
    get: function () {
        return sha3_1.sha3_512;
    },
});
const blake2b_1 = require('@noble/hashes/blake2b');
function doubleSha256(data) {
    const t = (0, sha256_1.sha256)(data);
    return (0, sha256_1.sha256)(t);
}
exports.doubleSha256 = doubleSha256;
function hash160(data) {
    const t = (0, sha256_1.sha256)(data);
    return (0, ripemd160_1.ripemd160)(t);
}
exports.hash160 = hash160;
const keccak = function (a, bits = 256) {
    const b = Buffer.from(a);
    switch (bits) {
        case 224: {
            return Buffer.from((0, sha3_1.keccak_224)(b));
        }
        case 256: {
            return Buffer.from((0, sha3_1.keccak_256)(b));
        }
        case 384: {
            return Buffer.from((0, sha3_1.keccak_384)(b));
        }
        case 512: {
            return Buffer.from((0, sha3_1.keccak_512)(b));
        }
        default: {
            throw new Error(`Invald algorithm: keccak${bits}`);
        }
    }
};
exports.keccak = keccak;
/**
 * Creates Keccak-256 hash of the input, alias for keccak(a, 256).
 * @param a The input data (Buffer)
 */
const keccak256 = function (a) {
    return (0, exports.keccak)(a);
};
exports.keccak256 = keccak256;
function blake2(data, bitLength, key) {
    const byteLength = Math.ceil(bitLength / 8);
    return (0, blake2b_1.blake2b)(data, { dkLen: byteLength, key: key });
}
exports.blake2 = blake2;
