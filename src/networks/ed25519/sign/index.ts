import nacl from 'tweetnacl';
import { SignMessageParams } from './types';

export const sign = ({ message, secretKey }: SignMessageParams) => {
    return nacl.sign.detached(message, secretKey);
};
