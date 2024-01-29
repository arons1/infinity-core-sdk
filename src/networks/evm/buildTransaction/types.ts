export type BuildTransaction = {
    source: string;
    destination: string;
    data?: string;
    value?: string;
    web3: any;
    chainId: number;
    feeRatio: number;
    priorityFee: string;
    gasPrice?: string;
};
