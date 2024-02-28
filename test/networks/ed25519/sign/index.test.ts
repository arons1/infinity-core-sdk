import { describe, expect, test } from '@jest/globals';
import {
    getKeyPair,
    getSeed,
    signMessage,
    getPrivateKey,
} from '../../../../lib/commonjs/networks/ed25519';

const mnemonic =
    'derive lab over dragon nothing pioneer until deputy inherit help next release';

describe('signMessageED25519', () => {
    test('signMessage', async () => {
        const seed = getSeed({ mnemonic });
        const keyPair = getKeyPair({
            path: "m/44'/148'/0'",
            seed,
        });
        const signedMessage = signMessage({
            privateKey: getPrivateKey({ keyPair }),
            message: Buffer.from('Message to sign', 'utf-8'),
        });
        expect(Buffer.from(signedMessage).toString('hex')).toBe(
            '6dfed7942b499dd09e6dff5047b047f3f012728ef5b03ba942effe552b27929530db5ca9c0ad4ef133220d4462277fe9e41b7f77cd16071338f9d83e2ff27c03',
        );
    });
});
