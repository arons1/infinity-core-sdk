import { describe, expect, test } from '@jest/globals';
import {
    getMasterNode,
    getPrivateAddress,
    getPrivateMasterKey,
    getPublicAddress,
} from '../../../../lib/commonjs/networks/evm/address';
import { TransactionEVM } from '../../../../lib/commonjs/networks/evm/general/types';
import { signTransaction } from '../../../../lib/commonjs/networks/evm/signTransaction';
import { web3Ethereum } from '../helper';
const mnemonic =
    'derive lab over dragon nothing pioneer until deputy inherit help next release';
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
describe('signTransactionEMV', () => {
    test('signTransaction(ETH)', async () => {
        const masterNode = getMasterNode({ mnemonic, network });
        const privateMasterNode = getPrivateMasterKey({
            bipIdCoin: 60,
            protocol: 44,
            masterNode,
        });
        const publicAddress = getPublicAddress({
            change: 0,
            index: 0,
            publicMasterNode: privateMasterNode,
        });
        const privateAddress = getPrivateAddress({ privateMasterNode });
        const transaction = {
            value: '0x100000000',
            from: publicAddress,
            nonce: '180',
            gasLimit: '21000',
            maxFeePerGas: '9745321614',
            maxPriorityFeePerGas: '10909998',
            to: '0x1402066a3392FF3EA724Ae6ee64194c5D93090DF',
        } as TransactionEVM;
        const rawTransaction = await signTransaction({
            web3: web3Ethereum,
            transaction,
            privateAddress,
        });
        expect(rawTransaction).toBe(
            '0x02f8700181b483a6792e850244ddce8e825208941402066a3392ff3ea724ae6ee64194c5d93090df85010000000080c080a09743e72a2067cfe20c14fff205878761a613af73a732171555587f751d8a1963a04219f98d251e561a563794de5a002d733e76c79323594ebbc9bda5c6c5030022',
        );
    });
});
