import { BIP32Interface } from 'bitcoinjs-lib';
import { Coins, Curve } from '../registry';

import {
    AddressResult,
    getPrivateAddressParams,
    getPrivateMasterKeyParams,
    getPublicAddressParams,
    getPublicMasterKeyParams,
} from '../types';
import {
    getPrivateMasterKey,
    getRootNode
} from '../utils/secp256k1';

import networks from '../networks';
import {
    DerivationTypeNotSupported,
    InvalidAddress,
    NotImplemented,
} from '../../errors';
import {
    getBCPublicAddress,
    getFIOPublicAddress,
    getHarmonyPublicAddress,
    getOKXPublicAddress,
    getPrivateAddress,
    getXDCPublicAddress,
    getPublicAddress,
    getFIOAccount,
} from '../evm/address/index';
import { isValidAddress } from '../utils/evm';
import { generateAddresses } from '../generate_address';
import Base from './base';
import config from '../config';
import { DerivationName } from '../constants';

class ECDSACoin extends Base {


    curve = Curve.ECDSA;
    supportedMethods(): string[] {
        return [
            'getRootNode',
            'getPrivateMasterKey',
            'getPublicMasterKey',
            'getPrivateAddress',
            'getPublicAddress',
            'isValidAddress',
            'generateAddresses',
            'getAccount',
        ];
    }
    getRootNode = (mnemonic: string): BIP32Interface =>
        getRootNode({ mnemonic, network: networks[this.idCoin] });
    getPrivateMasterKey = ({
        protocol = 44,
        rootNode,
    }: getPrivateMasterKeyParams): BIP32Interface =>
        getPrivateMasterKey({ bipIdCoin: this.bipIdCoin, protocol, rootNode });
    getPublicMasterKey = ({
        protocol = 44,
        rootNode,
    }: getPublicMasterKeyParams): BIP32Interface =>
        getPrivateMasterKey({
            bipIdCoin: this.bipIdCoin,
            protocol,
            rootNode,
        }).neutered();
    getPrivateAddress = ({
        privateAccountNode,
    }: getPrivateAddressParams): string =>
        getPrivateAddress({ privateAccountNode });
    getPublicAddress = ({
        publicAccountNode,
    }: getPublicAddressParams): string | undefined => {
        const derivation = config[this.idCoin].derivations[0];
        switch (derivation.name) {
            case DerivationName.LEGACY:
                return getPublicAddress({
                    publicAccountNode,
                });
            case DerivationName.BNB:
                return getBCPublicAddress({
                    publicAccountNode,
                });
            case DerivationName.HARMONY:
                return getHarmonyPublicAddress({
                    publicAccountNode,
                });
            case DerivationName.XDC:
                return getXDCPublicAddress({
                    publicAccountNode,
                });
            case DerivationName.OKX:
                return getOKXPublicAddress({
                    publicAccountNode,
                });
            case DerivationName.FIO:
                return getFIOPublicAddress({
                    publicAccountNode,
                });
            default:
                throw new Error(DerivationTypeNotSupported);
        }
    };
    isValidAddress = (address: string): boolean => isValidAddress(address);
    generateAddresses = (mnemonic: string): AddressResult[] =>
        generateAddresses({ mnemonic, idCoin: this.idCoin });
    getAccount(publicAddress: string): string {
        if (!isValidAddress(publicAddress)) {
            throw new Error(InvalidAddress);
        }
        if (this.idCoin == Coins.FIO) {
            return getFIOAccount(publicAddress);
        } else {
            throw new Error(NotImplemented);
        }
    }
    generatePublicAddresses(_props: any) {
        throw new Error(NotImplemented);
    }
    getPrivateMasterAddress(_props: any) {
        throw new Error(NotImplemented);
    }
    getPublicMasterAddress(_props: any) {
        throw new Error(NotImplemented);
    }
    isValidExtendedKey = (_props: any): boolean => {
        throw new Error(NotImplemented);
    };
    getSeed(_props: any) {
        throw new Error(NotImplemented);
    }
    getKeyPair(_props: any) {
        throw new Error(NotImplemented);
    }
}

export default ECDSACoin;
