import {
    CoinNotSupported,
    CurveNotSupported,
    NetworkNotSupported,
} from '../errors/networks';
import networks from './networks';
import derivations from './derivations';
import { AddressResult, GenerateAddressesParams } from './types';

import { generateAddresses as generateAddressEVM } from './evm';
import { generateAddresses as generateAddressUTXO } from './utxo';
import { generateAddresses as generateAddressED25519 } from './ed25519';
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
