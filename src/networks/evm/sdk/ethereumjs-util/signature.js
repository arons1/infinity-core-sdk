'use strict';
/**
 * The following methods are based on `ethereumjs/util`, thanks for their work
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/util
 * Distributed under the Mozilla Public License Version 2.0 software license, see the accompanying
 * file LICENSE or https://opensource.org/license/mpl-2-0/.
 */
Object.defineProperty(exports, '__esModule', { value: true });
exports.recoverFromSignature =
    exports.ecdsaSign =
    exports.makeSignature =
    exports.calculateSigRecovery =
    exports.isValidSigRecovery =
    exports.hashPersonalMessage =
        void 0;
const hash_1 = require('./hash');
const helpers_1 = require('./helpers');
const core_1 = require('../../../../core');
const types_1 = require('./types');
const buffer_1 = require('buffer');
const bytes_1 = require('./bytes');
const eth_sig_util_1 = require('../eth-sig-util');
const util_1 = require('./util');
/**
 * Returns the keccak-256 hash of `message`, prefixed with the header used by the `eth_sign` RPC call.
 * The output of this function can be fed into `ecsign` to produce the same signature as the `eth_sign`
 * call for a given `message`, or fed to `ecrecover` along with a signature to recover the public key
 * used to produce the signature.
 */
const hashPersonalMessage = function (message) {
    (0, helpers_1.assertIsBuffer)(message);
    const prefix = buffer_1.Buffer.from(
        `\u0019Ethereum Signed Message:\n${message.length.toString()}`,
        'utf-8',
    );
    return (0, hash_1.keccak)(buffer_1.Buffer.concat([prefix, message]));
};
exports.hashPersonalMessage = hashPersonalMessage;
function isValidSigRecovery(recovery) {
    const rec = new core_1.BN(recovery);
    return rec.eqn(0) || rec.eqn(1);
}
exports.isValidSigRecovery = isValidSigRecovery;
function calculateSigRecovery(v, chainId) {
    const vBN = (0, types_1.toType)(v, types_1.TypeOutput.BN);
    if (!chainId) {
        return vBN.subn(27);
    }
    const chainIdBN = (0, types_1.toType)(chainId, types_1.TypeOutput.BN);
    return vBN.sub(chainIdBN.muln(2).addn(35));
}
exports.calculateSigRecovery = calculateSigRecovery;
function makeSignature(v, r, s) {
    const rSig = (0, bytes_1.fromSigned)(r);
    const sSig = (0, bytes_1.fromSigned)(s);
    const vSig = v;
    const rStr = (0, eth_sig_util_1.padWithZeroes)(
        (0, bytes_1.toUnsigned)(rSig).toString('hex'),
        64,
    );
    const sStr = (0, eth_sig_util_1.padWithZeroes)(
        (0, bytes_1.toUnsigned)(sSig).toString('hex'),
        64,
    );
    const vStr = core_1.base.stripHexPrefix((0, util_1.intToHex)(vSig));
    return (0, bytes_1.addHexPrefix)(rStr.concat(sStr, vStr));
}
exports.makeSignature = makeSignature;
function ecdsaSign(msgHash, privateKey, chainId) {
    const { signature, recovery } = core_1.signUtil.secp256k1.sign(
        msgHash,
        privateKey,
    ); // { signature, recid: recovery }
    const r = buffer_1.Buffer.from(signature.slice(0, 32));
    const s = buffer_1.Buffer.from(signature.slice(32, 64));
    if (chainId && !Number.isSafeInteger(chainId)) {
        throw new Error(
            'The provided number is greater than MAX_SAFE_INTEGER (please use an alternative input type)',
        );
    }
    const v = chainId ? recovery + (chainId * 2 + 35) : recovery + 27;
    return { v, r, s };
}
exports.ecdsaSign = ecdsaSign;
function recoverFromSignature(msgHash, v, r, s, chainId) {
    const signature = buffer_1.Buffer.concat(
        [(0, bytes_1.setLengthLeft)(r, 32), (0, bytes_1.setLengthLeft)(s, 32)],
        64,
    );
    const recovery = calculateSigRecovery(v, chainId);
    if (!isValidSigRecovery(recovery)) {
        throw new Error('Invalid signature v value');
    }
    const senderPubKey = core_1.signUtil.secp256k1.recover(
        signature,
        recovery.toNumber(),
        msgHash,
        false,
    );
    if (senderPubKey == null) {
        throw new Error('ecdsaRecover error');
    }
    const ret = core_1.signUtil.secp256k1.publicKeyConvert(senderPubKey, false);
    if (ret == null) {
        throw new Error('publicKeyConvert error');
    }
    return ret.slice(1);
}
exports.recoverFromSignature = recoverFromSignature;
