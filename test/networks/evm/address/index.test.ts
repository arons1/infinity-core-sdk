import {
    getPublicAddress,
    getPrivateAddress,
    getHarmonyPublicAddress,
    getOKXPublicAddress,
    getXDCPublicAddress,
    getBCPublicAddress,
    getFIOPublicAddress,
    getFIOPrivateAddress,
} from '../../../../lib/commonjs/networks/evm/address';
import {
    getPrivateMasterKey,
    getPublicMasterKey,
    getRootNode,
} from '../../../../lib/commonjs/networks/utils/secp256k1';
import { describe, expect, test } from '@jest/globals';

const mnemonic =
    'derive lab over dragon nothing pioneer until deputy inherit help next release';
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
describe('generateAddressEVM', () => {
    test('generateExtendedPrivateKey(ETH)', async () => {
        const rootNode = getRootNode({ mnemonic, network });
        const privateAccountNode = getPrivateMasterKey({
            bipIdCoin: 60,
            protocol: 44,
            rootNode,
        });
        expect(privateAccountNode.toBase58()).toBe(
            'xprv9zWjyVjLs9BAAqgGXzAZX5CDboLFHywAuMcwxaKqgxYCah6rZ3XVD6Qz7B4chRp8rKURkypYgzYPnAn4k6SJfGj2o9BYhHwuoYu5B1QDGif',
        );
    });
    test('generateExtendedPublicKey(ETH)', async () => {
        const rootNode = getRootNode({ mnemonic, network });
        const publicAccountNode = getPublicMasterKey({
            bipIdCoin: 60,
            protocol: 44,
            rootNode,
        });
        expect(publicAccountNode.toBase58()).toBe(
            'xpub6DW6P1GEhWjTPKkje1hZtD8x9qAjhSf2GaYYkxjTFJ5BTVS16aqjktjTxVFbbnxZX79W7Xzpxr7MHJjoSHVP6Xyffi7x1VSUXWf1s4raJoS',
        );
    });
    test('generatePrivateAddress(ETH)', async () => {
        const rootNode = getRootNode({ mnemonic, network });
        const privateAccountNode = getPrivateMasterKey({
            bipIdCoin: 60,
            protocol: 44,
            rootNode,
        });
        const privateAddress = getPrivateAddress({
            privateAccountNode,
        });
        expect(privateAddress).toBe(
            '0x8a1db23fb2baa1b2f85a5c3bf5d1b70972caa3e66f537be7216d0ffdeb899d93',
        );
    });
    test('generatePrivateAddress(FIO)', async () => {
        const rootNode = getRootNode({ mnemonic, network });
        const privateAccountNode = getPrivateMasterKey({
            bipIdCoin: 235,
            protocol: 44,
            rootNode,
        });
        const privateAddress = getFIOPrivateAddress({
            privateAccountNode,
        });
        expect(privateAddress).toBe(
            '5KCYRtCo7sza6RdBRaBHD5ERvrW415iVdZ9e6KCd34jmVDfkoay',
        );
    });
    test('generatePublicAddress(ETH)', async () => {
        const rootNode = getRootNode({ mnemonic, network });
        const publicAccountNode = getPublicMasterKey({
            bipIdCoin: 60,
            protocol: 44,
            rootNode,
        });
        const publicAddress = getPublicAddress({
            change: 0,
            index: 0,
            publicAccountNode,
        });
        expect(publicAddress).toBe(
            '0x0c86B43d8c108Eb5ae05218057F0d313Cf9FFD77',
        );
    });
    test('generatePublicAddress(BC)', async () => {
        const rootNode = getRootNode({ mnemonic, network });
        const publicAccountNode = getPublicMasterKey({
            bipIdCoin: 714,
            protocol: 44,
            rootNode,
        });
        const publicAddress = getBCPublicAddress({
            change: 0,
            index: 0,
            publicAccountNode,
        });
        expect(publicAddress).toBe(
            'bnb1v6ugv2t5cahefksmduc9ypezm25453ez2p3e3k',
        );
    });
    test('generateFIOPublicAddress', async () => {
        const rootNode = getRootNode({ mnemonic, network });
        const publicAccountNode = getPublicMasterKey({
            bipIdCoin: 235,
            protocol: 44,
            rootNode,
        });
        const publicAddress = getFIOPublicAddress({
            change: 0,
            index: 0,
            publicAccountNode,
        });
        expect(publicAddress).toBe(
            'FIO7ADFZaxbEnzS3pLrk1KWYBprsKr8AekNs1ovbqgPKW44CmwxBx',
        );
    });
    test('generateXDCPublicAddress', async () => {
        const rootNode = getRootNode({ mnemonic, network });
        const publicAccountNode = getPublicMasterKey({
            bipIdCoin: 60,
            protocol: 44,
            rootNode,
        });
        const publicAddress = getXDCPublicAddress({
            change: 0,
            index: 0,
            publicAccountNode,
        });
        expect(publicAddress).toBe(
            'xdc0c86B43d8c108Eb5ae05218057F0d313Cf9FFD77',
        );
    });

    test('generateHarmonyPublicAddress', async () => {
        const rootNode = getRootNode({ mnemonic, network });
        const publicAccountNode = getPublicMasterKey({
            bipIdCoin: 60,
            protocol: 44,
            rootNode,
        });
        const publicAddress = getHarmonyPublicAddress({
            change: 0,
            index: 0,
            publicAccountNode,
        });
        expect(publicAddress).toBe(
            'one1pjrtg0vvzz8ttts9yxq90uxnz08ellth0d4hd0',
        );
    });

    test('generateOKXPublicAddress', async () => {
        const rootNode = getRootNode({ mnemonic, network });
        const publicAccountNode = getPublicMasterKey({
            bipIdCoin: 60,
            protocol: 44,
            rootNode,
        });
        const publicAddress = getOKXPublicAddress({
            change: 0,
            index: 0,
            publicAccountNode,
        });
        expect(publicAddress).toBe('ex1pjrtg0vvzz8ttts9yxq90uxnz08ellthg9dn08');
    });
});
