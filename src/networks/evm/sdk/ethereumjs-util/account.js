'use strict';
/**
 * The following methods are based on `ethereumjs/util`, thanks for their work
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/util
 * Distributed under the Mozilla Public License Version 2.0 software license, see the accompanying
 * file LICENSE or https://opensource.org/license/mpl-2-0/.
 */
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.privateToAddress =
    exports.privateToPublic =
    exports.publicToAddress =
    exports.pubToAddress =
    exports.toChecksumAddress =
    exports.isValidAddress =
        void 0;
const assert_1 = __importDefault(require('assert'));
const core_1 = require('../../../../core');
const hash_1 = require('./hash');
const helpers_1 = require('./helpers');
const types_1 = require('./types');
/**
 * Checks if the address is a valid. Accepts checksummed addresses too.
 */
const isValidAddress = function (hexAddress) {
    (0, helpers_1.assertIsHexString)(hexAddress);
    return /^0x[0-9a-fA-F]{40}$/.test(hexAddress);
};
exports.isValidAddress = isValidAddress;
/**
 * Returns a checksummed address.
 *
 * If a eip1191ChainId is provided, the chainId will be included in the checksum calculation. This
 * has the effect of checksummed addresses for one chain having invalid checksums for others.
 * For more details see [EIP-1191](https://eips.ethereum.org/EIPS/eip-1191).
 *
 * WARNING: Checksums with and without the chainId will differ. As of 2019-06-26, the most commonly
 * used variation in Ethereum was without the chainId. This may change in the future.
 */
const toChecksumAddress = function (hexAddress, eip1191ChainId) {
    (0, helpers_1.assertIsHexString)(hexAddress);
    const address = core_1.base.stripHexPrefix(hexAddress).toLowerCase();
    let prefix = '';
    if (eip1191ChainId) {
        const chainId = (0, types_1.toType)(
            eip1191ChainId,
            types_1.TypeOutput.BN,
        );
        prefix = chainId.toString() + '0x';
    }
    const hash = (0, hash_1.keccakFromString)(prefix + address).toString('hex');
    let ret = '0x';
    for (let i = 0; i < address.length; i++) {
        if (parseInt(hash[i], 16) >= 8) {
            ret += address[i].toUpperCase();
        } else {
            ret += address[i];
        }
    }
    return ret;
};
exports.toChecksumAddress = toChecksumAddress;
/**
 * Returns the ethereum address of a given public key.
 * Accepts "Ethereum public keys" and SEC1 encoded keys.
 * @param pubKey The two points of an uncompressed key, unless sanitize is enabled
 * @param sanitize Accept public keys in other formats
 */
const pubToAddress = function (pubKey, sanitize = false) {
    (0, helpers_1.assertIsBuffer)(pubKey);
    if (sanitize && pubKey.length !== 64) {
        const up = core_1.signUtil.secp256k1.publicKeyConvert(pubKey, false);
        pubKey = Buffer.from(up.slice(1));
    }
    (0, assert_1.default)(pubKey.length === 64);
    // Only take the lower 160bits of the hash
    return (0, hash_1.keccak)(pubKey).slice(-20);
};
exports.pubToAddress = pubToAddress;
exports.publicToAddress = exports.pubToAddress;
/**
 * Returns the ethereum public key of a given private key.
 * @param privateKey A private key must be 256 bits wide
 */
const privateToPublic = function (privateKey) {
    (0, helpers_1.assertIsBuffer)(privateKey);
    // skip the type flag and use the X, Y points
    return core_1.signUtil.secp256k1
        .publicKeyCreate(privateKey, false)
        .slice(1);
};
exports.privateToPublic = privateToPublic;
/**
 * Returns the ethereum address of a given private key.
 * @param privateKey A private key must be 256 bits wide
 */
const privateToAddress = function (privateKey) {
    return (0, exports.publicToAddress)(
        (0, exports.privateToPublic)(privateKey),
    );
};
exports.privateToAddress = privateToAddress;
