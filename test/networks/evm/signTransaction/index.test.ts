import { describe, expect, test } from '@jest/globals';
import { getPublicAddress } from '../../../../lib/commonjs/networks/evm/address';
import { getPrivateKey } from '../../../../lib/commonjs/networks/utils/secp256k1';
import { signLegacyTransaction } from '../../../../lib/commonjs/networks/evm/signTransaction/index';
import { TransactionLegacyEVM } from '../../../../lib/commonjs/networks/evm/general/types';
import { signEIP1559Transaction } from '../../../../lib/commonjs/networks/evm/signTransaction/index';
import {
    getPrivateMasterKey,
    getRootNode,
} from '../../../../lib/commonjs/networks/utils/secp256k1';
import { CoinIds, Protocol } from '../../../../lib/commonjs/networks/registry';

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
        const rootNode = getRootNode({ mnemonic, network });
        const privateAccountNode = getPrivateMasterKey({
            bipIdCoin: CoinIds.ETH,
            protocol: Protocol.LEGACY,
            rootNode,
        });
        const publicAddress = getPublicAddress({
            change: 0,
            index: 0,
            publicAccountNode: privateAccountNode,
        });
        const privateKey = getPrivateKey({ privateAccountNode })
            ?.privateKey as Buffer;
        const transaction = {
            value: '0x100000000',
            from: publicAddress,
            nonce: '0xB4',
            gasLimit: '0x5208',
            maxFeePerGas: '0x244DDCE8E',
            maxPriorityFeePerGas: '0xA6792E',
            to: '0x1402066a3392FF3EA724Ae6ee64194c5D93090DF',
        } as TransactionLegacyEVM;
        const rawTransaction = await signEIP1559Transaction({
            transaction,
            privateKey,
        });
        expect(rawTransaction).toBe(
            '0x02f8708081b483a6792e850244ddce8e825208941402066a3392ff3ea724ae6ee64194c5d93090df85010000000080c001a045f2799d2fc372225cb6cc820391c9e5e5930b42eb4fbafd676ed0385364b4e0a0112f967c43260ef8eb99eac9c9ba77cff8d30cd10d47536271e700bdf5e9e19f',
        );
    });
    test('signTransaction(BSC)', async () => {
        const rootNode = getRootNode({ mnemonic, network });
        const privateAccountNode = getPrivateMasterKey({
            bipIdCoin: CoinIds.ETH,
            protocol: Protocol.LEGACY,
            rootNode,
        });
        const publicAddress = getPublicAddress({
            change: 0,
            index: 0,
            publicAccountNode: privateAccountNode,
        });
        const privateKey = getPrivateKey({ privateAccountNode })
            ?.privateKey as Buffer;
        const transaction = {
            value: '0x100000000',
            from: publicAddress,
            nonce: '0xB4',
            gasLimit: '0x5208',
            gasPrice: '0x244DDCE8E',
            to: '0x1402066a3392FF3EA724Ae6ee64194c5D93090DF',
        } as TransactionLegacyEVM;
        const rawTransaction = await signLegacyTransaction({
            transaction,
            privateKey,
        });
        expect(rawTransaction).toBe(
            '0xf86a81b4850244ddce8e825208941402066a3392ff3ea724ae6ee64194c5d93090df8501000000008023a01183852d7eb0ab5d4805beaed75f49cc56ae3c69fb87f07f23fb04e0bdd78740a05333e3cb944c1e2c5a5b5dbc93d3baf8e510b1c1c94bdfbff6fe5f0e59cb6ca8',
        );
    });
});
