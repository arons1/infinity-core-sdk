export type TransactionEVM = {
    from: string;
    nonce: string;
    to: string;
    data?: string;
    value?: string;
    maxFeePerGas?: string;
    gasPrice?: string;
    maxPriorityFeePerGas?: string;
    gasLimit?: string;
};
export type TransactionEIP1159EVM = {
    from: string;
    nonce: string;
    to: string;
    data?: string;
    value?: string;
    maxFeePerGas?: string;
    maxPriorityFeePerGas?: string;
    gasLimit?: string;
};
export type TransactionLegacyEVM = {
    from: string;
    nonce: string;
    to: string;
    data?: string;
    value?: string;
    gasPrice?: string;
    gasLimit?: string;
};
