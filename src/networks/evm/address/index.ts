import { HarmonyAddress } from '@harmony-js/crypto';
import { base58, bech32 } from '@scure/base';

import {
    DerivationTypeNotSupported,
    DerivePathError,
    GenPrivateKeyError,
    InvalidAddress,
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
import {
    getPrivateKey,
    getPrivateMasterKey,
    getPublicKey,
    getRootNode,
} from '../../utils/secp256k1';
import { ab2hexstring } from '../../../core/elliptic/utils';
import { ec as elliptic } from '../../../core/elliptic';
import { RIPEMD160, SHA256, enc } from 'crypto-js';
import { extractPath } from '../../../utils';
import { createHash } from 'crypto';
import { shortenKey, stringFromUInt64T } from '../../../core/math/integers';
import { DerivationName } from '../../constants';
import { Coins, Protocol } from '../../registry';

const ec = new elliptic('secp256k1');

/**
 * Retrieves the public address associated with a given public account node.
 *
 * @param {PublicAddressParams} publicAccountNode - The public account node used to generate the public address.
 * @param {number} [change=0] - The account change derivation.
 * @param {number} [index=0] - The account index derivation.
 * @return {string | undefined} The generated public address, or undefined if the public key cannot be generated.
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
/**
 * Retrieves the Harmony public address from the provided public account node.
 *
 * @param {PublicAddressParams} publicAccountNode - The public account node used to generate the public address.
 * @param {number} [change=0] - The account change derivation.
 * @param {number} [index=0] - The account index derivation.
 * @return {string | undefined} The Harmony public address, or undefined if the public key cannot be generated.
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

/**
 * Retrieves the OKX public address from the provided public account node.
 *
 * @param {PublicAddressParams} params - The parameters for retrieving the public address.
 * @param {string} params.publicAccountNode - The public account node used to generate the public address.
 * @param {number} [params.change=0] - The account change derivation.
 * @param {number} [params.index=0] - The account index derivation.
 * @return {string | undefined} The OKX public address, or undefined if the public key cannot be generated.
 * @throws {Error} If the public key cannot be generated.
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

/**
 * Generates a public XDC address based on the provided public account node, change, and index.
 *
 * @param {PublicAddressParams} publicAccountNode - The public account node.
 * @param {number} [change=0] - The change derivation.
 * @param {number} [index=0] - The index derivation.
 * @return {string | undefined} The generated public XDC address, or undefined if the public address is not available.
 * @throws {Error} If the public address cannot be derived.
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


/**
 * Retrieves the private address associated with a given private account node.
 *
 * @param {AddressParams} params - The parameters for retrieving the private address.
 * @param {ExtendedPrivateKey} params.privateAccountNode - The private account node.
 * @returns {string} The private address in base58 format.
 * @throws {Error} If the private key is undefined.
 */

export const getFIOPrivateAddress = ({
    privateAccountNode,
}: AddressParams): string => {
    const privateKey = getPrivateKey({
        privateAccountNode,
        network: networks[Coins.FIO],
    })?.privateKey;
    if (typeof privateKey == 'undefined') throw new Error(GenPrivateKeyError);
    const private_key = Buffer.concat([new Buffer([0x80]), privateKey]);
    const sha256 = (data: Buffer) => createHash('sha256').update(data).digest();
    const checksum = sha256(sha256(private_key)).slice(0, 4);
    return base58.encode(Buffer.concat([private_key, checksum]));
};

/**
 * Retrieves the private address associated with a given private account node.
 *
 * @param {AddressParams} params - The parameters for retrieving the private address.
 * @param {ExtendedPrivateKey} params.privateAccountNode - The private account node.
 * @param {number} [params.change=0] - The change derivation.
 * @param {number} [params.index=0] - The index derivation.
 * @returns {string} The private address in hexadecimal format.
 * @throws {Error} If the private key is undefined.
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
        network: networks[Coins.ETH],
    })?.privateKey;
    if (typeof privateKey == 'undefined') throw new Error(GenPrivateKeyError);
    return '0x' + privateKey.toString('hex');
};

/**
 * Generates a FIO public address from the given public account node.
 *
 * @param {PublicAddressParams} publicAccountNode - The public account node used to generate the public address.
 * @return {string} The generated FIO public address.
 */

export const getFIOPublicAddress = ({
    publicAccountNode,
}: PublicAddressParams) => {
    const pubKey = getPublicKey({ publicAccountNode });
    if (pubKey) {
        const pubKeyEC = ec.keyFromPublic(pubKey.toString('hex'), 'hex');
        const pubPoint = pubKeyEC.getPublic();
        const compressed = pubPoint.encodeCompressed();
        const hexed = ab2hexstring(compressed);
        const checksum = createHash('ripemd160')
            .update(Buffer.from(hexed, 'hex'))
            .digest()
            .slice(0, 4);
        return (
            'FIO' +
            base58.encode(Buffer.concat([Buffer.from(hexed, 'hex'), checksum]))
        );
    } else throw new Error(DerivePathError);
};

/**
 * A function that retrieves the FIO account based on the provided public address.
 *
 * @param {string} publicAddress - The public address to extract the FIO account from.
 * @return {string} The FIO account extracted from the public address.
 */
export const getFIOAccount = (publicAddress: string) => {
    if (!publicAddress.startsWith('FIO')) throw new Error(InvalidAddress);
    const pubkey = publicAddress.substring('FIO'.length, publicAddress.length);

    const decoded58 = base58.decode(pubkey);
    const long = shortenKey(decoded58);

    const output = stringFromUInt64T(long);
    return output;
};

/**
 * Generates a Binance Chain (BC) public address from the given public account node.
 *
 * @param {PublicAddressParams} publicAccountNode - The public account node used to generate the public address.
 * @return {string} The generated Binance Chain public address.
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

/**
 * Generates addresses and private keys based on the provided parameters.
 *
 * @param {GenerateAddressParams} params - The parameters for generating addresses.
 * @param {Network} params.network - The network object.
 * @param {Derivation} params.derivation - The derivation object.
 * @param {string} params.mnemonic - The mnemonic.
 * @return {AddressResult} The generated addresses and private keys.
 */
export const generateAddresses = ({
    network,
    derivation,
    mnemonic,
}: GenerateAddressParams): AddressResult => {
    const path = extractPath(derivation.path);
    const privateAccountNode = getPrivateMasterKey({
        rootNode: getRootNode({ mnemonic, network }),
        bipIdCoin: path[1].number,
        protocol: path[0].number,
    });
    const newAddress = {} as AddressResult;
    newAddress.protocol = path[0].number as Protocol;
    newAddress.extendedNode = privateAccountNode;
    newAddress.privateKey = getPrivateKey({
        privateAccountNode,
        network,
    }).privateKey;
    newAddress.publicKey = getPublicKey({
        publicAccountNode: privateAccountNode,
    });
    if (derivation.name == DerivationName.FIO) {
        newAddress.privateAddress = getFIOPrivateAddress({
            privateAccountNode,
            network,
        });
    } else {
        newAddress.privateAddress = getPrivateAddress({
            privateAccountNode,
            network,
        });
    }

    switch (derivation.name) {
        case DerivationName.LEGACY:
            newAddress.publicAddress = getPublicAddress({
                publicAccountNode: privateAccountNode,
            });
            break;
        case DerivationName.BNB:
            newAddress.publicAddress = getBCPublicAddress({
                publicAccountNode: privateAccountNode,
            });
            break;
        case DerivationName.HARMONY:
            newAddress.publicAddress = getHarmonyPublicAddress({
                publicAccountNode: privateAccountNode,
            });
            break;
        case DerivationName.XDC:
            newAddress.publicAddress = getXDCPublicAddress({
                publicAccountNode: privateAccountNode,
            });
            break;
        case DerivationName.OKX:
            newAddress.publicAddress = getOKXPublicAddress({
                publicAccountNode: privateAccountNode,
            });
            break;
        case DerivationName.FIO:
            newAddress.publicAddress = getFIOPublicAddress({
                publicAccountNode: privateAccountNode,
            });
            newAddress.account = getFIOAccount(newAddress.publicAddress);
            break;
        default:
            throw new Error(DerivationTypeNotSupported);
    }
    return newAddress;
};
