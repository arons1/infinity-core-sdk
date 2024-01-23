export type TransactionEVM = {
    from: string;
    nonce: string;
    to: string;
    data?: string;
    value?: string;
    maxFeePerGas?: string;
    gasPrice?: string;
    maxPriorityFeePerGas?: string;
};
