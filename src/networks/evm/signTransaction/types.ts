import { TransactionEVM } from '../general/types';

export type SignTransactionParams = {
    transaction: TransactionEVM;
    privateKey: Buffer;
};
