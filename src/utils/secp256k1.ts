
import bs58check from 'bs58check';
import { BIP32Interface, fromSeed } from '../core/bip32';
import { AddressParams, MasterKeyParams, PublicAddressParams, RootNodeParams } from '../networks/types';
import { mnemonicToSeedSync, validateMnemonic } from '../core/bip39';
import { InvalidMnemonic } from '../errors/networks';


const addressEncoding: Record<string, string> = {
    ypub: '049d7cb2',
    zpub: '04b24746',
    ypriv: '049d7878',
    zpriv: '04b2430c',
};
export const encodeGeneric = (dataAddress: string, type: string) => {
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
getRootNode
    Returns root node
    @param mnemonic: X words phrase
    @param network: Network for this node
*/
export const getRootNode = ({
    mnemonic,
    network,
}: RootNodeParams): BIP32Interface => {
    if (!validateMnemonic(mnemonic)) throw new Error(InvalidMnemonic);
    const seed = mnemonicToSeedSync(mnemonic);
    return fromSeed(seed, network);
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
}: PublicAddressParams): Buffer | undefined => {
    return publicAccountNode.derive(change).derive(index).publicKey;
};