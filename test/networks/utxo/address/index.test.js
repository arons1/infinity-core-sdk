"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = require("../../../../lib/commonjs/networks/utxo/address");
const globals_1 = require("@jest/globals");
const mnemonic = 'derive lab over dragon nothing pioneer until deputy inherit help next release';
const networkBTC = {
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
const networkLTC = {
    messagePrefix: '\u0018Bitcoin Signed Message:\n',
    bech32: 'ltc',
    bip32: {
        private: 0x019d9cfe,
        public: 0x019da462,
    },
    pubKeyHash: 0x30,
    scriptHash: 0x32,
    wif: 0xb0,
};
(0, globals_1.describe)('generateAddressUTXO', () => {
    (0, globals_1.test)('generateExtendedPrivateKeyBTC', async () => {
        const masterNode = (0, address_1.getMasterNode)({ mnemonic, network: networkBTC });
        const privateMasterNode = (0, address_1.getPrivateMasterKey)({
            bipIdCoin: 0,
            protocol: 49,
            masterNode,
        });
        (0, globals_1.expect)((0, address_1.xprvToYprv)(privateMasterNode.toBase58())).toBe('yprvAHZLii61veRXpyD1b7vfCAUapNPfpoYCiVA78H5Ddn7uSFjBnXv8JtQpVgsgtudUwgCHHGFnGMTgETVjFNzu2j8SLZuR6ZK7Qiczin1QwWS');
    });
    (0, globals_1.test)('generateExtendedPrivateKeySegwitBTC', async () => {
        const masterNode = (0, address_1.getMasterNode)({ mnemonic, network: networkBTC });
        const privateMasterNode = (0, address_1.getPrivateMasterKey)({
            bipIdCoin: 0,
            protocol: 84,
            masterNode,
        });
        (0, globals_1.expect)((0, address_1.xprvToZprv)(privateMasterNode.toBase58())).toBe('zprvAcf4ncnUAESerj58XNSsX57U76UiqNwuRmqcgK2KksLtwaFCiP7P21EAifdWVN9dkByxZ2RZ58gLwiR1p1nky91CF83MSkt36tFfkcRGksM');
    });
    (0, globals_1.test)('generateExtendedPublicKeyBTC', async () => {
        const masterNode = (0, address_1.getMasterNode)({ mnemonic, network: networkBTC });
        const publicMasterNode = (0, address_1.getPublicMasterKey)({
            bipIdCoin: 0,
            protocol: 44,
            masterNode,
        });
        (0, globals_1.expect)(publicMasterNode.toBase58()).toBe('xpub6CRVjHtvvpPy5jpN9ppfjLA1ttbSYYZZfhrwyJEX1p2NYkx3xhvhNCiPJ9rjp3JDLTLsQAaesL8JLrUCbrxE4KKPRGqYLgvibRoC7a7gpww');
    });
    (0, globals_1.test)('xpubToYpub', async () => {
        const masterNode = (0, address_1.getMasterNode)({ mnemonic, network: networkBTC });
        const publicMasterNode = (0, address_1.getPublicMasterKey)({
            bipIdCoin: 0,
            protocol: 49,
            masterNode,
        });
        (0, globals_1.expect)((0, address_1.xpubToYpub)(publicMasterNode.toBase58())).toBe('ypub6WYh8Dcum1yq3THUh9TfZJRKNQEAEGG45i5hvfUqC7etK44LL5ENrgjJLzkDQupjAKg7sAUo91YKqzJSXjH9AVHxmAgUaCjq9yhmawGm1xG');
    });
    (0, globals_1.test)('xpubToZpub', async () => {
        const masterNode = (0, address_1.getMasterNode)({ mnemonic, network: networkBTC });
        const publicMasterNode = (0, address_1.getPublicMasterKey)({
            bipIdCoin: 0,
            protocol: 84,
            masterNode,
        });
        (0, globals_1.expect)((0, address_1.xpubToZpub)(publicMasterNode.toBase58())).toBe('zpub6qeRC8KMzbzx5D9bdPystD4Cf8KDEqfknzmDUhRwKCsspNaMFvRdZoYeZxUYVkWx8E274jeFk4EWKmWqvaZSR2KUNfHyppdVByAbE9GSTPM');
    });
    (0, globals_1.test)('getPublicAddressP2WPKHP2S', async () => {
        const masterNode = (0, address_1.getMasterNode)({ mnemonic, network: networkBTC });
        const publicMasterNode = (0, address_1.getPublicMasterKey)({
            bipIdCoin: 0,
            protocol: 49,
            masterNode,
        });
        const publicAddress = (0, address_1.getPublicAddressP2WPKHP2S)({
            change: 0,
            index: 0,
            publicMasterNode,
            network: networkBTC,
        });
        (0, globals_1.expect)(publicAddress).toBe('32juhuebHD1h2nEkBeUN3LnrNAVVdfuB8m');
    });
    (0, globals_1.test)('getPublicAddressLTC', async () => {
        const masterNode = (0, address_1.getMasterNode)({ mnemonic, network: networkLTC });
        const publicMasterNode = (0, address_1.getPublicMasterKey)({
            bipIdCoin: 2,
            protocol: 44,
            masterNode,
        });
        const publicAddress = (0, address_1.getPublicAddressP2PKH)({
            change: 0,
            index: 0,
            publicMasterNode,
            network: networkLTC,
        });
        (0, globals_1.expect)(publicAddress).toBe('LNiHyZY6wstYSJnkyE8dXTCGZRuBk7526m');
    });
    (0, globals_1.test)('getPublicAddressSegwit', async () => {
        const masterNode = (0, address_1.getMasterNode)({ mnemonic, network: networkBTC });
        const publicMasterNode = (0, address_1.getPublicMasterKey)({
            bipIdCoin: 0,
            protocol: 84,
            masterNode,
        });
        const publicAddress = (0, address_1.getPublicAddressSegwit)({
            change: 0,
            index: 0,
            publicMasterNode,
            network: networkBTC,
        });
        (0, globals_1.expect)(publicAddress).toBe('bc1qh493z9tmfegw2z4ly26whu8crh3ukwl4v4jkvj');
    });
    (0, globals_1.test)('getPrivateAddressLTC', async () => {
        const masterNode = (0, address_1.getMasterNode)({ mnemonic, network: networkLTC });
        const privateMasterNode = (0, address_1.getPrivateMasterKey)({
            bipIdCoin: 2,
            protocol: 44,
            masterNode,
        });
        const privateAddress = (0, address_1.getPrivateAddress)({
            change: 0,
            index: 0,
            privateMasterNode,
            network: networkLTC,
        });
        (0, globals_1.expect)(privateAddress).toBe('TAy1gDZ6EfCGpdMac415snAv1DkgzGaS7uHDK2QdZcC4us6Qt4En');
    });
});
