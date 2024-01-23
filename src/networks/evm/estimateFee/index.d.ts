import { EstimateGasParams, GasLimitParams, NonceParams, GasPriceParams } from './types';
import { TransactionEVM } from '../general/types';
export declare const getGasPrice: ({ web3 }: GasPriceParams) => Promise<any>;
export declare const getGasLimit: ({ destination, tokenContract, amount, source, contract, web3, isToken, isBridge, }: GasLimitParams) => Promise<{
    data: string;
    estimateGas: string;
}>;
export declare const getNonce: ({ address, web3 }: NonceParams) => Promise<any>;
export declare const estimateFeeTransfer: ({ web3, source, tokenContract, destination, amount, chainId, feeRatio, priorityFee, }: EstimateGasParams) => Promise<{
    estimateGas: string;
    gasPrice: any;
    transaction: TransactionEVM;
}>;
