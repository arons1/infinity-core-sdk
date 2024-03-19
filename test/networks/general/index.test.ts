import { describe, expect, test } from '@jest/globals';

import {
    generateAddresses,
    generatePublicAddresses,
} from '../../../lib/commonjs/networks/generate_address';
import {
    getPublicMasterKey,
    getRootNode,
} from '../../../lib/commonjs/networks/utils/secp256k1';
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
    test('generateAddressesPrivate', async () => {
        const addresses = generateAddresses({ mnemonic, idCoin: 'btc' });
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
    test('generatePublicAddresses', async () => {
        const rootNode = getRootNode({ mnemonic, network: networkBTC });
        const publicNode = getPublicMasterKey({
            bipIdCoin: 0,
            protocol: 49,
            rootNode,
        });
        const addresses = generatePublicAddresses({
            idCoin: 'btc',
            publicNode,
            change: 1,
            index: 1,
            derivation: 'wrapped-segwit',
        });
        expect(addresses.publicAddress).toBe(
            '3BcSzvLjiayamMJRVZsXfmNo6YLYgPE1U2',
        );
    });
});
