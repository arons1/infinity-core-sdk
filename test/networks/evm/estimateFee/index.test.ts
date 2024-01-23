import { describe, expect, test } from '@jest/globals';
import Web3 from 'web3';
import { estimateFeeTransfer } from '../../../../src/networks/evm/estimateFee';
import BigNumber from 'bignumber.js';
const web3 = new Web3('https://rpc.mevblocker.io/');
const web3BSC = new Web3('https://bsc-dataseed.bnbchain.org/');
describe('estimateFee', () => {
    test('estimateCurrencyFee(ETH)', async () => {
        const { estimateGas } = await estimateFeeTransfer({
            web3,
            chainId: 1,
            priorityFee: '1000000000',
            feeRatio: 0.5,
            source: '0x1402066a3392FF3EA724Ae6ee64194c5D93090DF',
            destination: '0x41414D3EfDf47376ba3D8c7774424AfC7B417Cbf',
            amount: new BigNumber('0.0001').shiftedBy(18).toString(10),
        });
        expect(estimateGas).toBe(21000n);
    });
    test('estimateBridgeFee', async () => {
        const { estimateGas } = await estimateFeeTransfer({
            web3: web3BSC,
            chainId: 56,
            priorityFee: '1000000000',
            feeRatio: 0.5,
            source: '0xF977814e90dA44bFA03b6295A0616a897441aceC',
            destination: 'bnb1cklnk9wwj9w4h2cn3sugqdlrayf7t89d9m62cc',
            amount: new BigNumber('2').shiftedBy(18).toString(10),
        });
        expect(estimateGas).toBe(82488n);
    });
});
