"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const index_1 = require("../../../../lib/commonjs/networks/ed25519/address/index");
const mnemonic = 'derive lab over dragon nothing pioneer until deputy inherit help next release';
(0, globals_1.describe)('generateAddressED25519', () => {
    (0, globals_1.test)('generateStellarAddress', async () => {
        const seed = (0, index_1.getSeed)({ mnemonic });
        const keyPair = (0, index_1.getKeyPair)({
            path: "m/44'/148'/0'",
            seed,
        });
        const publicAddress = (0, index_1.getPublicStellarAddress)({
            publicKey: keyPair.publicKey,
        });
        (0, globals_1.expect)(publicAddress).toBe('GCYKH5F7TTFCKPB25N6ZMA6NUYE62P4QOBZ5WCQGEAQPEZEMNW7F3TOO');
    });
    (0, globals_1.test)('generateSolanaAddress', async () => {
        const seed = (0, index_1.getSeed)({ mnemonic });
        const keyPair = (0, index_1.getKeyPair)({
            path: "m/44'/501'/0'/0'",
            seed,
        });
        const publicAddress = (0, index_1.getPublicSolanaAddress)({
            publicKey: keyPair.publicKey,
        });
        (0, globals_1.expect)(publicAddress).toBe('HSPjuCaHafg3YUfcQy3iVkLL4g639xHBC9FEiQNzmrWZ');
    });
    (0, globals_1.test)('generateTezosAddress', async () => {
        const seed = (0, index_1.getSeed)({ mnemonic });
        const keyPair = (0, index_1.getKeyPair)({
            path: "m/44'/1729'/0'/0'",
            seed,
        });
        const publicAddress = (0, index_1.getPublicTezosAddress)({
            publicKey: keyPair.publicKey,
        });
        (0, globals_1.expect)(publicAddress).toBe('tz17WMGhvG8jCzkaFtUNk6yrgcNDim9gmdPWGNw4Fjd19fb');
    });
});
