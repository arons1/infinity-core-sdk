import {
    CoinNotSupported,
    CurveNotSupported,
    DerivationTypeNotSupported,
    DerivePathError,
    NetworkNotSupported,
} from '../errors/networks';
import networks from './networks';
import derivations from './derivations';
import {
    AddressResult,
    GenerateAddressesParams
} from './types';

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
import { encodeGeneric, getPrivateKey, getPrivateMasterKey, getPublicKey, getRootNode } from '../utils/secp256k1';

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
        const newAddress = {} as AddressResult;
        if(coin.curve == 'ecdsa' || coin.curve == "secp256k1"){
            newAddress.extendedNode = privateAccountNode;
            newAddress.extendedPrivateAddress = encodeGeneric(
                privateAccountNode.toBase58(),
                derivation.xprv,
            );
            newAddress.extendedPublicAddress = encodeGeneric(
                publicAccountNode.toBase58(),
                derivation.xpub,
            );
            newAddress.privateKey = getPrivateKey({
                privateAccountNode,
                network,
            }).privateKey;
            newAddress.publicKey = getPublicKey({ publicAccountNode });
        }
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
