import {
    CoinNotSupported,
    CurveNotSupported,
    NetworkNotSupported,
} from '../errors/networks';
import networks from './networks';
import derivations from './config';
import {
    AddressResult,
    GenerateAddressesParams,
    GeneratePublicAddressesParams,
    PublicAddressResult,
} from './types';

import { generateAddresses as generateAddressEVM } from './evm';
import {
    generateAddresses as generateAddressUTXO,
    generatePublicAddress,
} from './utxo';
import { generateAddresses as generateAddressED25519 } from './ed25519';
import { DerivationTypeNotSupported } from '../errors/networks/index';
import { Curve } from './registry';
import { DerivationName } from './constants';
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
    if (!coin) throw new Error(CoinNotSupported);
    if (!network && coin.curve != Curve.ED25519)
        throw new Error(NetworkNotSupported);
    const results: AddressResult[] = [];
    for (let derivation of coin.derivations) {
        switch (coin.curve) {
            case Curve.ECDSA:
                results.push(
                    generateAddressEVM({
                        mnemonic,
                        network,
                        derivation,
                    }),
                );
                break;
            case Curve.SECP256K1:
                results.push(
                    generateAddressUTXO({
                        mnemonic,
                        network,
                        derivation,
                    }),
                );
                break;
            case Curve.ED25519:
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
    @param publicAccountNode: Public secp256k1 node
    @param idCoin: Coin id
    @param change: change derivation
    @param index: index derivation
    @param derivation: derivation name
*/
export const generatePublicAddresses = ({
    publicAccountNode,
    idCoin,
    change,
    index,
    derivation = DerivationName.LEGACY,
}: GeneratePublicAddressesParams): PublicAddressResult => {
    const network = networks[idCoin];
    const coin = derivations[idCoin];
    if (!coin) throw new Error(CoinNotSupported);
    if (!network) throw new Error(NetworkNotSupported);
    if (coin.curve != Curve.ED25519)
        throw new Error(DerivationTypeNotSupported);
    if (coin.derivations.find(a => a.name == derivation) == undefined)
        throw new Error(DerivationTypeNotSupported);
    return generatePublicAddress({
        publicAccountNode,
        network,
        change,
        index,
        derivation,
    });
};
