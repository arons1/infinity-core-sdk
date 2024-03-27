import BigNumber from 'bignumber.js';
import { DerivePathError } from '../errors/networks';
import { isValidPath } from '../networks/utils/secp256k1';

export const isValidNumber = (number: any) => {
    return !new BigNumber(number).isNaN();
};
export const extractPath = (path: string) => {
    if (!isValidPath(path)) throw new Error(DerivePathError);
    const parts = path.split('/');
    return parts.slice(1).map(a => {
        return {
            number: parseInt(a.split("'")[0]),
            hardened: a.includes("'"),
        };
    });
};
