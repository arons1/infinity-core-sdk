import {
    CoinNotSupported,
    CurveNotSupported,
    DerivePathError,
    NetworkNotSupported,
} from '../errors/networks';
import networks from './networks';
import derivations from './derivations';
import { AddressResult, GenerateAddressesParams } from './types';

import { generateAddresses as generateAddressEVM } from './evm';
import { generateAddresses as generateAddressUTXO } from './utxo';

import { getPrivateMasterKey, getRootNode } from '../utils/secp256k1';

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
        switch (coin.curve) {
            case 'ecdsa':
                results.push(
                    generateAddressEVM({
                        privateAccountNode,
                        network,
                        derivation,
                    }),
                );
                break;
            case 'secp256k1':
                results.push(
                    generateAddressUTXO({
                        privateAccountNode,
                        network,
                        derivation,
                    }),
                );
                break;
            default:
                throw new Error(CurveNotSupported);
        }
    }
    return results;
};
