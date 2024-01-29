import { SendTransactionParams } from './types';
/* 
sendTransaction
    Returns estimate fee transfer
    @param web3: web3 connector
    @param rawTransaction: raw transaction
*/
export const sendTransaction = ({
    web3,
    rawTransaction,
}: SendTransactionParams): any => {
    web3.eth.sendSignedTransaction(rawTransaction);
};
