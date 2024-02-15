import { fromSeed } from '../../../core/bip32';
import { mnemonicToSeedSync, validateMnemonic } from '../../../core/bip39';
import { HarmonyAddress } from '@harmony-js/crypto';
import { bech32 } from '@scure/base';
import { BIP32Interface } from '../../../core/bip32';

import {
    RootNodeParams,
    MasterKeyParams,
    AddressParams,
    PublicAddressParams,
} from './types';
import {
    DerivePathError,
    GenPrivateKeyError,
    InvalidMnemonic,
} from '../../../errors/networks';
import {
    publicToAddress,
    toChecksumAddress,
} from '../sdk/ethereumjs-util/account';

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
    console.log(mnemonic);
    console.log(validateMnemonic(mnemonic));
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
}: AddressParams): Buffer | undefined => {
    return privateAccountNode.derive(change).derive(index).privateKey;
};
/* 
getPrivateAddress
    Returns Private address
    @param privateAccountNode: Account Extended Private Node
    @param change: account change derivation
    @param index: account index derivation
*/
export const getPrivateAddress = ({
    privateAccountNode,
    change = 0,
    index = 0,
}: AddressParams): string => {
    const privateKey = getPrivateKey({ privateAccountNode, index, change });
    if (!privateKey) throw new Error(GenPrivateKeyError);
    return '0x' + privateKey?.toString('hex');
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
/* 
getPublicAddress
    Returns Public address
    @param publicAccountNode: Account Extended Public Address
    @param change: account change derivation
    @param index: account index derivation
*/
export const getPublicAddress = ({
    publicAccountNode,
    change = 0,
    index = 0,
}: PublicAddressParams): string | undefined => {
    const pubKey = getPublicKey({ publicAccountNode, change, index });
    if (pubKey) {
        const address = '0x' + publicToAddress(pubKey, true).toString('hex');
        return toChecksumAddress(address);
    } else {
        throw new Error(DerivePathError);
    }
};
/* 
getHarmonyPublicAddress
    Returns Public Harmony address
    @param publicAccountNode: Account Extended Public Address
    @param change: account change derivation
    @param index: account index derivation
*/
export const getHarmonyPublicAddress = ({
    publicAccountNode,
    change = 0,
    index = 0,
}: PublicAddressParams): string | undefined => {
    const pubKey = getPublicAddress({ publicAccountNode, change, index });
    if (pubKey) return new HarmonyAddress(pubKey).bech32;
    else throw new Error(DerivePathError);
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
/* 
getOKXPublicAddress
    Returns Public OKX address
    @param publicAccountNode: Account Extended Public Address
    @param change: account change derivation
    @param index: account index derivation
*/
export const getOKXPublicAddress = ({
    publicAccountNode,
    change = 0,
    index = 0,
}: PublicAddressParams): string | undefined => {
    const pubKey = getPublicKey({ publicAccountNode, change, index });
    if (pubKey) {
        const address = '0x' + publicToAddress(pubKey, true).toString('hex');
        return encodeAddressToBech32({
            address: toChecksumAddress(address),
            prefix: 'ex',
        });
    } else throw new Error(DerivePathError);
};
/* 
getXDCPublicAddress
    Returns Public XDC address
    @param publicAccountNode: Account Extended Public Address
    @param change: account change derivation
    @param index: account index derivation
*/
export const getXDCPublicAddress = ({
    publicAccountNode,
    change = 0,
    index = 0,
}: PublicAddressParams): string | undefined => {
    const pubKey = getPublicAddress({ publicAccountNode, change, index });
    if (pubKey) {
        return 'xdc' + pubKey.slice(2);
    } else throw new Error(DerivePathError);
};
