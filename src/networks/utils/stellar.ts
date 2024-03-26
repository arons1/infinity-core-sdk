import { StrKey } from '../../core/ed25519/strkey';

export const isValidAddress = (address: string) => {
    return StrKey.isValidEd25519PublicKey(address);
};

export const isValidMemo = (memo: string) => {
    if (typeof memo != 'string') return false;
    if (memo.length >= 28 || memo.length == 0) return false;
    return new RegExp('^[\x00-\x7F]*$').test(memo);
};
