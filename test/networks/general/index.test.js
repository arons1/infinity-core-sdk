"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const generate_address_1 = require("../../../lib/commonjs/networks/generate_address");
const secp256k1_1 = require("../../../lib/commonjs/networks/utils/secp256k1");
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
    (0, globals_1.test)('generateAddressesPrivate', async () => {
        const addresses = (0, generate_address_1.generateAddresses)({ mnemonic, idCoin: 'btc' });
        console.log(addresses);
        (0, globals_1.expect)(true).toBe(true);
    });
    (0, globals_1.test)('generatePublicAddresses', async () => {
        const rootNode = (0, secp256k1_1.getRootNode)({ mnemonic, network: networkBTC });
        const publicNode = (0, secp256k1_1.getPublicMasterKey)({
            bipIdCoin: 0,
            protocol: 49,
            rootNode,
        });
        const addresses = (0, generate_address_1.generatePublicAddresses)({
            idCoin: 'btc',
            publicNode,
            change: 1,
            index: 1,
            derivation: 'wrapped-segwit',
        });
        console.log(addresses);
        (0, globals_1.expect)(addresses.publicAddress).toBe('3BcSzvLjiayamMJRVZsXfmNo6YLYgPE1U2');
    });
});
