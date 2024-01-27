import { fromSeed } from '../../../core/bip32';
import { mnemonicToSeedSync } from '../../../core/bip39';
import { Network, payments } from 'bitcoinjs-lib';
import bs58check from 'bs58check';
import {
    MasterNodeParams,
    MasterKeyParams,
    AddressParams,
    PublicAddressParams,
    PublicKeyParams,
} from './types';

export const getMasterNode = ({ mnemonic, network }: MasterNodeParams) => {
    const seed = mnemonicToSeedSync(mnemonic);
    return fromSeed(seed, network);
};
export const xpubToYpub = (xpub: string) => {
    var data = bs58check.decode(xpub);
    data = data.slice(4);
    data = Buffer.concat([Buffer.from('049d7cb2', 'hex'), data]);
    return bs58check.encode(data);
};
export const xprvToYprv = (xpub: string) => {
    var data = bs58check.decode(xpub);
    data = data.slice(4);
    data = Buffer.concat([Buffer.from('049d7878', 'hex'), data]);
    return bs58check.encode(data);
};
export const xprvToZprv = (xpub: string) => {
    var data = bs58check.decode(xpub);
    data = data.slice(4);
    data = Buffer.concat([Buffer.from('04b2430c', 'hex'), data]);
    return bs58check.encode(data);
};
export const xpubToZpub = (xpub: string) => {
    var data = bs58check.decode(xpub);
    data = data.slice(4);
    data = Buffer.concat([Buffer.from('04b24746', 'hex'), data]);
    return bs58check.encode(data);
};
export const getPublicMasterKey = ({
    masterNode,
    bipIdCoin,
    protocol = 44,
}: MasterKeyParams) => {
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
}: MasterKeyParams) => {
    return masterNode
        .deriveHardened(protocol)
        .deriveHardened(bipIdCoin)
        .deriveHardened(0);
};

export const getPrivateKey = ({
    privateMasterNode,
    change = 0,
    index = 0,
}: AddressParams) => {
    return privateMasterNode.derive(change).derive(index);
};
export const getPrivateAddress = ({
    privateMasterNode,
    change = 0,
    index = 0,
    network,
}: AddressParams) => {
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
}: PublicKeyParams) => {
    return publicMasterNode.derive(change).derive(index).publicKey;
};
export const getPublicAddressSegwit = ({
    publicMasterNode,
    change = 0,
    index = 0,
    network,
}: PublicAddressParams) => {
    const pubkey = getPublicKey({ publicMasterNode, change, index });
    return payments.p2wpkh({ pubkey, network: network as Network }).address;
};

export const getPublicAddressP2WPKHP2S = ({
    publicMasterNode,
    change = 0,
    index = 0,
    network,
}: PublicAddressParams) => {
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
}: PublicAddressParams) => {
    const pubkey = getPublicKey({ publicMasterNode, change, index });
    return payments.p2pkh({ pubkey, network: network as Network }).address;
};
