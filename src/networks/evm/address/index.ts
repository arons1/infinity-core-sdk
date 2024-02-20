import { HarmonyAddress } from '@harmony-js/crypto';
import { bech32 } from '@scure/base';

import {
    DerivationTypeNotSupported,
    DerivePathError,
    GenPrivateKeyError,
} from '../../../errors/networks';
import {
    publicToAddress,
    toChecksumAddress,
} from '../sdk/ethereumjs-util/account';
import {
    AddressParams,
    AddressResult,
    GenerateAddressParams,
    PublicAddressParams,
} from '../../types';
import networks from '../../networks';
import { getPrivateKey, getPublicKey } from '../../utils/secp256k1';
import { ab2hexstring } from '../../../core/elliptic/utils';
import { ec as elliptic } from '../../../core/elliptic';
import { RIPEMD160, SHA256, enc } from 'crypto-js';

const ec = new elliptic('secp256k1');
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
    const privateKey = getPrivateKey({
        privateAccountNode,
        index,
        change,
        network: networks['eth'],
    })?.privateKey;
    if (typeof privateKey == 'undefined') throw new Error(GenPrivateKeyError);
    return '0x' + privateKey.toString('hex');
};

/*
get
*/
export const getBCPublicAddress = ({
    publicAccountNode,
}: PublicAddressParams) => {
    const pubKey = getPublicKey({ publicAccountNode });
    if (pubKey) {
        const pubKeyEC = ec.keyFromPublic(pubKey.toString('hex'), 'hex');
        const pubPoint = pubKeyEC.getPublic();
        const compressed = pubPoint.encodeCompressed();
        const hexed = ab2hexstring(compressed);
        const hexEncoded = enc.Hex.parse(hexed);
        const sha256hash = SHA256(hexEncoded);
        const hash = RIPEMD160(sha256hash).toString();
        return encodeAddressToBech32({
            address: hash,
            prefix: 'bnb',
        });
    } else throw new Error(DerivePathError);
};

export const generateAddresses = ({
    privateAccountNode,
    network,
    derivation,
}: GenerateAddressParams): AddressResult => {
    const newAddress = {} as AddressResult;
    newAddress.extendedNode = privateAccountNode;
    newAddress.privateKey = getPrivateKey({
        privateAccountNode,
        network,
    }).privateKey;
    newAddress.publicKey = getPublicKey({
        publicAccountNode: privateAccountNode,
    });
    newAddress.privateAddress = getPrivateAddress({
        privateAccountNode,
        network,
    });
    switch (derivation.name) {
        case 'legacy':
            newAddress.publicAddress = getPublicAddress({
                publicAccountNode: privateAccountNode,
            });
            break;
        case 'bnb':
            newAddress.publicAddress = getBCPublicAddress({
                publicAccountNode: privateAccountNode,
            });
            break;
        case 'harmony':
            newAddress.publicAddress = getHarmonyPublicAddress({
                publicAccountNode: privateAccountNode,
            });
            break;
        case 'xdc':
            newAddress.publicAddress = getXDCPublicAddress({
                publicAccountNode: privateAccountNode,
            });
            break;
        case 'okx':
            newAddress.publicAddress = getOKXPublicAddress({
                publicAccountNode: privateAccountNode,
            });
            break;
        default:
            throw new Error(DerivationTypeNotSupported);
    }
    return newAddress;
};
