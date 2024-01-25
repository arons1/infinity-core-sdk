import { SignMessageParams, VerifyMessageParams } from './types';
export declare const signMessage: ({ web3, message, privateKey, }: SignMessageParams) => Promise<any>;
export declare const verifyMessage: ({ web3, message, address, signature, }: VerifyMessageParams) => Promise<boolean>;
