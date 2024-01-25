"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const estimateFee_1 = require("../../../../lib/commonjs/networks/evm/estimateFee");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const helper_1 = require("../helper");
(0, globals_1.describe)('estimateFee', () => {
    (0, globals_1.test)('estimateCurrencyFee(ETH)', async () => {
        const { estimateGas } = await (0, estimateFee_1.estimateFeeTransfer)({
            web3: helper_1.web3Ethereum,
            chainId: 1,
            priorityFee: '1000000000',
            feeRatio: 0.5,
            source: '0x1402066a3392FF3EA724Ae6ee64194c5D93090DF',
            destination: '0x41414D3EfDf47376ba3D8c7774424AfC7B417Cbf',
            amount: new bignumber_js_1.default('0.0001').shiftedBy(18).toString(10),
        });
        (0, globals_1.expect)(estimateGas).toBe(21000n);
    });
    (0, globals_1.test)('estimateTokenFee(BSC)', async () => {
        const { estimateGas } = await (0, estimateFee_1.estimateFeeTransfer)({
            web3: helper_1.web3BSC,
            chainId: 56,
            priorityFee: '1000000000',
            feeRatio: 0.5,
            source: '0xF977814e90dA44bFA03b6295A0616a897441aceC',
            tokenContract: '0x7a58c0be72be218b41c608b7fe7c5bb630736c71',
            destination: '0x41414D3EfDf47376ba3D8c7774424AfC7B417Cbf',
            amount: new bignumber_js_1.default('1').shiftedBy(18).toString(10),
        });
        (0, globals_1.expect)(estimateGas).toBe(21632n);
    });
    (0, globals_1.test)('estimateBridgeFee', async () => {
        const { estimateGas } = await (0, estimateFee_1.estimateFeeTransfer)({
            web3: helper_1.web3BSC,
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
