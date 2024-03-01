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

export type RSV = {
    r: string;
    s: string;
    v: string;
}