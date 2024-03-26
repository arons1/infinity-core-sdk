import { describe, expect, test } from '@jest/globals';
import { isValidAddress } from '../../../../lib/commonjs/networks/utils/solana';
import { isValidAddress as isValidAddressStellar } from '../../../../lib/commonjs/networks/utils/stellar';
import { isValidAddress as isValidAddressTezos } from '../../../../lib/commonjs/networks/utils/tezos';
import { getTezosPublicKeyHash } from '../../../../src/networks/ed25519/address/index';

import {
    getSeed,
    getPublicStellarAddress,
    getPublicSolanaAddress,
    getPublicTezosAddress,
    getPublicKey,
    getKeyPair,
    getPublicXRPAddress,
} from '../../../../lib/commonjs/networks/ed25519/address/index';
import { isValidPublicKey } from '../../../../src/networks/utils/tezos';

const mnemonic =
    'derive lab over dragon nothing pioneer until deputy inherit help next release';

describe('generateAddressED25519', () => {
    test('generateStellarAddress', async () => {
        const seed = getSeed({ mnemonic });
        const keyPair = getKeyPair({
            path: "m/44'/148'/0'",
            seed,
        });
        const publicAddress = getPublicStellarAddress({
            publicKey: getPublicKey({ keyPair, coinId: 148 }),
        });
        expect(publicAddress).toBe(
            'GCYKH5F7TTFCKPB25N6ZMA6NUYE62P4QOBZ5WCQGEAQPEZEMNW7F3TOO',
        );
        expect(isValidAddressStellar(publicAddress)).toBe(true);
    });
    test('generateSolanaAddress', async () => {
        const seed = getSeed({ mnemonic });
        const keyPair = getKeyPair({
            path: "m/44'/501'/0'/0'",
            seed,
        });
        const publicAddress = getPublicSolanaAddress({
            publicKey: getPublicKey({ keyPair, coinId: 501 }),
        });
        expect(publicAddress).toBe(
            'HSPjuCaHafg3YUfcQy3iVkLL4g639xHBC9FEiQNzmrWZ',
        );
        expect(isValidAddress(publicAddress)).toBe(true);
    });
    test('generateTezosAddress', async () => {
        const seed = getSeed({ mnemonic });
        const keyPair = getKeyPair({
            path: "m/44'/1729'/0'/0'",
            seed,
        });
        const publicAddress = getPublicTezosAddress({
            publicKey: getPublicKey({ keyPair, coinId: 1729 }),
        });
        const publicHash = getTezosPublicKeyHash({
            keyPair
        })
        expect(publicAddress).toBe('tz1bHaVSz1e9GeRMV7MUkS5wZmMH5qf8m8Ym');
        expect(isValidAddressTezos(publicAddress)).toBe(true);
        expect(isValidPublicKey(publicHash)).toBe(true);

    });
    test('generateXRPAddress', async () => {
        const seed = getSeed({ mnemonic });
        const keyPair = getKeyPair({
            path: "m/44'/144'/0'/0/0",
            seed,
        });
        const publicAddress = getPublicXRPAddress({
            publicKey: getPublicKey({ keyPair, coinId: 144 }),
        });
        expect(publicAddress).toBe('rwDLcZL1MwUmyLwshgpxE6zRhxkAorwQDp');
    });
});
