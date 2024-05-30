import { describe, expect, test } from '@jest/globals';
import { isValidAddress } from '../../../../lib/commonjs/networks/utils/solana';
import { isValidAddress as isValidAddressStellar } from '../../../../lib/commonjs/networks/utils/stellar';
import { isValidAddress as isValidAddressTezos } from '../../../../lib/commonjs/networks/utils/tezos';
import { getTezosPublicKeyHash } from '../../../../lib/commonjs/networks/ed25519/address/index';
import { isValidAddress as isValidAddressKSM } from '../../../../lib/commonjs/networks/utils/ksm';
import { isValidAddress as isValidAddressDOT } from '../../../../lib/commonjs/networks/utils/dot';
import { isValidAddress as isValidAddressXRP } from '../../../../lib/commonjs/networks/utils/xrp';

import {
    getSeed,
    getPublicStellarAddress,
    getPublicSolanaAddress,
    getPublicTezosAddress,
    getPublicKey,
    getKeyPair,
    getPublicXRPAddress,
    getPublicPolkadotAddress,
    getPublicKSMAddress,
} from '../../../../lib/commonjs/networks/ed25519/address/index';
import { isValidPublicKey } from '../../../../lib/commonjs/networks/utils/tezos';
import { CoinIds, Coins } from '../../../../lib/commonjs/networks/registry';
import config from '../../../../lib/commonjs/networks/config';
const mnemonic =
    'derive lab over dragon nothing pioneer until deputy inherit help next release';

describe('generateAddressED25519', () => {
    test('generateStellarAddress', async () => {
        const seed = getSeed({ mnemonic });
        const keyPair = getKeyPair({
            path: config[Coins.STELLAR].derivations[0].path,
            seed,
            walletAccount: 0,
        });
        const publicAddress = getPublicStellarAddress({
            publicKey: getPublicKey({ keyPair, bipIdCoin: CoinIds.STELLAR }),
        });
        expect(publicAddress).toBe(
            'GCYKH5F7TTFCKPB25N6ZMA6NUYE62P4QOBZ5WCQGEAQPEZEMNW7F3TOO',
        );
        expect(isValidAddressStellar(publicAddress)).toBe(true);
    });
    test('generateSolanaAddress', async () => {
        const seed = getSeed({ mnemonic });
        const keyPair = getKeyPair({
            path: config[Coins.SOLANA].derivations[0].path,
            seed,
            walletAccount: 0,
        });
        const publicAddress = getPublicSolanaAddress({
            publicKey: getPublicKey({ keyPair, bipIdCoin: CoinIds.SOLANA }),
        });
        expect(publicAddress).toBe(
            'HSPjuCaHafg3YUfcQy3iVkLL4g639xHBC9FEiQNzmrWZ',
        );
        expect(isValidAddress(publicAddress)).toBe(true);
    });
    test('generateTezosAddress', async () => {
        const seed = getSeed({ mnemonic });
        const keyPair = getKeyPair({
            path: config[Coins.TEZOS].derivations[0].path,
            seed,
            walletAccount: 0,
        });
        const publicAddress = getPublicTezosAddress({
            publicKey: getPublicKey({ keyPair, bipIdCoin: CoinIds.TEZOS }),
        });
        const publicHash = getTezosPublicKeyHash({
            keyPair,
        });
        expect(publicAddress).toBe('tz1bHaVSz1e9GeRMV7MUkS5wZmMH5qf8m8Ym');
        expect(isValidAddressTezos(publicAddress)).toBe(true);
        expect(isValidPublicKey(publicHash)).toBe(true);
    });
    test('generateXRPAddress', async () => {
        const seed = getSeed({ mnemonic });
        const keyPair = getKeyPair({
            path: config[Coins.XRP].derivations[0].path,
            seed,
            walletAccount: 0,
        });
        const publicAddress = getPublicXRPAddress({
            publicKey: getPublicKey({ keyPair, bipIdCoin: CoinIds.XRP }),
        });
        expect(publicAddress).toBe('rwDLcZL1MwUmyLwshgpxE6zRhxkAorwQDp');
        expect(isValidAddressXRP(publicAddress)).toBe(true);
    });
    test('generateDOTAddress', async () => {
        const seed = getSeed({ mnemonic });
        const keyPair = getKeyPair({
            path: config[Coins.DOT].derivations[0].path,
            seed,
            walletAccount: 0,
        });
        const publicAddress = getPublicPolkadotAddress({
            publicKey: getPublicKey({ keyPair, bipIdCoin: CoinIds.DOT }),
        });
        expect(publicAddress).toBe(
            '15PevHkrsB6q43DPbyS5idBPZFuqXwoAkQqtkagxZRZicVr',
        );
        expect(isValidAddressDOT(publicAddress)).toBe(true);
    });
    test('generateKSMAddress', async () => {
        const seed = getSeed({ mnemonic });
        const keyPair = getKeyPair({
            path: config[Coins.KSM].derivations[0].path,
            seed,
            walletAccount: 0,
        });
        const publicAddress = getPublicKSMAddress({
            publicKey: getPublicKey({ keyPair, bipIdCoin: CoinIds.KSM }),
        });
        expect(publicAddress).toBe(
            'D8Kd9wUf3YEMGrnnD6agDDsppyiHBVfoHePwNgM9v3EGrcw',
        );
        expect(isValidAddressKSM(publicAddress)).toBe(true);
    });
});
