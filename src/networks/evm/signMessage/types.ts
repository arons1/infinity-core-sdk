export type SignMessageParams = {
    web3: any;
    message: string;
    privateKey: Buffer;
};
export type VerifyMessageParams = {
    web3: any;
    message: string;
    address: string;
    signature: string;
};
