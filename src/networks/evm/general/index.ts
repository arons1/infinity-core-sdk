export * from './types';

export enum Chains {
    ETH = 1,
    ETH_TESTNET = 3,
    BSC = 56,
    BSC_TESTNET = 97,
    MATIC = 137,
    ONE = 1666600000,
    XDC = 50,
    KCC = 321,
    OKX = 66,
    AVAX = 43114,
    CRS = 25,
    ARB = 42161,
    OP = 10,
    VET = 100009,
}

export const PRIORITY_FEES = {
    [Chains.ETH]: '1000000000',
    [Chains.MATIC]: '21000000000',
};

export const SupportedChains = Object.values(Chains);
