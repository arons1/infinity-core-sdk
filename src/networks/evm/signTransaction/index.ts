import { SignTransactionEIP1159Params, SignTransactionParams } from './types';
import { Transaction, FeeMarketEIP1559Transaction } from '../sdk';
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
export const signEIP1559Transaction = async ({
    transaction,
    privateKey,
}: SignTransactionEIP1159Params): Promise<string> => {
    const tr = new FeeMarketEIP1559Transaction(transaction);
    const signedTransaction = tr.sign(privateKey);
    return '0x' + signedTransaction.serialize().toString('hex');
};
export * from './types';
