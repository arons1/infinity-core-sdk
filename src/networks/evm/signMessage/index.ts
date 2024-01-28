import { SignMessageParams, VerifyMessageParams } from './types';

export const signMessage = async ({
    web3,
    message,
    privateKey,
}: SignMessageParams): Promise<string> => {
    return await web3.eth.accounts.sign(message, privateKey);
};

export const verifyMessage = async ({
    web3,
    message,
    address,
    signature,
}: VerifyMessageParams): Promise<boolean> => {
    const publicAddress = await web3.eth.accounts.recover(message, signature);
    return publicAddress?.toLowerCase() == address.toLowerCase();
};
