import networks from '../networks';
import { bitcoinjs } from '../../core';
import { Network, bip32 } from 'bitcoinjs-lib';

export const isValidAddress = (address: string, coinId: string) => {
    const network = networks[coinId as string] as Network;
    if (!network) return false;
    try {
        bitcoinjs.address.toOutputScript(address, network);
        return true;
    } catch (e) {
        return false;
    }
};

export const isValidExtendedKey = (address: string, coinId: string) => {
    const network = networks[coinId as string];
    if (!network) return false;
    try {
        bip32.fromBase58(address);
        return true;
    } catch (e) {
        return false;
    }
};
