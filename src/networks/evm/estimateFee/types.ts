export type EstimateGasParams = {
    web3: any;
    source: string;
    tokenContract?: string;
    destination?: string;
    amount?:string;
    chainId:number;
    feeRatio:number;
    priorityFee:string
}
export type EstimateGasTokenParams = {
    web3: any;
    source: string;
    tokenContract: string;
    destination: string;
    amount?:string;
    chainId:number;
    feeRatio:number;
    priorityFee:string
}
export type EstimateGasBridgeParams = {
    web3: any;
    source: string;
    destination?: string;
    amount?:string;
    feeRatio:number;
    priorityFee:string
}

export type NonceParams = {
    address:string;
    web3:any
}

export type GasPriceParams = {
    web3:any;
}
export type GasLimitParams = {
    web3:any;
    source:string;
    destination:string;
    tokenContract:string;
    amount:string;
    contract:any;
    isToken:boolean;
    isBridge:boolean
}

export type TransactionEVM = {
    from      : string,
    nonce     : string,
    to      : string,
    data      : string,
    value     : string,
    maxFeePerGas?:string,
    gasPrice?:string,
    maxPriorityFeePerGas:string
}

export type CalculateGasPrice = {
    transaction: TransactionEVM,
    gasPrice:string,
    web3:any,
    chainId:number,
    feeRatio:number,
    priorityFee:string
}