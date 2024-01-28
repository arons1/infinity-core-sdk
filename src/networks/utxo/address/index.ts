import { fromSeed } from '../../../core/bip32';
import { mnemonicToSeedSync } from '../../../core/bip39';
import { Network, payments } from 'bitcoinjs-lib';
import bs58check from 'bs58check';
import { BIP32Interface } from '../../../core/bip32';

import {
    MasterNodeParams,
    MasterKeyParams,
    AddressParams,
    PublicAddressParams,
    PublicKeyParams,
} from './types';

export const getMasterNode = ({
    mnemonic,
    network,
}: MasterNodeParams): BIP32Interface => {
    const seed = mnemonicToSeedSync(mnemonic);
    return fromSeed(seed, network);
};
const addressEncoding: Record<string, string> = {
    ypub: '049d7cb2',
    zpub: '04b24746',
    ypriv: '049d7878',
    zpriv: '04b24746',
};
const encodeGeneric = (dataAddress: string, type: string) => {
    var data = bs58check.decode(dataAddress);
    data = data.slice(4);
    const encodeCode = addressEncoding[type];
    data = Buffer.concat([Buffer.from(encodeCode, 'hex'), data]);
    return bs58check.encode(data);
};
export const xpubToYpub = (data: string) => {
    return encodeGeneric(data, 'ypub');
};
export const xprvToYprv = (data: string): string => {
    return encodeGeneric(data, 'ypriv');
};
export const xprvToZprv = (data: string): string => {
    return encodeGeneric(data, 'zpriv');
};
export const xpubToZpub = (data: string): string => {
    return encodeGeneric(data, 'zpub');
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
}: AddressParams): BIP32Interface => {
    return privateMasterNode.derive(change).derive(index);
};
export const getPrivateAddress = ({
    privateMasterNode,
    change = 0,
    index = 0,
    network,
}: AddressParams): string => {
    const privateKey = getPrivateKey({
        privateMasterNode,
        index,
        change,
        network,
    });
    return privateKey.toWIF();
};

export const getPublicKey = ({
    publicMasterNode,
    change = 0,
    index = 0,
}: PublicKeyParams): Buffer => {
    return publicMasterNode.derive(change).derive(index).publicKey;
};
export const getPublicAddressSegwit = ({
    publicMasterNode,
    change = 0,
    index = 0,
    network,
}: PublicAddressParams): string | undefined => {
    const pubkey = getPublicKey({ publicMasterNode, change, index });
    return payments.p2wpkh({ pubkey, network: network as Network }).address;
};

export const getPublicAddressP2WPKHP2S = ({
    publicMasterNode,
    change = 0,
    index = 0,
    network,
}: PublicAddressParams): string | undefined => {
    const pubkey = getPublicKey({ publicMasterNode, change, index });
    const redeem = payments.p2wpkh({ pubkey, network: network as Network });
    return payments.p2sh({
        redeem,
        network: network as Network,
    }).address;
};
export const getPublicAddressP2PKH = ({
    publicMasterNode,
    change = 0,
    index = 0,
    network,
}: PublicAddressParams): string | undefined => {
    const pubkey = getPublicKey({ publicMasterNode, change, index });
    return payments.p2pkh({ pubkey, network: network as Network }).address;
};
