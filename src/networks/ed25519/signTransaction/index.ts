import lib from 'xrpl-accountlib';
import { SignTransactionParams } from './types';

export const signTransaction = ({
    transaction,
    keyPair,
    coinId,
}: SignTransactionParams) => {
    switch (coinId) {
        case 'stellar':
            transaction.sign(keyPair);
            return transaction.toEnvelope().toXDR().toString('base64');
        case 'xrp':
            return lib.sign(transaction, keyPair)?.signedTransaction;
        case 'solana':
            transaction.sign([keyPair]);
            return transaction.serialize();
        case 'tezos':
            throw new Error('Use Taquito SDK to handle transaction send');
        default:
            throw new Error('Coin not implemented');
    }
};
