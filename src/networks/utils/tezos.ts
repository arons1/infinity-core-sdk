import bs58check from 'bs58check';
export enum Prefix {
    TZ1 = 'tz1',
    TZ2 = 'tz2',
    TZ3 = 'tz3',
    TZ4 = 'tz4',
    EDSK = 'edsk',
    EDPK = 'edpk',
    KT1 = 'KT1',
}
const implicitPrefix = [Prefix.TZ1, Prefix.TZ2, Prefix.TZ3, Prefix.TZ4];
const contractPrefix = [Prefix.KT1];
export const isValidPublicKey = (address: string) => {
    return isValidAddressValue(address, [Prefix.EDPK]);
};
export const isValidAddress = (address: string) => {
    return isValidAddressValue(address, [...implicitPrefix, ...contractPrefix]);
};

export const prefix = {
    [Prefix.TZ1]: new Uint8Array([6, 161, 159]),
    [Prefix.TZ2]: new Uint8Array([6, 161, 161]),
    [Prefix.TZ3]: new Uint8Array([6, 161, 164]),
    [Prefix.TZ4]: new Uint8Array([6, 161, 166]),
    [Prefix.EDSK]: new Uint8Array([43, 246, 78, 7]),
    [Prefix.EDPK]: new Uint8Array([13, 15, 37, 217]),
    [Prefix.KT1]: new Uint8Array([2, 90, 121]),
};
const prefixLength: { [key: string]: number } = {
    [Prefix.TZ1]: 20,
    [Prefix.TZ2]: 20,
    [Prefix.TZ3]: 20,
    [Prefix.TZ4]: 20,
    [Prefix.KT1]: 20,
    [Prefix.EDPK]: 32,
    [Prefix.EDSK]: 32,
};
const isValidAddressValue = (address: string, prefixes: Prefix[]) => {
    if (typeof address != 'string') return false;
    const match = new RegExp(`^(${prefixes.join('|')})`).exec(address);
    if (!match || match.length === 0) {
        return false;
    }

    const prefixKey = match[0] as Prefix;
    const kt1Regex = /^(KT1\w{33})$/;
    if (!kt1Regex.test(address) && prefixKey === 'KT1') {
        return false;
    }
    let decoded = bs58check.decodeUnsafe(address);
    if (!decoded) {
        return false;
    }
    decoded = decoded.slice(prefix[prefixKey].length);
    if (decoded.length !== prefixLength[prefixKey]) {
        return false;
    }

    return true;
};
