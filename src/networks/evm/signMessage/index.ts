import { SignMessageParams, VerifyMessageParams } from './types';

/* 
signMessage
    Returns message signed
    @param web3: web3 connector
    @param message: message to sign
    @param privateKey: private key
*/
export const signMessage = async ({
    web3,
    message,
    privateKey,
}: SignMessageParams): Promise<any> => {
    return await web3.eth.accounts.sign(message, privateKey);
};
/* 
verifyMessage
    Returns verify message
    @param web3: web3 connector
    @param message: message to sign
    @param address: address used to sign
    @param signature: signature
*/
export const verifyMessage = async ({
    web3,
    message,
    address,
    signature,
}: VerifyMessageParams): Promise<boolean> => {
    const publicAddress = await web3.eth.accounts.recover(message, signature);
    return publicAddress?.toLowerCase() == address.toLowerCase();
};
