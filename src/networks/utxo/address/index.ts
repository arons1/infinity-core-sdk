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
    GeneratePublicAddressParams,
    PublicAddressParams,
    PublicAddressResult,
    RedemParams,
} from '../../types';
import {
    encodeGeneric,
    getPrivateKey,
    getPrivateMasterKey,
    getPublicKey,
    getRootNode,
} from '../../utils/secp256k1';
import { extractPath } from '../../../utils';
import { DerivationName } from '../../constants';

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
export const getRedeemP2WPKH = ({
    publicKey,
    network,
}: RedemParams): Buffer | undefined => {
    const redeem = payments.p2wpkh({
        pubkey: publicKey,
        network: network as Network,
    });
    return redeem.output;
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
/* 
generateAddresses
    Returns addresses and private keys
    @param derivation: derivation object
    @param mnemonic: mnemonic
*/
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
        derivation.xprv,
    );
    newAddress.extendedPublicAddress = encodeGeneric(
        privateAccountNode.neutered().toBase58(),
        derivation.xpub,
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
        case DerivationName.LEGACY:
            newAddress.publicAddress = getPublicAddressP2PKH({
                publicAccountNode: privateAccountNode,
                network,
            });
            break;
        case DerivationName.WRAPPED_SEGWIT:
            newAddress.publicAddress = getPublicAddressP2WPKHP2S({
                publicAccountNode: privateAccountNode,
                network,
            });
            break;
        case DerivationName.SEGWIT:
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

/* 
generatePublicAddresses
    Returns addresses and private keys
    @param derivation: derivation object
    @param publicNode: Public Extended Node derivation
    @param change: change derivation
    @param index: index derivation
    @param network: Network
*/
export const generatePublicAddress = ({
    publicAccountNode,
    network,
    change,
    index,
    derivation,
}: GeneratePublicAddressParams): PublicAddressResult => {
    const newAddress = {} as PublicAddressResult;
    newAddress.publicKey = getPublicKey({
        publicAccountNode,
    });
    switch (derivation) {
        case DerivationName.LEGACY:
            newAddress.publicAddress = getPublicAddressP2PKH({
                publicAccountNode,
                network,
                change,
                index,
            });
            break;
        case DerivationName.WRAPPED_SEGWIT:
            newAddress.publicAddress = getPublicAddressP2WPKHP2S({
                publicAccountNode,
                network,
                change,
                index,
            });
            break;
        case DerivationName.SEGWIT:
            newAddress.publicAddress = getPublicAddressSegwit({
                publicAccountNode,
                network,
                change,
                index,
            });
            break;
        default:
            throw new Error(DerivationTypeNotSupported);
    }
    return newAddress;
};
