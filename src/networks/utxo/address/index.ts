import { Network, payments } from 'bitcoinjs-lib';

import {
    DerivationTypeNotSupported,
    GenPrivateKeyError,
    MissingExtendedParams,
} from '../../../errors/networks';
import {
    AddressParams,
    AddressResult,
    GenerateAddressParams,
    PublicAddressParams,
} from '../../types';
import {
    encodeGeneric,
    getPrivateKey,
    getPrivateMasterKey,
    getPublicKey,
    getRootNode,
} from '../../utils/secp256k1';
import { extractPath } from '../../../utils';

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
    if (privateKey?.privateKey == undefined)
        throw new Error(GenPrivateKeyError);
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

export const generateAddresses = ({
    mnemonic,
    network,
    derivation,
}: GenerateAddressParams): AddressResult => {
    if (derivation.xprv == undefined || derivation.xpub == undefined)
        throw new Error(MissingExtendedParams);
    const path = extractPath(derivation.path);
    const privateAccountNode = getPrivateMasterKey({
        rootNode: getRootNode({ mnemonic, network }),
        bipIdCoin: path[1].number,
        protocol: path[0].number,
    });
    const newAddress = {} as AddressResult;
    newAddress.extendedNode = privateAccountNode;
    newAddress.extendedPrivateAddress = encodeGeneric(
        privateAccountNode.toBase58(),
        derivation.xprv as string,
    );
    newAddress.extendedPublicAddress = encodeGeneric(
        privateAccountNode.neutered().toBase58(),
        derivation.xpub as string,
    );
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
            newAddress.publicAddress = getPublicAddressP2PKH({
                publicAccountNode: privateAccountNode,
                network,
            });
            break;
        case 'wrapped-segwit':
            newAddress.publicAddress = getPublicAddressP2WPKHP2S({
                publicAccountNode: privateAccountNode,
                network,
            });
            break;
        case 'segwit':
            newAddress.publicAddress = getPublicAddressSegwit({
                publicAccountNode: privateAccountNode,
                network,
            });
            break;
        default:
            throw new Error(DerivationTypeNotSupported);
    }
    return newAddress;
};
