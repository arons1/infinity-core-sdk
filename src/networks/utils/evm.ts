import { bech32 } from '../../core/base';
import { isValidAddress as EVMValidAddress } from '../evm/sdk/ethereumjs-util/account';
import { isValidAddress as isValidAddressFIO } from '../utils/fio';

export const isValidAddress = (address: string) => {
    if (typeof address != 'string') return false;
    if (address.startsWith('xdc') && isHexString(address.slice(3)))
        return EVMValidAddress(address.replace('xdc', '0x'));
    else if (address.startsWith('ex'))
        return isValidBench32Address(address, 'ex');
    else if (address.startsWith('bnb'))
        return isValidBench32Address(address, 'bnb');
    else if (address.startsWith('0x')) return EVMValidAddress(address);
    return isValidAddressFIO(address);
};
const decodeAddress = (value: string): Buffer => {
    const decodeAddress = bech32.decode(value);
    return Buffer.from(bech32.fromWords(decodeAddress.words));
};

const isValidBench32Address = (address: string, hrp: string) => {
    try {
        if (!address.startsWith(hrp)) {
            return false;
        }
        const decodedAddress = bech32.decode(address);
        const decodedAddressLength = decodeAddress(address).length;
        if (decodedAddressLength === 20 && decodedAddress.prefix === hrp) {
            return true;
        }

        return false;
    } catch (err) {
        return false;
    }
};
