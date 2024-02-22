import { describe, expect, test } from '@jest/globals';
import {
    getKeyPair,
    getSeed,
    signMessage,
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
            keyPair,
            message:Buffer.from('Message to sign','utf-8')
        });
        expect(signedMessage).toBe('rwDLcZL1MwUmyLwshgpxE6zRhxkAorwQDp');
    });
});
