import { SendTransactionParams } from './types';

export const sendTransaction = ({
    web3,
    rawTransaction,
}: SendTransactionParams) => {
    web3.eth.sendSignedTransaction(rawTransaction);
};
