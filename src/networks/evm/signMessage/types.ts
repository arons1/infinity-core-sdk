export type SignMessageParams = {
    message: string;
    privateKey: Buffer;
    chainId?: number;
};
export type VerifyMessageParams = {
    message: string;
    address: string;
    signature: string;
    chainId?: number;
};
