"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const ed25519_1 = require("../../../../lib/commonjs/networks/ed25519");
const mnemonic = 'derive lab over dragon nothing pioneer until deputy inherit help next release';
(0, globals_1.describe)('signMessageED25519', () => {
    (0, globals_1.test)('signMessageStellar', async () => {
        const seed = (0, ed25519_1.getSeed)({ mnemonic });
        const secretKey = (0, ed25519_1.getSecretKey)({
            path: "m/44'/148'/0'",
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
            path: "m/44'/501'/0'",
            seed,
        });
        const signedMessage = (0, ed25519_1.sign)({
            secretKey,
            message: Buffer.from('Message to sign', 'utf-8'),
        });
        (0, globals_1.expect)(Buffer.from(signedMessage).toString('hex')).toBe('81d8bea6041999a5881dfe3e909f8d18140b7bfab074a22dfa7c4a16397d264d48951a200398292bed4b19b5de5928c93b942284211ce03e0319d46c13e38004');
    });
});
