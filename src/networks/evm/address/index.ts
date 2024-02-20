
import { HarmonyAddress } from '@harmony-js/crypto';
import { bech32 } from '@scure/base';


import {
    DerivePathError, GenPrivateKeyError
} from '../../../errors/networks';
import {
    publicToAddress,
    toChecksumAddress,
} from '../sdk/ethereumjs-util/account';
import { getPrivateKey, getPublicKey } from '../../getAddress';
import { AddressParams, PublicAddressParams } from '../../types';
import networks from '../../networks';
import { ec } from '../../../core/elliptic';
import { ab2hexstring, sha256ripemd160 } from '../../../core/elliptic/utils';

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
    const privateKey = getPrivateKey({ privateAccountNode, index, change, network:networks["eth"] });
    if (!privateKey?.privateKey) throw new Error(GenPrivateKeyError);
    return '0x' + privateKey.privateKey?.toString('hex');
};

/*
get
*/
export const getBCPublicAddress = (
    {
        publicAccountNode
    }:PublicAddressParams
  ) => {
    const publicKeyHex = getPublicKey({ publicAccountNode })?.toString('hex');
    const pubKey = ec.keyFromPublic(publicKeyHex, "hex")
    const pubPoint = pubKey.getPublic()
    const compressed = pubPoint.encodeCompressed()
    const hexed = ab2hexstring(compressed)
    const hash = sha256ripemd160(hexed)
    const address = encodeAddressToBech32({
        address:hash,
        prefix:"bnb"
    })
    return address
  }