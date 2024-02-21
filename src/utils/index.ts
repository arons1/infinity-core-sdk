import BigNumber from 'bignumber.js';
import { DerivePathError } from '../errors/networks';

export const isValidNumber = (number: any) => {
    return !new BigNumber(number).isNaN();
};
export const extractPath = (path: string) => {
    if (!path.startsWith('m/')) throw new Error(DerivePathError);
    const parts = path.split('/');
    if (parts.length != 6 && parts.length != 4)
        throw new Error(DerivePathError);
    return parts.slice(1).map(a => {
        return {
            number: parseInt(a.split("'")[0]),
            hardened: a.includes("'"),
        };
    });
};
