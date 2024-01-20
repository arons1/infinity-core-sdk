"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const web3_1 = __importDefault(require("web3"));
const estimateFee_1 = require("../../../../src/networks/evm/estimateFee");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const web3 = new web3_1.default('https://rpc.mevblocker.io/');
(0, mocha_1.describe)('estimateFee', () => {
    (0, mocha_1.describe)('estimateBridgeFee', async () => { });
    (0, mocha_1.describe)('estimateTokenFee', () => { });
    (0, mocha_1.describe)('estimateCurrencyFee(ETH)', async () => {
        const { gasPrice, estimateGas, transaction } = await (0, estimateFee_1.estimateFeeTransfer)({
            web3,
            chainId: 1,
            priorityFee: '1000000000',
            feeRatio: 0.5,
            source: '0x1402066a3392FF3EA724Ae6ee64194c5D93090DF',
            destination: '0x41414D3EfDf47376ba3D8c7774424AfC7B417Cbf',
            amount: new bignumber_js_1.default('0.0001').shiftedBy(18).toString(10),
        });
        console.log(gasPrice);
        console.log(estimateGas);
        console.log(transaction);
    });
});
