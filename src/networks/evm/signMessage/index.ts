import { RSV, SignMessageParams, VerifyMessageParams } from './types';
import { InvalidAddress } from '../../../errors/networks';
import {
    ecdsaSign,
    hashPersonalMessage,
    isValidAddress,
    makeSignature,
    publicToAddress,
    recoverFromSignature,
} from '../sdk';
/* 
signMessage
    Returns message signed
    @param message: message to sign
    @param privateKey: private key
    @param chainId: Id of the chain
*/
export const signMessage = ({
    message,
    privateKey,
    chainId,
}: SignMessageParams): string => {
    const msgHash = hashPersonalMessage(Buffer.from(message, 'utf-8'));
    const { v, r, s } = ecdsaSign(msgHash, privateKey, chainId);
    return makeSignature(v, r, s);
};

const extractRSV = (sig: string): RSV => {
    const r = '0x' + sig.substring(2).substring(0, 64);
    const s = '0x' + sig.substring(2).substring(64, 128);
    const v = '0x' + sig.substring(2).substring(128, 130);
    return {
        r,
        s,
        v,
    };
};
/* 
verifyMessage
    Returns if the address passed matches the one that signed the message
    @param message: original message which was signed
    @param address: public address used to sign
    @param signature: signature to verify
    @param chainId: Id of the chain
*/
export const verifyMessage = async ({
    message,
    address,
    signature,
    chainId,
}: VerifyMessageParams): Promise<boolean> => {
    if (!isValidAddress(address)) throw new Error(InvalidAddress);
    const msgHash = hashPersonalMessage(Buffer.from(message, 'utf-8'));
    const { v, r, s } = extractRSV(signature);
    const publicKey = await recoverFromSignature(
        msgHash,
        parseInt(v, 16),
        Buffer.from(r.substring(2), 'hex'),
        Buffer.from(s.substring(2), 'hex'),
        chainId,
    );
    const publicAddress =
        '0x' + publicToAddress(publicKey, true).toString('hex');
    return publicAddress == address.toLowerCase();
};

export * from './types';
