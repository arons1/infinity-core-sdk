import { describe, expect, test } from '@jest/globals';
import {
    getKeyPair,
    getPrivateKey,
    getSeed,
    signTransaction,
} from '../../../../lib/commonjs/networks/ed25519';

const mnemonic =
    'derive lab over dragon nothing pioneer until deputy inherit help next release';

describe('signTransactionED25519', () => {

    test('signTransaction', async () => {
        const seed = getSeed({ mnemonic });
        const keyPair = getKeyPair({
            path: "m/44'/148'/0'",
            seed,
        });
        const signedTran = signTransaction({
            privateKey:getPrivateKey({keyPair}),
            transactionSerialized:Buffer.from('Message to sign','utf-8')
        });
        expect(signedTran).toBe('rwDLcZL1MwUmyLwshgpxE6zRhxkAorwQDp');
    });
});
