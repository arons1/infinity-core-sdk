"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const buildTransaction_1 = require("../../../../lib/commonjs/networks/evm/buildTransaction");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const helper_1 = require("../helper");
(0, globals_1.describe)('buildTransaction', () => {
    (0, globals_1.test)('buildTokenTransaction', async () => {
        const transaction = await (0, buildTransaction_1.buildTokenTransaction)({
            web3: helper_1.web3Ethereum,
            chainId: 1,
            priorityFee: '1000000000',
            feeRatio: 0.5,
            tokenContract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
            source: '0x1402066a3392FF3EA724Ae6ee64194c5D93090DF',
            destination: '0x41414D3EfDf47376ba3D8c7774424AfC7B417Cbf',
            value: new bignumber_js_1.default('0.0001').shiftedBy(18).toString(10),
        });
        (0, globals_1.expect)(transaction.from).toBe('0x1402066a3392FF3EA724Ae6ee64194c5D93090DF');
    });
});
