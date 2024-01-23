"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const web3_1 = __importDefault(require("web3"));
const estimateFee_1 = require("../../../../src/networks/evm/estimateFee");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const web3 = new web3_1.default('https://rpc.mevblocker.io/');
const web3BSC = new web3_1.default('https://bsc-dataseed.bnbchain.org/');
(0, globals_1.describe)('estimateFee', () => {
    (0, globals_1.test)('estimateCurrencyFee(ETH)', async () => {
        const { estimateGas } = await (0, estimateFee_1.estimateFeeTransfer)({
            web3,
            chainId: 1,
            priorityFee: '1000000000',
            feeRatio: 0.5,
            source: '0x1402066a3392FF3EA724Ae6ee64194c5D93090DF',
            destination: '0x41414D3EfDf47376ba3D8c7774424AfC7B417Cbf',
            amount: new bignumber_js_1.default('0.0001').shiftedBy(18).toString(10),
        });
        (0, globals_1.expect)(estimateGas).toBe(21000n);
    });
    (0, globals_1.test)('estimateBridgeFee', async () => {
        const { estimateGas } = await (0, estimateFee_1.estimateFeeTransfer)({
            web3: web3BSC,
            chainId: 56,
            priorityFee: '1000000000',
            feeRatio: 0.5,
            source: '0xF977814e90dA44bFA03b6295A0616a897441aceC',
            destination: 'bnb1cklnk9wwj9w4h2cn3sugqdlrayf7t89d9m62cc',
            amount: new bignumber_js_1.default('2').shiftedBy(18).toString(10),
        });
        (0, globals_1.expect)(estimateGas).toBe(82488n);
    });
});
