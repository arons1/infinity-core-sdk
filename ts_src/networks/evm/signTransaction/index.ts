import { SignTransactionParams } from './types';

export const signTransaction = async ({
    web3,
    transaction,
    privateKey,
}: SignTransactionParams) => {
    const signedTransaction = await web3.eth.accounts.signTransaction(
        transaction,
        privateKey,
    );
    return signedTransaction?.rawTransaction;
};
