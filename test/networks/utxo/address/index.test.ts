import {
    getRootNode,
    getPublicMasterKey,
    getPrivateMasterKey,
    xpubToYpub,
    xpubToZpub,
    getPublicAddressP2WPKHP2S,
    getPublicAddressP2PKH,
    getPublicAddressSegwit,
    xprvToZprv,
    xprvToYprv,
    getPrivateAddress,
} from '../../../../lib/commonjs/networks/utxo/address';
import { describe, expect, test } from '@jest/globals';

const mnemonic =
    'derive lab over dragon nothing pioneer until deputy inherit help next release';
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
describe('generateAddressUTXO', () => {
    test('generateExtendedPrivateKeyBTC', async () => {
        const rootNode = getRootNode({ mnemonic, network: networkBTC });
        const privateAccountNode = getPrivateMasterKey({
            bipIdCoin: 0,
            protocol: 49,
            rootNode,
        });
        expect(xprvToYprv(privateAccountNode.toBase58())).toBe(
            'yprvAHZLii61veRXpyD1b7vfCAUapNPfpoYCiVA78H5Ddn7uSFjBnXv8JtQpVgsgtudUwgCHHGFnGMTgETVjFNzu2j8SLZuR6ZK7Qiczin1QwWS',
        );
    });
    test('generateExtendedPrivateKeySegwitBTC', async () => {
        const rootNode = getRootNode({ mnemonic, network: networkBTC });
        const privateAccountNode = getPrivateMasterKey({
            bipIdCoin: 0,
            protocol: 84,
            rootNode,
        });
        expect(xprvToZprv(privateAccountNode.toBase58())).toBe(
            'zprvAcf4ncnUAESerj58XNSsX57U76UiqNwuRmqcgK2KksLtwaFCiP7P21EAifdWVN9dkByxZ2RZ58gLwiR1p1nky91CF83MSkt36tFfkcRGksM',
        );
    });
    test('generateExtendedPublicKeyBTC', async () => {
        const rootNode = getRootNode({ mnemonic, network: networkBTC });
        const publicAccountNode = getPublicMasterKey({
            bipIdCoin: 0,
            protocol: 44,
            rootNode,
        });
        expect(publicAccountNode.toBase58()).toBe(
            'xpub6CRVjHtvvpPy5jpN9ppfjLA1ttbSYYZZfhrwyJEX1p2NYkx3xhvhNCiPJ9rjp3JDLTLsQAaesL8JLrUCbrxE4KKPRGqYLgvibRoC7a7gpww',
        );
    });
    test('xpubToYpub', async () => {
        const rootNode = getRootNode({ mnemonic, network: networkBTC });
        const publicAccountNode = getPublicMasterKey({
            bipIdCoin: 0,
            protocol: 49,
            rootNode,
        });
        expect(xpubToYpub(publicAccountNode.toBase58())).toBe(
            'ypub6WYh8Dcum1yq3THUh9TfZJRKNQEAEGG45i5hvfUqC7etK44LL5ENrgjJLzkDQupjAKg7sAUo91YKqzJSXjH9AVHxmAgUaCjq9yhmawGm1xG',
        );
    });
    test('xpubToZpub', async () => {
        const rootNode = getRootNode({ mnemonic, network: networkBTC });
        const publicAccountNode = getPublicMasterKey({
            bipIdCoin: 0,
            protocol: 84,
            rootNode,
        });
        expect(xpubToZpub(publicAccountNode.toBase58())).toBe(
            'zpub6qeRC8KMzbzx5D9bdPystD4Cf8KDEqfknzmDUhRwKCsspNaMFvRdZoYeZxUYVkWx8E274jeFk4EWKmWqvaZSR2KUNfHyppdVByAbE9GSTPM',
        );
    });
    test('getPublicAddressP2WPKHP2S', async () => {
        const rootNode = getRootNode({ mnemonic, network: networkBTC });
        const publicAccountNode = getPublicMasterKey({
            bipIdCoin: 0,
            protocol: 49,
            rootNode,
        });
        const publicAddress = getPublicAddressP2WPKHP2S({
            change: 0,
            index: 0,
            publicAccountNode,
            network: networkBTC,
        });
        expect(publicAddress).toBe('32juhuebHD1h2nEkBeUN3LnrNAVVdfuB8m');
    });
    test('getPublicAddressLTC', async () => {
        const rootNode = getRootNode({ mnemonic, network: networkLTC });
        const publicAccountNode = getPublicMasterKey({
            bipIdCoin: 2,
            protocol: 44,
            rootNode,
        });
        const publicAddress = getPublicAddressP2PKH({
            change: 0,
            index: 0,
            publicAccountNode,
            network: networkLTC,
        });
        expect(publicAddress).toBe('LNiHyZY6wstYSJnkyE8dXTCGZRuBk7526m');
    });
    test('getPublicAddressSegwit', async () => {
        const rootNode = getRootNode({ mnemonic, network: networkBTC });
        const publicAccountNode = getPublicMasterKey({
            bipIdCoin: 0,
            protocol: 84,
            rootNode,
        });
        const publicAddress = getPublicAddressSegwit({
            change: 0,
            index: 0,
            publicAccountNode,
            network: networkBTC,
        });
        expect(publicAddress).toBe(
            'bc1qh493z9tmfegw2z4ly26whu8crh3ukwl4v4jkvj',
        );
    });

    test('getPrivateAddressLTC', async () => {
        const rootNode = getRootNode({ mnemonic, network: networkLTC });
        const privateAccountNode = getPrivateMasterKey({
            bipIdCoin: 2,
            protocol: 44,
            rootNode,
        });
        const privateAddress = getPrivateAddress({
            change: 0,
            index: 0,
            privateAccountNode,
            network: networkLTC,
        });
        expect(privateAddress).toBe(
            'TAy1gDZ6EfCGpdMac415snAv1DkgzGaS7uHDK2QdZcC4us6Qt4En',
        );
    });
});
