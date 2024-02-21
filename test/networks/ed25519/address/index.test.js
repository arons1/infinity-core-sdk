"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const index_1 = require("../../../../src/networks/ed25519/address/index");
const index_2 = require("../../../../lib/commonjs/networks/ed25519/address/index");
const mnemonic = 'derive lab over dragon nothing pioneer until deputy inherit help next release';
(0, globals_1.describe)('generateAddressED25519', () => {
    (0, globals_1.test)('generateStellarAddress', async () => {
        const seed = (0, index_2.getSeed)({ mnemonic });
        const keyPair = (0, index_2.getKeyPair)({
            path: "m/44'/148'/0'",
            seed,
        });
        const publicAddress = (0, index_2.getPublicStellarAddress)({
            publicKey: (0, index_1.getPublicKey)({ keyPair, coinId: 148 }),
        });
        (0, globals_1.expect)(publicAddress).toBe('GCYKH5F7TTFCKPB25N6ZMA6NUYE62P4QOBZ5WCQGEAQPEZEMNW7F3TOO');
    });
    (0, globals_1.test)('generateSolanaAddress', async () => {
        const seed = (0, index_2.getSeed)({ mnemonic });
        const keyPair = (0, index_2.getKeyPair)({
            path: "m/44'/501'/0'/0'",
            seed,
        });
        const publicAddress = (0, index_2.getPublicSolanaAddress)({
            publicKey: (0, index_1.getPublicKey)({ keyPair, coinId: 501 }),
        });
        (0, globals_1.expect)(publicAddress).toBe('HSPjuCaHafg3YUfcQy3iVkLL4g639xHBC9FEiQNzmrWZ');
    });
    (0, globals_1.test)('generateTezosAddress', async () => {
        const seed = (0, index_2.getSeed)({ mnemonic });
        const keyPair = (0, index_2.getKeyPair)({
            path: "m/44'/1729'/0'/0'",
            seed,
        });
        const publicAddress = (0, index_2.getPublicTezosAddress)({
            publicKey: (0, index_1.getPublicKey)({ keyPair, coinId: 1729 }),
        });
        (0, globals_1.expect)(publicAddress).toBe('tz1bHaVSz1e9GeRMV7MUkS5wZmMH5qf8m8Ym');
    });
    (0, globals_1.test)('generateXRPAddress', async () => {
        const seed = (0, index_2.getSeed)({ mnemonic });
        const keyPair = (0, index_2.getKeyPair)({
            path: "m/44'/144'/0'/0/0",
            seed,
        });
        const publicAddress = (0, index_2.getPublicXRPAddress)({
            publicKey: (0, index_1.getPublicKey)({ keyPair, coinId: 144 }),
        });
        (0, globals_1.expect)(publicAddress).toBe('rwDLcZL1MwUmyLwshgpxE6zRhxkAorwQDp');
    });
});
