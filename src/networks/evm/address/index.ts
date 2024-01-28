import { fromSeed } from '../../../core/bip32';
import { mnemonicToSeedSync } from '../../../core/bip39';
import { publicToAddress, toChecksumAddress } from '../sdk/ethereumjs-util';
import { HarmonyAddress } from '@harmony-js/crypto';
import { bech32 } from '@scure/base';
import { BIP32Interface } from '../../../core/bip32';

import {
    MasterNodeParams,
    MasterKeyParams,
    AddressParams,
    PublicAddressParams,
} from './types';

export const getMasterNode = ({
    mnemonic,
    network,
}: MasterNodeParams): BIP32Interface => {
    const seed = mnemonicToSeedSync(mnemonic);
    return fromSeed(seed, network);
};
export const getPublicMasterKey = ({
    masterNode,
    bipIdCoin,
    protocol = 44,
}: MasterKeyParams): BIP32Interface => {
    return getPrivateMasterKey({
        masterNode,
        bipIdCoin,
        protocol,
    }).neutered();
};
export const getPrivateMasterKey = ({
    masterNode,
    bipIdCoin,
    protocol = 44,
}: MasterKeyParams): BIP32Interface => {
    return masterNode
        .deriveHardened(protocol)
        .deriveHardened(bipIdCoin)
        .deriveHardened(0);
};

export const getPrivateKey = ({
    privateMasterNode,
    change = 0,
    index = 0,
}: AddressParams): Buffer | undefined => {
    return privateMasterNode.derive(change).derive(index).privateKey;
};
export const getPrivateAddress = ({
    privateMasterNode,
    change = 0,
    index = 0,
}: AddressParams): string => {
    return (
        '0x' +
        getPrivateKey({ privateMasterNode, index, change })?.toString('hex')
    );
};

export const getPublicKey = ({
    publicMasterNode,
    change = 0,
    index = 0,
}: PublicAddressParams): Buffer | undefined => {
    return publicMasterNode.derive(change).derive(index).publicKey;
};
export const getPublicAddress = ({
    publicMasterNode,
    change = 0,
    index = 0,
}: PublicAddressParams): string | undefined => {
    const pubKey = getPublicKey({ publicMasterNode, change, index });
    if (pubKey) {
        const address = '0x' + publicToAddress(pubKey, true).toString('hex');
        return toChecksumAddress(address);
    }
};

export const getHarmonyPublicAddress = ({
    publicMasterNode,
    change = 0,
    index = 0,
}: PublicAddressParams): string | undefined => {
    const pubKey = getPublicAddress({ publicMasterNode, change, index });
    if (pubKey) return new HarmonyAddress(pubKey).bech32;
};

const encodeAddressToBech32 = ({
    address,
    prefix = 'ex',
}: {
    address: string;
    prefix: string;
}): string => {
    const hexAddr = address.slice(0, 2) === '0x' ? address.slice(2) : address;
    const words = bech32.toWords(Buffer.from(hexAddr, 'hex'));
    return bech32.encode(prefix, words);
};
export const getOKXPublicAddress = ({
    publicMasterNode,
    change = 0,
    index = 0,
}: PublicAddressParams): string | undefined => {
    const pubKey = getPublicKey({ publicMasterNode, change, index });
    if (pubKey) {
        const address = '0x' + publicToAddress(pubKey, true).toString('hex');
        return encodeAddressToBech32({
            address: toChecksumAddress(address),
            prefix: 'ex',
        });
    }
};


export const getXDCPublicAddress = ({
    publicMasterNode,
    change = 0,
    index = 0,
}: PublicAddressParams): string | undefined => {
    const pubKey = getPublicAddress({ publicMasterNode, change, index });
    if (pubKey) {
        return 'xdc' + pubKey.slice(2);
    }
};
