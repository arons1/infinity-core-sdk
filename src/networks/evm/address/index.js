'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getPublicAddress =
    exports.getPublicKey =
    exports.getPrivateAddress =
    exports.getPrivateKey =
    exports.getPrivateMasterKey =
    exports.getPublicMasterKey =
    exports.getMasterNode =
        void 0;
const bip32_1 = require('../../../core/bip32');
const bip39_1 = require('../../../core/bip39');
const ethereumjs_util_1 = require('../sdk/ethereumjs-util');
const getMasterNode = ({ mnemonic, network }) => {
    const seed = (0, bip39_1.mnemonicToSeedSync)(mnemonic);
    return (0, bip32_1.fromSeed)(seed, network);
};
exports.getMasterNode = getMasterNode;
const getPublicMasterKey = ({ masterNode, bipIdCoin, protocol = 44 }) => {
    return (0, exports.getPrivateMasterKey)({
        masterNode,
        bipIdCoin,
        protocol,
    }).neutered();
};
exports.getPublicMasterKey = getPublicMasterKey;
const getPrivateMasterKey = ({ masterNode, bipIdCoin, protocol = 44 }) => {
    return masterNode
        .deriveHardened(protocol)
        .deriveHardened(bipIdCoin)
        .deriveHardened(0);
};
exports.getPrivateMasterKey = getPrivateMasterKey;
const getPrivateKey = ({ privateMasterNode, change = 0, index = 0 }) => {
    return privateMasterNode.derive(change).derive(index).privateKey;
};
exports.getPrivateKey = getPrivateKey;
const getPrivateAddress = ({ privateMasterNode, change = 0, index = 0 }) => {
    return (
        '0x' +
        (0, exports.getPrivateKey)({
            privateMasterNode,
            index,
            change,
        })?.toString('hex')
    );
};
exports.getPrivateAddress = getPrivateAddress;
const getPublicKey = ({ publicMasterNode, change = 0, index = 0 }) => {
    return publicMasterNode.derive(change).derive(index).publicKey;
};
exports.getPublicKey = getPublicKey;
const getPublicAddress = ({ publicMasterNode, change = 0, index = 0 }) => {
    const address =
        '0x' +
        (0, ethereumjs_util_1.publicToAddress)(
            (0, exports.getPublicKey)({ publicMasterNode, change, index }),
            true,
        ).toString('hex');
    return (0, ethereumjs_util_1.toChecksumAddress)(address);
};
exports.getPublicAddress = getPublicAddress;
