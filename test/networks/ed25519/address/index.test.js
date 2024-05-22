"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const solana_1 = require("../../../../lib/commonjs/networks/utils/solana");
const stellar_1 = require("../../../../lib/commonjs/networks/utils/stellar");
const tezos_1 = require("../../../../lib/commonjs/networks/utils/tezos");
const index_1 = require("../../../../lib/commonjs/networks/ed25519/address/index");
const xrp_1 = require("../../../../lib/commonjs/networks/utils/xrp");
const index_2 = require("../../../../lib/commonjs/networks/ed25519/address/index");
const tezos_2 = require("../../../../lib/commonjs/networks/utils/tezos");
const registry_1 = require("../../../../lib/commonjs/networks/registry");
const config_1 = __importDefault(require("../../../../lib/commonjs/networks/config"));
const mnemonic = 'derive lab over dragon nothing pioneer until deputy inherit help next release';
(0, globals_1.describe)('generateAddressED25519', () => {
    (0, globals_1.test)('generateStellarAddress', async () => {
        const seed = (0, index_2.getSeed)({ mnemonic });
        const keyPair = (0, index_2.getKeyPair)({
            path: config_1.default[registry_1.Coins.STELLAR].derivations[0].path,
            seed,
            walletAccount: 0
        });
        const publicAddress = (0, index_2.getPublicStellarAddress)({
            publicKey: (0, index_2.getPublicKey)({ keyPair, bipIdCoin: registry_1.CoinIds.STELLAR }),
        });
        (0, globals_1.expect)(publicAddress).toBe('GCYKH5F7TTFCKPB25N6ZMA6NUYE62P4QOBZ5WCQGEAQPEZEMNW7F3TOO');
        (0, globals_1.expect)((0, stellar_1.isValidAddress)(publicAddress)).toBe(true);
    });
    (0, globals_1.test)('generateSolanaAddress', async () => {
        const seed = (0, index_2.getSeed)({ mnemonic });
        const keyPair = (0, index_2.getKeyPair)({
            path: config_1.default[registry_1.Coins.SOLANA].derivations[0].path,
            seed,
            walletAccount: 0
        });
        const publicAddress = (0, index_2.getPublicSolanaAddress)({
            publicKey: (0, index_2.getPublicKey)({ keyPair, bipIdCoin: registry_1.CoinIds.SOLANA }),
        });
        (0, globals_1.expect)(publicAddress).toBe('HSPjuCaHafg3YUfcQy3iVkLL4g639xHBC9FEiQNzmrWZ');
        (0, globals_1.expect)((0, solana_1.isValidAddress)(publicAddress)).toBe(true);
    });
    (0, globals_1.test)('generateTezosAddress', async () => {
        const seed = (0, index_2.getSeed)({ mnemonic });
        const keyPair = (0, index_2.getKeyPair)({
            path: config_1.default[registry_1.Coins.TEZOS].derivations[0].path,
            seed,
            walletAccount: 0
        });
        const publicAddress = (0, index_2.getPublicTezosAddress)({
            publicKey: (0, index_2.getPublicKey)({ keyPair, bipIdCoin: registry_1.CoinIds.TEZOS }),
        });
        const publicHash = (0, index_1.getTezosPublicKeyHash)({
            keyPair,
        });
        (0, globals_1.expect)(publicAddress).toBe('tz1bHaVSz1e9GeRMV7MUkS5wZmMH5qf8m8Ym');
        (0, globals_1.expect)((0, tezos_1.isValidAddress)(publicAddress)).toBe(true);
        (0, globals_1.expect)((0, tezos_2.isValidPublicKey)(publicHash)).toBe(true);
    });
    (0, globals_1.test)('generateXRPAddress', async () => {
        const seed = (0, index_2.getSeed)({ mnemonic });
        const keyPair = (0, index_2.getKeyPair)({
            path: config_1.default[registry_1.Coins.XRP].derivations[0].path,
            seed,
            walletAccount: 0
        });
        const publicAddress = (0, index_2.getPublicXRPAddress)({
            publicKey: (0, index_2.getPublicKey)({ keyPair, bipIdCoin: registry_1.CoinIds.XRP }),
        });
        (0, globals_1.expect)(publicAddress).toBe('rwDLcZL1MwUmyLwshgpxE6zRhxkAorwQDp');
        (0, globals_1.expect)((0, xrp_1.isValidAddress)(publicAddress)).toBe(true);
    });
});
