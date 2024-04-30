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

/**
 * Signs a message using the provided private key and chain ID.
 *
 * @param {SignMessageParams} options - The options for signing the message.
 * @param {string} options.message - The message to sign.
 * @param {string} options.privateKey - The private key used for signing.
 * @param {number} options.chainId - The chain ID used for signing.
 * @return {string} The signed message as a hexadecimal string.
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

/**
 * Verifies a message using the provided signature and address.
 *
 * @param {VerifyMessageParams} params - The parameters for verifying the message.
 * @param {string} params.message - The message to be verified.
 * @param {string} params.address - The address associated with the signature.
 * @param {string} params.signature - The signature to be verified.
 * @param {number} params.chainId - The chain ID for the signature.
 * @return {Promise<boolean>} A promise that resolves to a boolean indicating whether the signature is valid.
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
    const publicKey = recoverFromSignature(
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
