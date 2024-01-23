import { TransactionEVM } from '../general/types';
export type SignTransactionParams = {
    web3: any;
    transaction: TransactionEVM;
    privateKey: string;
};
