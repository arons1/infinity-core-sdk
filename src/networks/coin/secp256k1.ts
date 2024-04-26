import { BIP32Interface, Network } from 'bitcoinjs-lib';
import { Curve, Protocol } from '../registry';

import {
    AddressResult,
    GeneratePublicAddressesCoinParams,
    PublicAddressResult,
    getPrivateAddressParams,
    getPrivateMasterAddressParams,
    getPrivateMasterKeyParams,
    getPublicAddressParams,
    getPublicMasterAddressParams,
    getPublicMasterKeyParams,
} from '../types';
import {
    getPrivateMasterKey,
    getRootNode,
    getPublicMasterAddress,
    getPrivateMasterAddress,
} from '../utils/secp256k1';
import {
    getPublicAddressP2PKH,
    getPublicAddressP2WPKHP2S,
    getPublicAddressSegwit,
    importMaster,
} from '../utxo';
import networks from '../networks';
import { NotImplemented, ProtocolNotSupported } from '../../errors';
import { getPrivateAddress } from '../evm/address/index';
import { isValidAddress, isValidExtendedKey } from '../utils/utxo';
import {
    generateAddresses,
    generatePublicAddresses,
} from '../generate_address';
import Base from './base';

class SECP256K1Coin extends Base {
    curve = Curve.SECP256K1;
    supportedMethods(): string[] {
        return [
            'getRootNode',
            'getPrivateMasterKey',
            'getPublicMasterKey',
            'getPrivateMasterAddress',
            'getPublicMasterAddress',
            'getPrivateAddress',
            'getPublicAddress',
            'isValidAddress',
            'isValidExtendedKey',
            'generateAddresses',
            'generatePublicAddresses',
        ];
    }

    getRootNode(mnemonic: string): BIP32Interface {
        return getRootNode({ mnemonic, network: networks[this.idCoin] });
    }

    getPrivateMasterKey({
        protocol = 44,
        rootNode,
    }: getPrivateMasterKeyParams): BIP32Interface {
        return getPrivateMasterKey({
            bipIdCoin: this.bipIdCoin,
            protocol,
            rootNode,
        });
    }

    getPublicMasterKey({
        protocol = 44,
        rootNode,
    }: getPublicMasterKeyParams): BIP32Interface {
        return getPrivateMasterKey({
            bipIdCoin: this.bipIdCoin,
            protocol,
            rootNode,
        }).neutered();
    }

    getPrivateMasterAddress({
        privateAccountNode,
        protocol = 44,
    }: getPrivateMasterAddressParams): string {
        return getPrivateMasterAddress({
            privateAccountNode,
            coinId: this.idCoin,
            protocol,
        });
    }

    getPublicMasterAddress({
        publicAccountNode,
        protocol = 44,
    }: getPublicMasterAddressParams): string {
        return getPublicMasterAddress({
            publicAccountNode,
            coinId: this.idCoin,
            protocol,
        });
    }

    getPrivateAddress({
        privateAccountNode,
        change = 0,
        index = 0,
    }: getPrivateAddressParams): string {
        return getPrivateAddress({ privateAccountNode, change, index });
    }

    getPublicAddress = ({
        change = 0,
        index = 0,
        publicAccountNode,
        protocol,
    }: getPublicAddressParams): string | undefined => {
        const network = networks[this.idCoin];
        switch (protocol) {
            case Protocol.SEGWIT:
                return getPublicAddressSegwit({
                    publicAccountNode,
                    change,
                    index,
                    network,
                });
            case Protocol.WRAPPED_SEGWIT:
                return getPublicAddressP2WPKHP2S({
                    publicAccountNode,
                    change,
                    index,
                    network,
                });
            case Protocol.LEGACY:
                return getPublicAddressP2PKH({
                    publicAccountNode,
                    change,
                    index,
                    network,
                });
            default:
                throw new Error(ProtocolNotSupported);
        }
    };
    isValidAddress(address: string): boolean {
        return isValidAddress(address, networks[this.idCoin] as Network);
    }
    isValidExtendedKey(address: string): boolean {
        return isValidExtendedKey(address, networks[this.idCoin] as Network);
    }
    generateAddresses(mnemonic: string): AddressResult[] {
        return generateAddresses({ mnemonic, idCoin: this.idCoin });
    }
    importMaster(privateMasterAddress: string): BIP32Interface {
        return importMaster(
            privateMasterAddress,
            networks[this.idCoin] as Network,
        );
    }
    generatePublicAddresses({
        change = 0,
        index = 0,
        publicAccountNode,
        derivation,
    }: GeneratePublicAddressesCoinParams): PublicAddressResult {
        return generatePublicAddresses({
            change,
            index,
            publicAccountNode,
            idCoin: this.idCoin,
            derivation,
        });
    }
    getSeed(_props: any) {
        throw new Error(NotImplemented);
    }
    getKeyPair(_props: any) {
        throw new Error(NotImplemented);
    }
    getAccount(): string {
        throw new Error(NotImplemented);
    }
}

export default SECP256K1Coin;
