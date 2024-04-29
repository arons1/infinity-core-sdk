import { SignTransactionParams } from './types';
import { CoinNotSupported } from '../../../errors/networks';
import { Keypair } from 'stellar-sdk';
import { sign } from 'ripple-keypairs';
import { encode, encodeForSigning } from 'xrpl-binary-codec-prerelease';
import { Coins } from '../../registry';
/**
 * Signs a transaction based on the provided parameters.
 *
 * @param {SignTransactionParams} params - The parameters for signing the transaction.
 * @param {any} params.transaction - The transaction to be signed.
 * @param {KeyPair} params.keyPair - The key pair used for signing the transaction.
 * @param {Coins} params.coinId - The ID of the coin for which the transaction is being signed.
 * @return {string | Uint8Array} - The signed transaction in the appropriate format based on the coin ID.
 * @throws {Error} - If the coin ID is not supported.
 */

export const signTransaction = ({
    transaction,
    keyPair,
    coinId,
}: SignTransactionParams) => {
    switch (coinId) {
        case Coins.STELLAR:
            transaction.sign(Keypair.fromSecret(keyPair.secret()));
            return transaction.toEnvelope().toXDR('base64');
        case Coins.XRP:
            transaction.SigningPubKey = keyPair.publicKey.toString('hex').toUpperCase();
            transaction.TxnSignature = sign(
                encodeForSigning(transaction),
                '00' + keyPair.privateKey.toString('hex').toUpperCase(),
            );
            return encode(transaction);
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
