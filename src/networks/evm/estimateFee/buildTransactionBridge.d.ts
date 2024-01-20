export declare const buildSignedBscTx: ({ privateKey, toAddress, amount, data, web3, }: {
    privateKey: string;
    toAddress: string;
    amount: number | string;
    data?: string | undefined;
    web3: any;
}) => Promise<{
    signedTransaction: string;
    gasPrice: any;
    estimateGas: any;
}>;
