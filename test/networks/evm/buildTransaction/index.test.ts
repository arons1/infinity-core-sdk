import { describe, expect, test } from '@jest/globals';
import { buildTokenTransaction } from '../../../../lib/commonjs/networks/evm/buildTransaction';
import BigNumber from 'bignumber.js';
import { web3Ethereum } from '../helper';
describe('buildTransaction', () => {
    test('buildTokenTransaction', async () => {
        const transaction = await buildTokenTransaction({
            web3: web3Ethereum,
            chainId: 1,
            priorityFee: '1000000000',
            feeRatio: 0.5,
            tokenContract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
            source: '0x1402066a3392FF3EA724Ae6ee64194c5D93090DF',
            destination: '0x41414D3EfDf47376ba3D8c7774424AfC7B417Cbf',
            value: new BigNumber('0.0001').shiftedBy(18).toString(10),
        });
        expect(transaction.from).toBe(
            '0x1402066a3392FF3EA724Ae6ee64194c5D93090DF',
        );
    });
});
