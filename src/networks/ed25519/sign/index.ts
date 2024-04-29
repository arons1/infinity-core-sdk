import nacl from 'tweetnacl';
import { SignMessageParams } from './types';

/**
 * Signs a message using the provided secret key.
 *
 * @param {SignMessageParams} message - The message to sign.
 * @param {Buffer} secretKey - The secret key used for signing.
 * @return {Uint8Array} - The signed message.
 */
export const sign = ({ message, secretKey }: SignMessageParams) => {
    return nacl.sign.detached(message, secretKey);
};
