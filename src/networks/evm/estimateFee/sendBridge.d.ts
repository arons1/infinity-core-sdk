import BigNumber from 'bignumber.js';
export declare const getFeeBSCtoBC: (web3: any) => Promise<BigNumber>;
export declare const getDataBSC: ({ toAddress, amount, web3, }: {
    toAddress: string;
    amount: string;
    web3: any;
}) => any;
export declare const getGasLimitBSC: ({ fromAddress, toAddress, amount, web3, }: {
    fromAddress: string;
    toAddress: string;
    amount: string;
    web3: any;
}) => Promise<any>;
export declare const transferFromBscToBbc: ({ privateKey, toAddress, amount, web3, }: {
    privateKey: string;
    toAddress: string;
    amount: string;
    web3: any;
}) => Promise<{
    relayFeeWei: BigNumber;
    signedTransaction: string;
    gasPrice: any;
    estimateGas: any;
}>;
