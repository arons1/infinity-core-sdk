import { BIP32Interface, Network } from 'bitcoinjs-lib';
import { Protocol } from '../registry';

import {
    AddressResult,
    GeneratePublicAddressesParams,
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
} from '../utxo';
import networks from '../networks';
import { ProtocolNotSupported } from '../../errors';
import { getPrivateAddress } from '../evm/address/index';
import { isValidAddress, isValidExtendedKey } from '../utils/utxo';
import {
    generateAddresses,
    generatePublicAddresses,
} from '../generate_address';
import Base from './base';

class ECDSABase extends Base{
        getRootNode = (mnemonic: string): BIP32Interface =>
            getRootNode({ mnemonic, network: networks[this.idCoin] })
        getPrivateMasterKey = ({
            protocol,
            rootNode,
        }: getPrivateMasterKeyParams): BIP32Interface =>
            getPrivateMasterKey({ bipIdCoin:this.bipIdCoin, protocol, rootNode })
        getPublicMasterKey = ({
            protocol,
            rootNode,
        }: getPublicMasterKeyParams): BIP32Interface =>
            getPrivateMasterKey({
                bipIdCoin:this.bipIdCoin,
                protocol,
                rootNode,
            }).neutered()
        getPrivateMasterAddress = ({
            privateAccountNode,
            protocol,
        }: getPrivateMasterAddressParams): string =>
            getPrivateMasterAddress({
                privateAccountNode,
                coinId: this.idCoin,
                protocol,
            })
        getPublicMasterAddress = ({
            publicAccountNode,
            protocol,
        }: getPublicMasterAddressParams): string =>
            getPublicMasterAddress({
                publicAccountNode,
                coinId: this.idCoin,
                protocol,
            })
        getPrivateAddress = ({
            privateAccountNode,
            change = 0,
            index = 0,
        }: getPrivateAddressParams): string =>
            getPrivateAddress({ privateAccountNode, change, index })
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
        }
        isValidAddress = (address: string): boolean =>
            isValidAddress(address, networks[this.idCoin] as Network)
        isValidExtendedKey = (address: string): boolean =>
            isValidExtendedKey(address, networks[this.idCoin] as Network)
        generateAddresses = (mnemonic: string): AddressResult[] =>
            generateAddresses({ mnemonic, idCoin: this.idCoin })
        generatePublicAddresses = ({
            change,
            index,
            publicAccountNode,
            derivation,
        }: GeneratePublicAddressesParams): PublicAddressResult =>
            generatePublicAddresses({
                change,
                index,
                publicAccountNode,
                idCoin: this.idCoin,
                derivation,
            })
 
};

export default ECDSABase;
