import { SignTransactionEIP1159Params, SignTransactionParams } from './types';
import { Transaction, FeeMarketEIP1559Transaction } from '../sdk';

/**
 * Signs a legacy Ethereum transaction using the provided transaction and private key.
 *
 * @param {SignTransactionParams} params - The parameters for signing the transaction.
 * @param {Transaction} params.transaction - The transaction to be signed.
 * @param {Buffer} params.privateKey - The private key used for signing the transaction.
 * @return {Promise<string>} - A promise that resolves to the signed transaction in hex format.
 */
export const signLegacyTransaction = async ({
    transaction,
    privateKey,
}: SignTransactionParams): Promise<string> => {
    const tr = new Transaction(transaction);
    const signedTransaction = tr.sign(privateKey);
    return '0x' + signedTransaction.serialize().toString('hex');
};
/**
 * Signs an EIP-1559 Ethereum transaction using the provided transaction and private key.
 *
 * @param {SignTransactionEIP1159Params} params - The parameters for signing the EIP-1559 transaction.
 * @return {Promise<string>} A promise that resolves to the signed transaction in hex format.
 */
export const signEIP1559Transaction = async ({
    transaction,
    privateKey,
}: SignTransactionEIP1159Params): Promise<string> => {
    const tr = new FeeMarketEIP1559Transaction(transaction);
    const signedTransaction = tr.sign(privateKey);
    return '0x' + signedTransaction.serialize().toString('hex');
};
export * from './types';
