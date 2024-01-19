export type EstimateGasParams = {
    web3: any;
    source: string;
    tokenContract?: string;
    destination?: string;
    amount?:string;
}
export type EstimateGasTokenParams = {
    web3: any;
    source: string;
    tokenContract: string;
    destination: string;
    amount?:string;
}
export type EstimateGasBridgeParams = {
    web3: any;
    source: string;
    destination?: string;
    amount?:string
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
}

export type TransactionEVM = {
    from      : string,
    nonce     : string,
    to      : string,
    data      : string,
    value     : string,
    maxFeePerGas?:string,
    gasPrice?:string
}