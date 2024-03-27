"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const signMessage_1 = require("../../../../lib/commonjs/networks/evm/signMessage");
const address_1 = require("../../../../lib/commonjs/networks/evm/address");
const secp256k1_1 = require("../../../../lib/commonjs/networks/utils/secp256k1");
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
(0, globals_1.describe)('signMessageEVM', () => {
    (0, globals_1.test)('signMessage(BSC)', async () => {
        const rootNode = (0, secp256k1_1.getRootNode)({ mnemonic, network });
        const privateAccountNode = (0, secp256k1_1.getPrivateMasterKey)({
            bipIdCoin: registry_1.CoinIds.ETH,
            protocol: 44,
            rootNode,
        });
        const privateKey = (0, secp256k1_1.getPrivateKey)({
            privateAccountNode,
        }).privateKey;
        const signature = (0, signMessage_1.signMessage)({
            message: 'Some data',
            privateKey: privateKey,
        });
        (0, globals_1.expect)(signature).toBe('0xc43ae069d67e364a0a539f20a2a598cbf9f2988e0b4c26ec79d9cfc42a3621c42fc5fe5887e991d0a45951e23799b6d58c6f8a8813e622398ca23219f88670aa1b');
    });
    (0, globals_1.test)('verifyMessage(BSC)', async () => {
        const rootNode = (0, secp256k1_1.getRootNode)({ mnemonic, network });
        const publicAccountNode = (0, secp256k1_1.getPublicMasterKey)({
            bipIdCoin: registry_1.CoinIds.ETH,
            protocol: 44,
            rootNode,
        });
        const publicAddress = (0, address_1.getPublicAddress)({
            publicAccountNode,
        });
        const signature = '0xc43ae069d67e364a0a539f20a2a598cbf9f2988e0b4c26ec79d9cfc42a3621c42fc5fe5887e991d0a45951e23799b6d58c6f8a8813e622398ca23219f88670aa1b';
        const verify = await (0, signMessage_1.verifyMessage)({
            message: 'Some data',
            address: publicAddress,
            signature,
        });
        (0, globals_1.expect)(verify).toBe(true);
    });
});
