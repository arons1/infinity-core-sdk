"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const address_1 = require("../../../../lib/commonjs/networks/evm/address");
const index_1 = require("../../../../lib/commonjs/networks/evm/address/index");
const index_2 = require("../../../../lib/commonjs/networks/evm/signTransaction/index");
const index_3 = require("../../../../src/networks/evm/signTransaction/index");
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
        const rootNode = (0, address_1.getRootNode)({ mnemonic, network });
        const privateAccountNode = (0, address_1.getPrivateMasterKey)({
            bipIdCoin: 60,
            protocol: 44,
            rootNode,
        });
        const publicAddress = (0, address_1.getPublicAddress)({
            change: 0,
            index: 0,
            publicAccountNode: privateAccountNode,
        });
        const privateKey = (0, index_1.getPrivateKey)({ privateAccountNode });
        const transaction = {
            value: '0x100000000',
            from: publicAddress,
            nonce: '180',
            gasLimit: '21000',
            maxFeePerGas: '9745321614',
            maxPriorityFeePerGas: '10909998',
            to: '0x1402066a3392FF3EA724Ae6ee64194c5D93090DF',
        };
        const rawTransaction = await (0, index_3.signEIP1559Transaction)({
            transaction,
            privateKey,
        });
        (0, globals_1.expect)(rawTransaction).toBe('0x02f8700181b483a6792e850244ddce8e825208941402066a3392ff3ea724ae6ee64194c5d93090df85010000000080c080a09743e72a2067cfe20c14fff205878761a613af73a732171555587f751d8a1963a04219f98d251e561a563794de5a002d733e76c79323594ebbc9bda5c6c5030022');
    });
    (0, globals_1.test)('signTransaction(BSC)', async () => {
        const rootNode = (0, address_1.getRootNode)({ mnemonic, network });
        const privateAccountNode = (0, address_1.getPrivateMasterKey)({
            bipIdCoin: 60,
            protocol: 44,
            rootNode,
        });
        const publicAddress = (0, address_1.getPublicAddress)({
            change: 0,
            index: 0,
            publicAccountNode: privateAccountNode,
        });
        const privateKey = (0, index_1.getPrivateKey)({ privateAccountNode });
        const transaction = {
            value: '0x100000000',
            from: publicAddress,
            nonce: '180',
            gasLimit: '21000',
            gasPrice: '9745321614',
            to: '0x1402066a3392FF3EA724Ae6ee64194c5D93090DF',
        };
        const rawTransaction = await (0, index_2.signLegacyTransaction)({
            transaction,
            privateKey,
        });
        (0, globals_1.expect)(rawTransaction).toBe('0x02f8700181b483a6792e850244ddce8e825208941402066a3392ff3ea724ae6ee64194c5d93090df85010000000080c080a09743e72a2067cfe20c14fff205878761a613af73a732171555587f751d8a1963a04219f98d251e561a563794de5a002d733e76c79323594ebbc9bda5c6c5030022');
    });
});
