"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const web3_1 = __importDefault(require("web3"));
const signMessage_1 = require("../../../../lib/commonjs/networks/evm/signMessage");
const address_1 = require("../../../../lib/commonjs/networks/evm/address");
const web3BSC = new web3_1.default('https://bsc-dataseed.bnbchain.org/');
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
        const masterNode = (0, address_1.getMasterNode)({ mnemonic, network });
        const privateMasterNode = (0, address_1.getPrivateMasterKey)({
            bipIdCoin: 60,
            protocol: 44,
            masterNode,
        });
        const privateKey = (0, address_1.getPrivateKey)({
            privateMasterNode,
        });
        const { signature } = await (0, signMessage_1.signMessage)({
            web3: web3BSC,
            message: 'Some data',
            privateKey: privateKey,
        });
        (0, globals_1.expect)(signature).toBe('0xc43ae069d67e364a0a539f20a2a598cbf9f2988e0b4c26ec79d9cfc42a3621c42fc5fe5887e991d0a45951e23799b6d58c6f8a8813e622398ca23219f88670aa1b');
    });
    (0, globals_1.test)('verifyMessage(BSC)', async () => {
        const masterNode = (0, address_1.getMasterNode)({ mnemonic, network });
        const publicMasterNode = (0, address_1.getPublicMasterKey)({
            bipIdCoin: 60,
            protocol: 44,
            masterNode,
        });
        const publicAddress = (0, address_1.getPublicAddress)({
            publicMasterNode,
        });
        const signature = '0xc43ae069d67e364a0a539f20a2a598cbf9f2988e0b4c26ec79d9cfc42a3621c42fc5fe5887e991d0a45951e23799b6d58c6f8a8813e622398ca23219f88670aa1b';
        const verify = await (0, signMessage_1.verifyMessage)({
            web3: web3BSC,
            message: 'Some data',
            address: publicAddress,
            signature,
        });
        (0, globals_1.expect)(verify).toBe(true);
    });
});
