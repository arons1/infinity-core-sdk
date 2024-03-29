const isValidPublicKey = (pubkey: string) => {
    if (typeof pubkey != 'string') return false;
    return (
        pubkey.length >= 1 &&
        pubkey.length <= 62 &&
        new RegExp('^FIO\\w+$').test(pubkey)
    );
};
const isValidPublicAddress = (address: string) => {
    if (typeof address != 'string') return false;
    return (
        address.length >= 1 &&
        address.length <= 128 &&
        new RegExp('^\\w+$').test(address)
    );
};
const isValidFioAddress = (address: string) : boolean => {
    if (typeof address != 'string') return false;
    return (
        address.length >= 3 &&
        address.length <= 64 &&
        new RegExp(
            '^(?:(?=.{3,64}$)[a-zA-Z0-9]{1}(?:(?:(?!-{2,}))[a-zA-Z0-9-]*[a-zA-Z0-9]+){0,1}@[a-zA-Z0-9]{1}(?:(?:(?!-{2,}))[a-zA-Z0-9-]*[a-zA-Z0-9]+){0,1}$)',
            'gim',
        ).test(address)
    );
};
export const isValidAddress = (address: string) : boolean => {
    if (typeof address != 'string') return false;
    if (address.startsWith('FIO')) return isValidPublicKey(address);
    if (address.includes('@')) return isValidFioAddress(address);
    return isValidPublicAddress(address);
};
