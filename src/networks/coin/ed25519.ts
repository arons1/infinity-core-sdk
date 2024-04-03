import { DerivationTypeNotSupported, NotImplemented } from '../../errors';
import {
    getKeyPair,
    getPrivateKey,
    getPublicKey,
    getPublicSolanaAddress,
    getPublicStellarAddress,
    getPublicTezosAddress,
    getPublicXRPAddress,
    getSecretAddress,
    getSeed,
    getTezosPublicKeyHash,
} from '../ed25519';
import { Coins, Curve } from '../registry';
import {
    AddressResult,
    GetSeedParams,
    getAccountParams,
    getPrivateAddressED25519Params,
    getPublicAddressED25519Params,
} from '../types';
import Base from './base';
import { GetKeyPairParams } from '../../../lib/commonjs/networks/ed25519/address/types';
import config from '../config';
import { DerivationName } from '../constants';
import { isValidAddress as isValidAddressStellar } from '../utils/stellar';
import { isValidAddress as isValidAddressXRP } from '../utils/xrp';
import { isValidAddress as isValidAddressSolana } from '../utils/solana';
import { isValidAddress as isValidAddressTezos } from '../utils/tezos';
import { generateAddresses } from '../generate_address';

class ED25519Coin extends Base {
    curve = Curve.ED25519;
    supportedMethods(): string[] {
        return ['getPrivateAddress', 'getPublicAddress', 'isValidAddress','getAccount','getSeed','getKeyPair','generateAddresses'];
    }
    getPrivateAddress({ keyPair }: getPrivateAddressED25519Params) {
        return getSecretAddress({
            secretKey: getPrivateKey({ keyPair }),
            bipIdCoin: this.bipIdCoin,
        });
    }
    getPublicAddress({ keyPair }: getPublicAddressED25519Params) {
        const publicKey = getPublicKey({ keyPair, bipIdCoin: this.bipIdCoin });
        const derivation = config[this.idCoin].derivations[0];
        switch (derivation.name) {
            case DerivationName.STELLAR:
                return getPublicStellarAddress({
                    publicKey,
                });

            case DerivationName.XRP:
                return getPublicXRPAddress({
                    publicKey,
                });

            case DerivationName.SOLANA:
                return getPublicSolanaAddress({
                    publicKey,
                });

            case DerivationName.TEZOS:
                return getPublicTezosAddress({
                    publicKey,
                });
            default:
                throw new Error(DerivationTypeNotSupported);
        }
    }
    isValidAddress(address: string) {
        const derivation = config[this.idCoin].derivations[0];
        switch (derivation.name) {
            case DerivationName.STELLAR:
                return isValidAddressStellar(address);
            case DerivationName.XRP:
                return isValidAddressXRP(address);
            case DerivationName.SOLANA:
                return isValidAddressSolana(address);
            case DerivationName.TEZOS:
                return isValidAddressTezos(address);
            default:
                throw new Error(DerivationTypeNotSupported);
        }
    }
    getAccount({ keyPair }: getAccountParams): string {
        if (this.idCoin == Coins.TEZOS)
            return getTezosPublicKeyHash({
                keyPair,
            });
        throw new Error(NotImplemented);
    }
    getSeed({ mnemonic }: GetSeedParams) {
        return getSeed({ mnemonic });
    }
    getKeyPair({ path, seed }: GetKeyPairParams) {
        return getKeyPair({ path, seed });
    }
    generateAddresses(mnemonic: string): AddressResult[] {
        return generateAddresses({ mnemonic, idCoin: this.idCoin });
    }
    isValidExtendedKey(_props: any) {
        throw new Error(NotImplemented);
    }
    generatePublicAddresses(_props: any) {
        throw new Error(NotImplemented);
    }
    getRootNode(_props: any) {
        throw new Error(NotImplemented);
    }
    getPrivateMasterKey(_props: any) {
        throw new Error(NotImplemented);
    }
    getPublicMasterKey(_props: any) {
        throw new Error(NotImplemented);
    }
    getPrivateMasterAddress(_props: any) {
        throw new Error(NotImplemented);
    }
    getPublicMasterAddress(_props: any) {
        throw new Error(NotImplemented);
    }
}

export default ED25519Coin;
