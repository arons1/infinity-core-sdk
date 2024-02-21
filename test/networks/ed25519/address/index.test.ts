import { describe, expect, test } from '@jest/globals';
import {
    getSeed,
    getPublicKey,
    getPublicStellarAddress,
    getPublicSolanaAddress,
} from '../../../../lib/commonjs/networks/ed25519/address/index';

const mnemonic =
    'derive lab over dragon nothing pioneer until deputy inherit help next release';

describe('generateAddressED25519', () => {
    test('generateStellarAddress', async () => {
        const seed = getSeed({ mnemonic });
        const publicKey = getPublicKey({
            path: "m/44'/148'/0'",
            seed,
        });
        const publicAddress = getPublicStellarAddress({ publicKey });
        expect(publicAddress).toBe(
            'GCYKH5F7TTFCKPB25N6ZMA6NUYE62P4QOBZ5WCQGEAQPEZEMNW7F3TOO',
        );
    });
    test('generateSolanaAddress', async () => {
        const seed = getSeed({ mnemonic });
        const publicKey = getPublicKey({
            path: "m/44'/501'/0'/0'",
            seed,
        });
        const publicAddress = getPublicSolanaAddress({ publicKey });
        expect(publicAddress).toBe(
            'HSPjuCaHafg3YUfcQy3iVkLL4g639xHBC9FEiQNzmrWZ',
        );
    });
});
