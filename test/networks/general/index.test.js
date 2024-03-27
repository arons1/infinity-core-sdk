"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const generate_address_1 = require("../../../lib/commonjs/networks/generate_address");
const secp256k1_1 = require("../../../lib/commonjs/networks/utils/secp256k1");
const registry_1 = require("../../../lib/commonjs/networks/registry");
const constants_1 = require("../../../src/networks/constants");
const mnemonic = 'derive lab over dragon nothing pioneer until deputy inherit help next release';
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
(0, globals_1.describe)('generateAddresses', () => {
    (0, globals_1.test)('generateAddressesPrivateBTC', async () => {
        const addresses = (0, generate_address_1.generateAddresses)({ mnemonic, idCoin: registry_1.Coins.BTC });
        (0, globals_1.expect)(addresses[0].privateAddress).toBe('L3ErgHszidgB6NfmZ7vbUNZjdqT8kHFeMWiWkAZMPPfFr3L4ini5');
        (0, globals_1.expect)(addresses[1].privateAddress).toBe('L17eqR4t4JJpKar63JKPv9sZxmUNGBeT6dTp6KSVVGqumAhEHj8A');
        (0, globals_1.expect)(addresses[0].publicAddress).toBe('bc1qh493z9tmfegw2z4ly26whu8crh3ukwl4v4jkvj');
        (0, globals_1.expect)(addresses[1].publicAddress).toBe('32juhuebHD1h2nEkBeUN3LnrNAVVdfuB8m');
    });
    (0, globals_1.test)('generatePublicAddressesBTC', async () => {
        const rootNode = (0, secp256k1_1.getRootNode)({ mnemonic, network: networkBTC });
        const publicNode = (0, secp256k1_1.getPublicMasterKey)({
            bipIdCoin: 0,
            protocol: registry_1.Protocol.WRAPPED_SEGWIT,
            rootNode,
        });
        const addresses = (0, generate_address_1.generatePublicAddresses)({
            idCoin: registry_1.Coins.BTC,
            publicNode,
            change: 1,
            index: 1,
            derivation: constants_1.DerivationName.WRAPPED_SEGWIT,
        });
        (0, globals_1.expect)(addresses.publicAddress).toBe('3BcSzvLjiayamMJRVZsXfmNo6YLYgPE1U2');
    });
    (0, globals_1.test)('generateAddressesPrivateSolana', async () => {
        const addresses = (0, generate_address_1.generateAddresses)({ mnemonic, idCoin: registry_1.Coins.SOLANA });
        (0, globals_1.expect)(addresses[0].privateAddress).toBe('rvHpYF2K2vj1A129LKpmy7bXwcL72ADCSwH71K9EBiW61ajyU3wegrHZUoHZc3sVykGtFVgFi37dK3RbLLp9ipm');
        (0, globals_1.expect)(addresses[0].publicAddress).toBe('HSPjuCaHafg3YUfcQy3iVkLL4g639xHBC9FEiQNzmrWZ');
    });
    (0, globals_1.test)('generateAddressesPrivateETH', async () => {
        const addresses = (0, generate_address_1.generateAddresses)({ mnemonic, idCoin: registry_1.Coins.ETH });
        (0, globals_1.expect)(addresses[0].privateAddress).toBe('0x1abc3d096fdefb6de18821a75dafa7aec4245d91a4019c23d8ca6d979947e088');
        (0, globals_1.expect)(addresses[0].publicAddress).toBe('0x83D8a68D42aE403ac6726d388e25cc44f5ED2d76');
    });
});
