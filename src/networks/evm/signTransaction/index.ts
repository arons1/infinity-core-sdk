import { SignTransactionParams } from './types';
import { Transaction } from '../sdk';
/* 
signLegacyTransaction
    Sign Legacy Transaction
    @param transaction: TransactionEVM
    @param privateKey: private key
*/
export const signLegacyTransaction = async ({
    transaction,
    privateKey,
}: SignTransactionParams): Promise<string> => {
    const tr = new Transaction(transaction);
    const signedTransaction = tr.sign(privateKey);
    return '0x' + signedTransaction.serialize().toString('hex');
};
