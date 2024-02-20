import { Network, payments } from 'bitcoinjs-lib';
import { BIP32Interface } from '../../../core/bip32';

import { AddressParams, PublicAddressParams } from './types';
import { getPrivateKey, getPublicKey } from '../../getAddress';
import { GenPrivateKeyError } from '../../../errors/networks';

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
    var privateKey = getPrivateKey({
        privateAccountNode,
        index,
        change,
        network,
    });
    if (privateKey == undefined) throw new Error(GenPrivateKeyError);
    privateKey = privateKey as BIP32Interface;
    return privateKey.toWIF();
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
