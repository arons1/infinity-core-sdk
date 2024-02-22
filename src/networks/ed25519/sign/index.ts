import nacl from 'tweetnacl';
import { getPrivateKey } from '../address';
import { SignMessageParams } from './types';

export const sign = ({ message, keyPair }: SignMessageParams) => {
    return nacl.sign.detached(message, getPrivateKey({ keyPair }));
};
