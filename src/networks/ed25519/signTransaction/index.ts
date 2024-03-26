import { SignTransactionParams } from './types';
import { CoinNotSupported } from '../../../errors/networks';
import { Keypair } from 'stellar-sdk';
import { sign } from 'ripple-keypairs';
import { encode, encodeForSigning } from 'xrpl-binary-codec-prerelease';
export const signTransaction = ({
    transaction,
    keyPair,
    coinId,
}: SignTransactionParams) => {
    switch (coinId) {
        case 'stellar':
            const key_pair = Keypair.fromSecret(keyPair.secret());
            transaction.sign(key_pair);
            return transaction.toEnvelope().toXDR('base64');
        case 'xrp':
            const tx = transaction;
            tx.SigningPubKey = keyPair.publicKey.toString('hex').toUpperCase();
            tx.TxnSignature = sign(
                encodeForSigning(transaction),
                '00' + keyPair.privateKey.toString('hex').toUpperCase(),
            );
            const serialized = encode(tx);
            return serialized;
        case 'solana':
            transaction.sign([keyPair]);
            return transaction.serialize();
        case 'tezos':
            transaction.sign(keyPair);
            return transaction;
        default:
            throw new Error(CoinNotSupported);
    }
};
