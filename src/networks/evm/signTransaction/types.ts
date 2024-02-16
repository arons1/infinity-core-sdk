import { TransactionEIP1159EVM, TransactionLegacyEVM } from '../general/types';

export type SignTransactionParams = {
    transaction: TransactionLegacyEVM;
    privateKey: Buffer;
};
export type SignTransactionEIP1159Params = {
    transaction: TransactionEIP1159EVM;
    privateKey: Buffer;
};
