import { ed25519 } from '@noble/curves/ed25519';
import { SignTransactionParams } from './types';

export const signTransaction = ({
    transactionSerialized,
    privateKey,
}: SignTransactionParams) => {
    return ed25519.sign(transactionSerialized, privateKey.slice(0, 32));
};
