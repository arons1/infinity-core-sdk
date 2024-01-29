import { SignTransactionParams } from './types';
/* 
signTransaction
    Returns verify message
    @param web3: web3 connector
    @param transaction: TransactionEVM
    @param privateAddress: private key address
*/
export const signTransaction = async ({
    web3,
    transaction,
    privateAddress,
}: SignTransactionParams): Promise<string> => {
    const signedTransaction = await web3.eth.accounts.signTransaction(
        transaction,
        privateAddress,
    );
    return signedTransaction?.rawTransaction;
};
