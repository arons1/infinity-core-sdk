import { describe, expect, test } from '@jest/globals';
import {
    getSeed,
    sign,
    getSecretKey,
} from '../../../../lib/commonjs/networks/ed25519';
import derivations from '../../../../lib/commonjs/networks/derivations';
import { Coins } from '../../../../lib/commonjs/networks/registry';

const mnemonic =
    'derive lab over dragon nothing pioneer until deputy inherit help next release';

describe('signMessageED25519', () => {
    test('signMessageStellar', async () => {
        const seed = getSeed({ mnemonic });
        const secretKey = getSecretKey({
            path: derivations[Coins.STELLAR].derivations[0].path,
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
            path: derivations[Coins.SOLANA].derivations[0].path,
            seed,
        });
        const signedMessage = sign({
            secretKey,
            message: Buffer.from('Message to sign', 'utf-8'),
        });
        expect(Buffer.from(signedMessage).toString('hex')).toBe(
            'f929e426aec83c0460a17eab3d3f872239c08ee442e3dabdad5ae14e50afb47452fc6e28a8e9d4043227ff6113dd7a0893ea47580242f2d877743581ab718402',
        );
    });
});
