import bs58check from 'bs58check';
import { BIP32Interface, fromSeed } from '../../core/bip32';
import {
    AddressParams,
    MasterAddressParams,
    MasterKeyParams,
    MasterPublicAddressParams,
    PublicAddressParams,
    RootNodeParams,
} from '../types';
import { mnemonicToSeedSync, validateMnemonic } from '../../core/bip39';
import {
    DerivationTypeNotSupported,
    InvalidMnemonic,
} from '../../errors/networks';
import { Protocol } from '../registry';
import config from '../config';
import { Encoding } from '../constants';

const addressEncoding: Record<Encoding, string> = {
    [Encoding.XPUB]: '0488b21e',
    [Encoding.YPUB]: '049d7cb2',
    [Encoding.ZPUB]: '04b24746',
    [Encoding.XPRIV]: '0x0488ade4',
    [Encoding.YPRIV]: '049d7878',
    [Encoding.ZPRIV]: '04b2430c',
    [Encoding.LTUB]: '019da462',
    [Encoding.LTPV]: '019d9cfe',
    [Encoding.DGUB]: '02facafd',
    [Encoding.DGPUV]: '02fac398',
};
const replaceDerive = (val: string): string => val.replace("'", '');
export const isValidPath = (path: string) => {
    if (typeof path != 'string') return false;
    const splitted = path.split('/');
    if (splitted[0] != 'm') return false;
    if (splitted.length < 4 || splitted.length > 6) return false;
    return (
        splitted
            .slice(1)
            .map(replaceDerive)
            .find(a => isNaN(parseInt(a))) == undefined
    );
};
export const encodeGeneric = (dataAddress: string, type: Encoding) => {
    if (dataAddress.startsWith(type)) return dataAddress;
    var data = bs58check.decode(dataAddress);
    data = data.slice(4);
    const encodeCode = addressEncoding[type];
    data = Buffer.concat([Buffer.from(encodeCode, 'hex'), data]);
    return bs58check.encode(data);
};
export const xpubToYpub = (data: string) => {
    return encodeGeneric(data, Encoding.YPUB);
};
export const xprvToYprv = (data: string): string => {
    return encodeGeneric(data, Encoding.YPRIV);
};
export const xprvToZprv = (data: string): string => {
    return encodeGeneric(data, Encoding.ZPRIV);
};
export const xpubToZpub = (data: string): string => {
    return encodeGeneric(data, Encoding.ZPUB);
};


/**
 * Generates a root node based on the provided mnemonic and network.
 *
 * @param {RootNodeParams} mnemonic - The mnemonic to generate the root node from.
 * @param {Network} network - The network for the root node.
 * @return {BIP32Interface} The generated root node.
 */
export const getRootNode = ({
    mnemonic,
    network,
}: RootNodeParams): BIP32Interface => {
    if (!validateMnemonic(mnemonic)) throw new Error(InvalidMnemonic);
    const seed = mnemonicToSeedSync(mnemonic);
    return fromSeed(seed, network);
};

/**
 * Returns the public master key for a given root node, coin BIP32 ID, and protocol.
 *
 * @param {BIP32Interface} rootNode - The root node.
 * @param {string} bipIdCoin - The coin BIP32 ID.
 * @param {Protocol} [protocol=Protocol.LEGACY] - The protocol to use in the derivation.
 * @returns {BIP32Interface} - The public master key.
 */
export const getPublicMasterKey = ({
    rootNode,
    bipIdCoin,
    protocol = Protocol.LEGACY,
}: MasterKeyParams): BIP32Interface => {
    return getPrivateMasterKey({
        rootNode,
        bipIdCoin,
        protocol,
    }).neutered();
};
/**
 * Returns the private master key for a given root node, coin BIP32 ID, and protocol.
 *
 * @param {MasterKeyParams} params - The parameters for generating the private master key.
 * @param {BIP32Interface} params.rootNode - The root node.
 * @param {string} params.bipIdCoin - The coin BIP32 ID.
 * @param {number} [params.protocol=44] - The protocol to use in the derivation.
 * @returns {BIP32Interface} - The private master key.
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

/**
 * Returns the private master address for a given private account node, coin ID, and protocol.
 *
 * @param {MasterAddressParams} params - The parameters for generating the private master address.
 * @param {BIP32Interface} params.privateAccountNode - The private account node.
 * @param {string} params.coinId - The ID of the coin.
 * @param {number} [params.protocol=44] - The protocol to use in the derivation.
 * @return {string} The private master address.
 * @throws {Error} If the derivation for the specified protocol is not found.
 */
export const getPrivateMasterAddress = ({
    privateAccountNode,
    coinId,
    protocol = 44,
}: MasterAddressParams): string => {
    const derivation = config[coinId].derivations.find(
        a => a.protocol == protocol,
    );
    if (!derivation) throw new Error(DerivationTypeNotSupported);
    return encodeGeneric(
        privateAccountNode.toBase58(),
        derivation.xprv ?? Encoding.XPRIV,
    );
};

/**
 * Returns the public master address for a given public account node, coin ID, and protocol.
 *
 * @param {MasterPublicAddressParams} params - The parameters for generating the public master address.
 * @param {BIP32Interface} params.publicAccountNode - The public account node.
 * @param {string} params.coinId - The ID of the coin.
 * @param {number} [params.protocol=44] - The protocol to use in the derivation.
 * @return {string} The public master address.
 * @throws {Error} If the derivation for the specified protocol is not found.
 */
export const getPublicMasterAddress = ({
    publicAccountNode,
    coinId,
    protocol = 44,
}: MasterPublicAddressParams): string => {
    const derivation = config[coinId].derivations.find(
        a => a.protocol == protocol,
    );
    if (!derivation) throw new Error(DerivationTypeNotSupported);
    return encodeGeneric(
        publicAccountNode.toBase58(),
        derivation.xpub ?? Encoding.XPUB,
    );
};

/**
 * Returns the private key for a given private account node, with optional change and index.
 *
 * @param {AddressParams} privateAccountNode - The private account node.
 * @param {number} [change=0] - The change to apply to the derivation.
 * @param {number} [index=0] - The index to apply to the derivation.
 * @return {BIP32Interface} The private key derived from the private account node.
 */
export const getPrivateKey = ({
    privateAccountNode,
    change = 0,
    index = 0,
}: AddressParams): BIP32Interface => {
    return privateAccountNode.derive(change).derive(index);
};


/**
 * Retrieves the public key associated with a given public account node, change, and index.
 *
 * @param {PublicAddressParams} publicAccountNode - The public account node.
 * @param {number} [change=0] - The change to apply to the derivation.
 * @param {number} [index=0] - The index to apply to the derivation.
 * @return {Buffer | undefined} The public key derived from the public account node, or undefined if not available.
 */
export const getPublicKey = ({
    publicAccountNode,
    change = 0,
    index = 0,
}: PublicAddressParams): Buffer | undefined => {
    return publicAccountNode.derive(change).derive(index).publicKey;
};
