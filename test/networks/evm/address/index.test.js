"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = require("../../../../lib/commonjs/networks/evm/address");
const globals_1 = require("@jest/globals");
const mnemonic = 'derive lab over dragon nothing pioneer until deputy inherit help next release';
const network = {
    messagePrefix: '\u0018Bitcoin Signed Message:\n',
    bech32: 'bc',
    bip32: {
        public: 76067358,
        private: 76066276,
    },
    pubKeyHash: 0,
    scriptHash: 5,
    wif: 128,
};
(0, globals_1.describe)('generateAddressEVM', () => {
    (0, globals_1.test)('generateExtendedPrivateKey(ETH)', async () => {
        const masterNode = (0, address_1.getMasterNode)({ mnemonic, network });
        const privateMasterNode = (0, address_1.getPrivateMasterKey)({
            bipIdCoin: 60,
            protocol: 44,
            masterNode,
        });
        (0, globals_1.expect)(privateMasterNode.toBase58()).toBe('xprv9zWjyVjLs9BAAqgGXzAZX5CDboLFHywAuMcwxaKqgxYCah6rZ3XVD6Qz7B4chRp8rKURkypYgzYPnAn4k6SJfGj2o9BYhHwuoYu5B1QDGif');
    });
    (0, globals_1.test)('generateExtendedPublicKey(ETH)', async () => {
        const masterNode = (0, address_1.getMasterNode)({ mnemonic, network });
        const publicMasterNode = (0, address_1.getPublicMasterKey)({
            bipIdCoin: 60,
            protocol: 44,
            masterNode,
        });
        (0, globals_1.expect)(publicMasterNode.toBase58()).toBe('xpub6DW6P1GEhWjTPKkje1hZtD8x9qAjhSf2GaYYkxjTFJ5BTVS16aqjktjTxVFbbnxZX79W7Xzpxr7MHJjoSHVP6Xyffi7x1VSUXWf1s4raJoS');
    });
    (0, globals_1.test)('generatePrivateAddress(ETH)', async () => {
        const masterNode = (0, address_1.getMasterNode)({ mnemonic, network });
        const privateMasterNode = (0, address_1.getPrivateMasterKey)({
            bipIdCoin: 60,
            protocol: 44,
            masterNode,
        });
        const privateAddress = (0, address_1.getPrivateAddress)({
            privateMasterNode,
        });
        (0, globals_1.expect)(privateAddress).toBe('0x8a1db23fb2baa1b2f85a5c3bf5d1b70972caa3e66f537be7216d0ffdeb899d93');
    });
    (0, globals_1.test)('generatePublicAddress(ETH)', async () => {
        const masterNode = (0, address_1.getMasterNode)({ mnemonic, network });
        const publicMasterNode = (0, address_1.getPublicMasterKey)({
            bipIdCoin: 60,
            protocol: 44,
            masterNode,
        });
        const publicAddress = (0, address_1.getPublicAddress)({
            change: 0,
            index: 0,
            publicMasterNode,
        });
        (0, globals_1.expect)(publicAddress).toBe('0x0c86B43d8c108Eb5ae05218057F0d313Cf9FFD77');
    });
    (0, globals_1.test)('generateXDCPublicAddress', async () => {
        const masterNode = (0, address_1.getMasterNode)({ mnemonic, network });
        const publicMasterNode = (0, address_1.getPublicMasterKey)({
            bipIdCoin: 60,
            protocol: 44,
            masterNode,
        });
        const publicAddress = (0, address_1.getXDCPublicAddress)({
            change: 0,
            index: 0,
            publicMasterNode,
        });
        (0, globals_1.expect)(publicAddress).toBe('xdc0c86B43d8c108Eb5ae05218057F0d313Cf9FFD77');
    });
    (0, globals_1.test)('generateHarmonyPublicAddress', async () => {
        const masterNode = (0, address_1.getMasterNode)({ mnemonic, network });
        const publicMasterNode = (0, address_1.getPublicMasterKey)({
            bipIdCoin: 60,
            protocol: 44,
            masterNode,
        });
        const publicAddress = (0, address_1.getHarmonyPublicAddress)({
            change: 0,
            index: 0,
            publicMasterNode,
        });
        (0, globals_1.expect)(publicAddress).toBe('one1pjrtg0vvzz8ttts9yxq90uxnz08ellth0d4hd0');
    });
    (0, globals_1.test)('generateOKXPublicAddress', async () => {
        const masterNode = (0, address_1.getMasterNode)({ mnemonic, network });
        const publicMasterNode = (0, address_1.getPublicMasterKey)({
            bipIdCoin: 60,
            protocol: 44,
            masterNode,
        });
        const publicAddress = (0, address_1.getOKXPublicAddress)({
            change: 0,
            index: 0,
            publicMasterNode,
        });
        (0, globals_1.expect)(publicAddress).toBe('ex1pjrtg0vvzz8ttts9yxq90uxnz08ellthg9dn08');
    });
});
