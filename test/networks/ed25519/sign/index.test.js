"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const ed25519_1 = require("../../../../lib/commonjs/networks/ed25519");
const config_1 = __importDefault(require("../../../../lib/commonjs/networks/config"));
const registry_1 = require("../../../../lib/commonjs/networks/registry");
const mnemonic = 'derive lab over dragon nothing pioneer until deputy inherit help next release';
(0, globals_1.describe)('signMessageED25519', () => {
    (0, globals_1.test)('signMessageStellar', async () => {
        const seed = (0, ed25519_1.getSeed)({ mnemonic });
        const secretKey = (0, ed25519_1.getSecretKey)({
            path: config_1.default[registry_1.Coins.TEZOS].derivations[0].path,
            seed,
        });
        const signedMessage = (0, ed25519_1.sign)({
            secretKey,
            message: Buffer.from('Message to sign', 'utf-8'),
        });
        (0, globals_1.expect)(Buffer.from(signedMessage).toString('hex')).toBe('6dfed7942b499dd09e6dff5047b047f3f012728ef5b03ba942effe552b27929530db5ca9c0ad4ef133220d4462277fe9e41b7f77cd16071338f9d83e2ff27c03');
    });
    (0, globals_1.test)('signMessageSolana', async () => {
        const seed = (0, ed25519_1.getSeed)({ mnemonic });
        const secretKey = (0, ed25519_1.getSecretKey)({
            path: config_1.default[registry_1.Coins.SOLANA].derivations[0].path,
            seed,
        });
        const signedMessage = (0, ed25519_1.sign)({
            secretKey,
            message: Buffer.from('Message to sign', 'utf-8'),
        });
        (0, globals_1.expect)(Buffer.from(signedMessage).toString('hex')).toBe('f929e426aec83c0460a17eab3d3f872239c08ee442e3dabdad5ae14e50afb47452fc6e28a8e9d4043227ff6113dd7a0893ea47580242f2d877743581ab718402');
    });
});
