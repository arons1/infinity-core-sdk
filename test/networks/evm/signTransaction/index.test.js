"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const address_1 = require("../../../../lib/commonjs/networks/evm/address");
const secp256k1_1 = require("../../../../lib/commonjs/networks/utils/secp256k1");
const index_1 = require("../../../../lib/commonjs/networks/evm/signTransaction/index");
const index_2 = require("../../../../lib/commonjs/networks/evm/signTransaction/index");
const secp256k1_2 = require("../../../../lib/commonjs/networks/utils/secp256k1");
const registry_1 = require("../../../../lib/commonjs/networks/registry");
const mnemonic = 'derive lab over dragon nothing pioneer until deputy inherit help next release';
const network = {
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
(0, globals_1.describe)('signTransactionEMV', () => {
    (0, globals_1.test)('signTransaction(ETH)', async () => {
        const rootNode = (0, secp256k1_2.getRootNode)({ mnemonic, network });
        const privateAccountNode = (0, secp256k1_2.getPrivateMasterKey)({
            bipIdCoin: registry_1.CoinIds.ETH,
            protocol: 44,
            rootNode,
        });
        const publicAddress = (0, address_1.getPublicAddress)({
            change: 0,
            index: 0,
            publicAccountNode: privateAccountNode,
        });
        const privateKey = (0, secp256k1_1.getPrivateKey)({ privateAccountNode })
            ?.privateKey;
        const transaction = {
            value: '0x100000000',
            from: publicAddress,
            nonce: '0xB4',
            gasLimit: '0x5208',
            maxFeePerGas: '0x244DDCE8E',
            maxPriorityFeePerGas: '0xA6792E',
            to: '0x1402066a3392FF3EA724Ae6ee64194c5D93090DF',
        };
        const rawTransaction = await (0, index_2.signEIP1559Transaction)({
            transaction,
            privateKey,
        });
        (0, globals_1.expect)(rawTransaction).toBe('0x02f8708081b483a6792e850244ddce8e825208941402066a3392ff3ea724ae6ee64194c5d93090df85010000000080c001a045f2799d2fc372225cb6cc820391c9e5e5930b42eb4fbafd676ed0385364b4e0a0112f967c43260ef8eb99eac9c9ba77cff8d30cd10d47536271e700bdf5e9e19f');
    });
    (0, globals_1.test)('signTransaction(BSC)', async () => {
        const rootNode = (0, secp256k1_2.getRootNode)({ mnemonic, network });
        const privateAccountNode = (0, secp256k1_2.getPrivateMasterKey)({
            bipIdCoin: registry_1.CoinIds.ETH,
            protocol: 44,
            rootNode,
        });
        const publicAddress = (0, address_1.getPublicAddress)({
            change: 0,
            index: 0,
            publicAccountNode: privateAccountNode,
        });
        const privateKey = (0, secp256k1_1.getPrivateKey)({ privateAccountNode })
            ?.privateKey;
        const transaction = {
            value: '0x100000000',
            from: publicAddress,
            nonce: '0xB4',
            gasLimit: '0x5208',
            gasPrice: '0x244DDCE8E',
            to: '0x1402066a3392FF3EA724Ae6ee64194c5D93090DF',
        };
        const rawTransaction = await (0, index_1.signLegacyTransaction)({
            transaction,
            privateKey,
        });
        (0, globals_1.expect)(rawTransaction).toBe('0xf86a81b4850244ddce8e825208941402066a3392ff3ea724ae6ee64194c5d93090df8501000000008023a01183852d7eb0ab5d4805beaed75f49cc56ae3c69fb87f07f23fb04e0bdd78740a05333e3cb944c1e2c5a5b5dbc93d3baf8e510b1c1c94bdfbff6fe5f0e59cb6ca8');
    });
});
