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
import { Protocol } from '../../registry';
import { bitcoinjs } from '../../../core';

/**
 * Retrieves the private address associated with a given private account node.
 *
 * @param {AddressParams} privateAccountNode - The private account node.
 * @param {number} [change=0] - The change derivation.
 * @param {number} [index=0] - The index derivation.
 * @param {Network} network - The network for derivation.
 * @returns {string} The private address in Wallet Import Format (WIF).
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

export const importMaster = (privateMasterAddress: string, network: Network) =>
    bitcoinjs.bip32.fromBase58(privateMasterAddress, network);

/**
 * Generates a public address for SegWit transactions.
 *
 * @param {PublicAddressParams} publicAccountNode - The extended public account node.
 * @param {number} [change=0] - The change derivation.
 * @param {number} [index=0] - The index derivation.
 * @param {Network} network - The network for derivation.
 * @return {string | undefined} The generated public address.
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
/**
 * Generates a redeem script for a Pay-to-Witness-Public-Key-Hash (P2WPKH) transaction.
 *
 * @param {Object} params - The parameters for generating the redeem script.
 * @param {Buffer} params.publicKey - The public key used in the redeem script.
 * @param {Network} params.network - The network for which the redeem script is generated.
 * @return {Buffer | undefined} The redeem script as a Buffer, or undefined if any of the parameters are invalid.
 */
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

/**
 * Generates a public address using the P2WPKH-P2S scheme.
 *
 * @param {PublicAddressParams} publicAccountNode - The extended public account node.
 * @param {number} [change=0] - The change derivation.
 * @param {number} [index=0] - The index derivation.
 * @param {Network} network - The network for derivation.
 * @return {string | undefined} The generated public address.
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

/**
 * Generates a public address using the P2PKH (Pay-to-Public-Key-Hash) scheme.
 *
 * @param {PublicAddressParams} publicAccountNode - The extended public account node.
 * @param {number} [change=0] - The change derivation.
 * @param {number} [index=0] - The index derivation.
 * @param {Network} network - The network for derivation.
 * @return {string | undefined} The generated public address.
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

/**
 * Generates addresses and private keys based on the given parameters.
 *
 * @param {GenerateAddressParams} params - The parameters for generating addresses.
 * @param {string} params.mnemonic - The mnemonic for generating the addresses.
 * @param {Network} params.network - The network for generating the addresses.
 * @param {Derivation} params.derivation - The derivation object for generating the addresses.
 * @throws {Error} If the derivation object does not contain xprv or xpub.
 * @return {AddressResult} The generated addresses and private keys.
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
    newAddress.protocol = path[0].number as Protocol;

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

/**
 * Generates a public address based on the given parameters.
 *
 * @param {GeneratePublicAddressParams} params - The parameters for generating the public address.
 * @param {BIP32Interface} params.publicAccountNode - The extended public account node.
 * @param {Network} params.network - The network for generating the address.
 * @param {number} [params.change=0] - The change derivation.
 * @param {number} [params.index=0] - The index derivation.
 * @param {DerivationName} params.derivation - The derivation scheme for generating the address.
 * @throws {Error} If the derivation scheme is not supported.
 * @return {PublicAddressResult} The generated public address.
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
