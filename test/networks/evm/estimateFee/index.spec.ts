import { describe } from 'mocha';
import Web3 from 'web3';
import { estimateFeeTransfer } from '../../../../src/networks/evm/estimateFee';
import BigNumber from 'bignumber.js';
const web3 = new Web3('https://rpc.mevblocker.io/');
describe('estimateFee', () => {
    describe('estimateBridgeFee', async () => {});
    describe('estimateTokenFee', () => {});
    describe('estimateCurrencyFee(ETH)', async () => {
        const { gasPrice, estimateGas, transaction } =
            await estimateFeeTransfer({
                web3,
                chainId: 1,
                priorityFee: '1000000000',
                feeRatio: 0.5,
                source: '0x1402066a3392FF3EA724Ae6ee64194c5D93090DF',
                destination: '0x41414D3EfDf47376ba3D8c7774424AfC7B417Cbf',
                amount: new BigNumber('0.0001').shiftedBy(18).toString(10),
            });
        console.log(gasPrice);
        console.log(estimateGas);
        console.log(transaction);
    });
});
