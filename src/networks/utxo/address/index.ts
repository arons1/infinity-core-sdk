import { fromSeed } from '../../../core/bip32';
import { mnemonicToSeedSync } from '../../../core/bip39';
import { Network, payments } from 'bitcoinjs-lib';
import bs58check from 'bs58check';
import { BIP32Interface } from '../../../core/bip32';

import {
    RootNodeParams,
    MasterKeyParams,
    AddressParams,
    PublicAddressParams,
    PublicKeyParams,
} from './types';
/* 
getRootNode
    Returns root node
    @param mnemonic: X words phrase
    @param network: Network for this node
*/
export const getRootNode = ({
    mnemonic,
    network,
}: RootNodeParams): BIP32Interface => {
    const seed = mnemonicToSeedSync(mnemonic);
    return fromSeed(seed, network);
};
const addressEncoding: Record<string, string> = {
    ypub: '049d7cb2',
    zpub: '04b24746',
    ypriv: '049d7878',
    zpriv: '04b2430c',
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
/* 
getPublicMasterKey
    Returns Account Extended Public Key
    @param rootNode: Root node
    @param bipIdCoin: Coin BIP32 ID
    @param protocol: Protocol that it's going to use be use in the derivation
*/
export const getPublicMasterKey = ({
    rootNode,
    bipIdCoin,
    protocol = 44,
}: MasterKeyParams): BIP32Interface => {
    return getPrivateMasterKey({
        rootNode,
        bipIdCoin,
        protocol,
    }).neutered();
};
/* 
getPrivateMasterKey
    Returns Account Extended Private Node
    @param rootNode: Root node
    @param bipIdCoin: Coin BIP32 ID
    @param protocol: Protocol that it's going to use be use in the derivation
*/
export const getPrivateMasterKey = ({
    rootNode,
    bipIdCoin,
    protocol = 44,
}: MasterKeyParams): BIP32Interface => {
    return rootNode
        .deriveHardened(protocol)
        .deriveHardened(bipIdCoin)
        .deriveHardened(0);
};
/* 
getPrivateKey
    Returns Private key
    @param privateAccountNode: Account Extended Private Node
    @param change: account change derivation
    @param index: account index derivation
*/
export const getPrivateKey = ({
    privateAccountNode,
    change = 0,
    index = 0,
}: AddressParams): BIP32Interface => {
    return privateAccountNode.derive(change).derive(index);
};
/* 
getPrivateAddress
    Returns Private address
    @param privateAccountNode: Account Extended Private Node
    @param change: account change derivation
    @param index: account index derivation
    @param network: network for derivation
*/
export const getPrivateAddress = ({
    privateAccountNode,
    change = 0,
    index = 0,
    network,
}: AddressParams): string => {
    const privateKey = getPrivateKey({
        privateAccountNode,
        index,
        change,
        network,
    });
    return privateKey.toWIF();
};
/* 
getPublicKey
    Returns Public address
    @param publicAccountNode: Account Extended Public Node
    @param change: account change derivation
    @param index: account index derivation
*/
export const getPublicKey = ({
    publicAccountNode,
    change = 0,
    index = 0,
}: PublicKeyParams): Buffer => {
    return publicAccountNode.derive(change).derive(index).publicKey;
};
/* 
getPublicAddressSegwit
    Returns Public Segwit address
    @param publicAccountNode: Account Extended Public Address
    @param change: account change derivation
    @param index: account index derivation
    @param network: network for derivation
*/
export const getPublicAddressSegwit = ({
    publicAccountNode,
    change = 0,
    index = 0,
    network,
}: PublicAddressParams): string | undefined => {
    const pubkey = getPublicKey({ publicAccountNode, change, index });
    return payments.p2wpkh({ pubkey, network: network as Network }).address;
};
/* 
getPublicAddressP2WPKHP2S
    Returns Public P2WPKHP2S address
    @param publicAccountNode: Account Extended Public Address
    @param change: account change derivation
    @param index: account index derivation
    @param network: network for derivation
*/
export const getPublicAddressP2WPKHP2S = ({
    publicAccountNode,
    change = 0,
    index = 0,
    network,
}: PublicAddressParams): string | undefined => {
    const pubkey = getPublicKey({ publicAccountNode, change, index });
    const redeem = payments.p2wpkh({ pubkey, network: network as Network });
    return payments.p2sh({
        redeem,
        network: network as Network,
    }).address;
};
/* 
getPublicAddressP2PKH
    Returns Public P2PKH address
    @param publicAccountNode: Account Extended Public Address
    @param change: account change derivation
    @param index: account index derivation
    @param network: network for derivation
*/
export const getPublicAddressP2PKH = ({
    publicAccountNode,
    change = 0,
    index = 0,
    network,
}: PublicAddressParams): string | undefined => {
    const pubkey = getPublicKey({ publicAccountNode, change, index });
    return payments.p2pkh({ pubkey, network: network as Network }).address;
};
