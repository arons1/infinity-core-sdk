import nacl from 'tweetnacl';
import { SignMessageParams } from './types';

export const sign = ({ message, privateKey }: SignMessageParams) => {
    return nacl.sign.detached(message, privateKey);
};
