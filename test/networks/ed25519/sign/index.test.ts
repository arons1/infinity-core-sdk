import { describe, expect, test } from '@jest/globals';
import {
    getSeed,
    sign,
    getSecretKey,
} from '../../../../lib/commonjs/networks/ed25519';

const mnemonic =
    'derive lab over dragon nothing pioneer until deputy inherit help next release';

describe('signMessageED25519', () => {
    test('signMessageStellar', async () => {
        const seed = getSeed({ mnemonic });
        const secretKey = getSecretKey({
            path: "m/44'/148'/0'",
            seed,
        });
        const signedMessage = sign({
            secretKey,
            message: Buffer.from('Message to sign', 'utf-8'),
        });
        expect(Buffer.from(signedMessage).toString('hex')).toBe(
            '6dfed7942b499dd09e6dff5047b047f3f012728ef5b03ba942effe552b27929530db5ca9c0ad4ef133220d4462277fe9e41b7f77cd16071338f9d83e2ff27c03',
        );
    });
    test('signMessageSolana', async () => {
        const seed = getSeed({ mnemonic });
        const secretKey = getSecretKey({
            path: "m/44'/501'/0'",
            seed,
        });
        const signedMessage = sign({
            secretKey,
            message: Buffer.from('Message to sign', 'utf-8'),
        });
        expect(Buffer.from(signedMessage).toString('hex')).toBe(
            '81d8bea6041999a5881dfe3e909f8d18140b7bfab074a22dfa7c4a16397d264d48951a200398292bed4b19b5de5928c93b942284211ce03e0319d46c13e38004',
        );
    });
});
