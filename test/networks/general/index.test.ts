import { describe, expect, test } from '@jest/globals';

import {
    generateAddresses,
    generatePublicAddresses,
} from '../../../lib/commonjs/networks/generate_address';
import {
    getPublicMasterKey,
    getRootNode,
} from '../../../lib/commonjs/networks/utils/secp256k1';
import { Coins, Protocol } from '../../../lib/commonjs/networks/registry';
import { DerivationName } from '../../../lib/commonjs/networks/constants';
const mnemonic =
    'derive lab over dragon nothing pioneer until deputy inherit help next release';
const networkBTC = {
    messagePrefix: '\u0018Bitcoin Signed Message:\n',
    bech32: 'bc',
    bip32: {
        public: 76067358,
        private: 76066276,
    },
    pubKeyHash: 0,
    scriptHash: 5,
    wif: 128,
};
describe('generateAddresses', () => {
    test('generateAddressesPrivateBTC', async () => {
        const addresses = generateAddresses({ mnemonic, idCoin: Coins.BTC });
        expect(addresses[0].privateAddress).toBe(
            'L3ErgHszidgB6NfmZ7vbUNZjdqT8kHFeMWiWkAZMPPfFr3L4ini5',
        );
        expect(addresses[1].privateAddress).toBe(
            'L17eqR4t4JJpKar63JKPv9sZxmUNGBeT6dTp6KSVVGqumAhEHj8A',
        );
        expect(addresses[0].publicAddress).toBe(
            'bc1qh493z9tmfegw2z4ly26whu8crh3ukwl4v4jkvj',
        );
        expect(addresses[1].publicAddress).toBe(
            '32juhuebHD1h2nEkBeUN3LnrNAVVdfuB8m',
        );
    });
    test('generatePublicAddressesBTC', async () => {
        const rootNode = getRootNode({ mnemonic, network: networkBTC });
        const publicAccountNode = getPublicMasterKey({
            bipIdCoin: 0,
            protocol: Protocol.WRAPPED_SEGWIT,
            rootNode,
        });
        const addresses = generatePublicAddresses({
            idCoin: Coins.BTC,
            publicAccountNode,
            change: 1,
            index: 1,
            derivation: DerivationName.WRAPPED_SEGWIT,
        });
        expect(addresses.publicAddress).toBe(
            '3BcSzvLjiayamMJRVZsXfmNo6YLYgPE1U2',
        );
    });
    test('generateAddressesPrivateSolana', async () => {
        const addresses = generateAddresses({ mnemonic, idCoin: Coins.SOLANA });
        expect(addresses[0].privateAddress).toBe(
            'rvHpYF2K2vj1A129LKpmy7bXwcL72ADCSwH71K9EBiW61ajyU3wegrHZUoHZc3sVykGtFVgFi37dK3RbLLp9ipm',
        );
        expect(addresses[0].publicAddress).toBe(
            'HSPjuCaHafg3YUfcQy3iVkLL4g639xHBC9FEiQNzmrWZ',
        );
    });
    test('generateAddressesPrivateETH', async () => {
        const addresses = generateAddresses({ mnemonic, idCoin: Coins.ETH });
        expect(addresses[0].privateAddress).toBe(
            '0x8a1db23fb2baa1b2f85a5c3bf5d1b70972caa3e66f537be7216d0ffdeb899d93',
        );
        expect(addresses[0].publicAddress).toBe(
            '0x0c86B43d8c108Eb5ae05218057F0d313Cf9FFD77',
        );
    });
});
