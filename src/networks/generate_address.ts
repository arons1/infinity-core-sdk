import {
    CoinNotSupported,
    CurveNotSupported,
    NetworkNotSupported,
} from '../errors/networks';
import networks from './networks';
import derivations from './derivations';
import { AddressResult, GenerateAddressesParams, GeneratePublicAddressesParams } from './types';

import { generateAddresses as generateAddressEVM } from './evm';
import { generateAddresses as generateAddressUTXO,generatePublicAddress } from './utxo';
import { generateAddresses as generateAddressED25519 } from './ed25519';
import { DerivationTypeNotSupported } from '../errors/networks/index';
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
        switch (coin.curve) {
            case 'ecdsa':
                results.push(
                    generateAddressEVM({
                        mnemonic,
                        network,
                        derivation,
                    }),
                );
                break;
            case 'secp256k1':
                results.push(
                    generateAddressUTXO({
                        mnemonic,
                        network,
                        derivation,
                    }),
                );
                break;
            case 'ed25519':
                results.push(
                    generateAddressED25519({
                        mnemonic,
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

/* 
generatePublicAddresses
    Returns public generated addresses
    @param publicNode: Public secp256k1 node
    @param idCoin: Coin id
    @param change: change derivation
    @param index: index derivation
*/
export const generatePublicAddresses = ({
    publicNode,
    idCoin,
    change,
    index
}: GeneratePublicAddressesParams): AddressResult[] => {
    const network = networks[idCoin];
    const coin = derivations[idCoin];
    if (!network) throw new Error(NetworkNotSupported);
    if (!coin) throw new Error(CoinNotSupported);
    if(coin.curve != 'secp256k1') throw new Error(DerivationTypeNotSupported);
    const results: AddressResult[] = [];
    for (let derivation of coin.derivations) {
        results.push(
            generatePublicAddress({
                publicNode,
                network,
                derivation,
                change,
                index
            }),
        );
    }
    return results;
};
