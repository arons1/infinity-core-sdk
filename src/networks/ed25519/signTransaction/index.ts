import { SignTransactionParams } from './types';
import { CoinNotSupported } from '../../../errors/networks';
import { Keypair } from 'stellar-sdk';
import { sign } from 'ripple-keypairs';
import { encode, encodeForSigning } from 'xrpl-binary-codec-prerelease';
import { Coins } from '../../registry';
export const signTransaction = ({
    transaction,
    keyPair,
    coinId,
}: SignTransactionParams) => {
    switch (coinId) {
        case Coins.STELLAR:
            const key_pair = Keypair.fromSecret(keyPair.secret());
            transaction.sign(key_pair);
            return transaction.toEnvelope().toXDR('base64');
        case Coins.XRP:
            const tx = transaction;
            tx.SigningPubKey = keyPair.publicKey.toString('hex').toUpperCase();
            tx.TxnSignature = sign(
                encodeForSigning(transaction),
                '00' + keyPair.privateKey.toString('hex').toUpperCase(),
            );
            const serialized = encode(tx);
            return serialized;
        case Coins.SOLANA:
            transaction.sign([keyPair]);
            return transaction.serialize();
        case Coins.TEZOS:
            transaction.sign(keyPair);
            return transaction;
        default:
            throw new Error(CoinNotSupported);
    }
};
