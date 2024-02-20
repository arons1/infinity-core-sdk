import {
    CoinNotSupported,
    CurveNotSupported,
    DerivationTypeNotSupported,
    DerivePathError,
    InvalidMnemonic,
    NetworkNotSupported,
} from '../errors/networks';
import networks from './networks';
import derivations from './derivations';
import {
    AddressParams,
    AddressResult,
    GenerateAddressesParams,
    MasterKeyParams,
    PublicAddressParams,
    RootNodeParams,
} from './types';
import { BIP32Interface, fromSeed } from '../core/bip32';
import { mnemonicToSeedSync, validateMnemonic } from '../core/bip39';
import {
    getPublicAddress as getPublicAddressEVM,
    getPrivateAddress as getPrivateAddressEVM,
    getHarmonyPublicAddress,
    getOKXPublicAddress,
    getXDCPublicAddress,
    getBCPublicAddress,
} from './evm';
import {
    getPublicAddressP2PKH as getPublicAddressUTXO,
    getPrivateAddress as getPrivateAddressUTXO,
    getPublicAddressP2WPKHP2S as getPublicAddressWrappedSegwit,
    getPublicAddressSegwit as getPublicAddressSegwit,
} from './utxo';

import bs58check from 'bs58check';

const extractPath = (path: string) => {
    if (!path.startsWith('m/')) throw new Error(DerivePathError);
    const parts = path.split('/');
    if (parts.length != 6 && parts.length != 4)
        throw new Error(DerivePathError);
    return parts.slice(1).map(a => {
        return {
            number: parseInt(a.split("'")[0]),
            hardened: a.includes("'"),
        };
    });
};
const addressEncoding: Record<string, string> = {
    ypub: '049d7cb2',
    zpub: '04b24746',
    ypriv: '049d7878',
    zpriv: '04b2430c',
};
const encodeGeneric = (dataAddress: string, type: string) => {
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
/* 
generateAddresses
    Returns generated addresses
    @param mnemonic: Mnemonic to generate addresses from
    @param idCoin: Coin id
*/
export const generateAddresses = ({
    mnemonic,
    idCoin,
}: GenerateAddressesParams): AddressResult[] => {
    const network = networks[idCoin];
    const coin = derivations[idCoin];
    if (!network) throw new Error(NetworkNotSupported);
    if (!coin) throw new Error(CoinNotSupported);
    const results: AddressResult[] = [];
    for (let derivation of coin.derivations) {
        const path = extractPath(derivation.path);
        const privateAccountNode = getPrivateMasterKey({
            rootNode: getRootNode({ mnemonic, network }),
            bipIdCoin: path[1].number,
            protocol: path[0].number,
        });
        const publicAccountNode = privateAccountNode.neutered();
        const newAddress = {
            extendedPrivateAddress: encodeGeneric(
                privateAccountNode.toBase58(),
                derivation.xprv,
            ),
            extendedPublicAddress: encodeGeneric(
                publicAccountNode.toBase58(),
                derivation.xpub,
            ),
            privateKey: getPrivateKey({ privateAccountNode, network })
                .privateKey,
            publicKey: getPublicKey({ publicAccountNode }),
        } as AddressResult;
        switch (coin.curve) {
            case 'ecdsa':
                switch (derivation.name) {
                    case 'legacy':
                        newAddress.publicAddress = getPublicAddressEVM({
                            publicAccountNode,
                        });
                        newAddress.privateAddress = getPrivateAddressEVM({
                            privateAccountNode,
                            network,
                        });
                        results.push(newAddress);
                        break;
                    case 'bnb':
                        newAddress.publicAddress = getBCPublicAddress({
                            publicAccountNode,
                        });
                        newAddress.privateAddress = getPrivateAddressEVM({
                            privateAccountNode,
                            network,
                        });
                        results.push(newAddress);
                        break;
                    case 'harmony':
                        newAddress.publicAddress = getHarmonyPublicAddress({
                            publicAccountNode,
                        });
                        newAddress.privateAddress = getPrivateAddressEVM({
                            privateAccountNode,
                            network,
                        });
                        results.push(newAddress);
                        break;
                    case 'xdc':
                        newAddress.publicAddress = getXDCPublicAddress({
                            publicAccountNode,
                        });
                        newAddress.privateAddress = getPrivateAddressEVM({
                            privateAccountNode,
                            network,
                        });
                        results.push(newAddress);
                        break;
                    case 'okx':
                        newAddress.publicAddress = getOKXPublicAddress({
                            publicAccountNode,
                        });
                        newAddress.privateAddress = getPrivateAddressEVM({
                            privateAccountNode,
                            network,
                        });
                        results.push(newAddress);
                        break;
                    default:
                        throw new Error(DerivationTypeNotSupported);
                }
                break;
            case 'secp256k1':
                switch (derivation.name) {
                    case 'legacy':
                        newAddress.publicAddress = getPublicAddressUTXO({
                            publicAccountNode,
                            network,
                        });
                        newAddress.privateAddress = getPrivateAddressUTXO({
                            privateAccountNode,
                            network,
                        });
                        results.push(newAddress);
                        break;
                    case 'wrapped-segwit':
                        newAddress.publicAddress =
                            getPublicAddressWrappedSegwit({
                                publicAccountNode,
                                network,
                            });
                        newAddress.privateAddress = getPrivateAddressUTXO({
                            privateAccountNode,
                            network,
                        });
                        results.push(newAddress);
                        break;
                    case 'segwit':
                        newAddress.publicAddress = getPublicAddressSegwit({
                            publicAccountNode,
                            network,
                        });
                        newAddress.privateAddress = getPrivateAddressUTXO({
                            privateAccountNode,
                            network,
                        });
                        results.push(newAddress);
                        break;
                    default:
                        throw new Error(DerivationTypeNotSupported);
                }
                break;
            default:
                throw new Error(CurveNotSupported);
        }
    }
    return results;
};
