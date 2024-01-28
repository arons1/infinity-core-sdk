import { SendTransactionParams } from './types';

export const sendTransaction = ({
    web3,
    rawTransaction,
}: SendTransactionParams): any => {
    web3.eth.sendSignedTransaction(rawTransaction);
};
