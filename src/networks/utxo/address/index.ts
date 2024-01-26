import { fromSeed } from '../../../core/bip32';
import { mnemonicToSeedSync } from '../../../core/bip39';
import { Network, payments } from 'bitcoinjs-lib';
import tinysecp from 'tiny-secp256k1';
import {
    MasterNodeParams,
    MasterKeyParams,
    AddressParams,
    PublicAddressParams,
    PublicKeyParams,
} from './types';
import ECPairFactory from '../../../core/ecpair';

const ECPair = ECPairFactory(tinysecp);

export const getMasterNode = ({ mnemonic, network }: MasterNodeParams) => {
    const seed = mnemonicToSeedSync(mnemonic);
    return fromSeed(seed, network);
};
export const getPublicMasterKey = ({
    masterNode,
    bipIdCoin,
    protocol = 44,
}: MasterKeyParams) => {
    return getPrivateMasterKey({
        masterNode,
        bipIdCoin,
        protocol,
    }).neutered();
};
export const getPrivateMasterKey = ({
    masterNode,
    bipIdCoin,
    protocol = 44,
}: MasterKeyParams) => {
    return masterNode
        .deriveHardened(protocol)
        .deriveHardened(bipIdCoin)
        .deriveHardened(0);
};

export const getPrivateKey = ({
    privateMasterNode,
    change = 0,
    index = 0,
}: AddressParams) => {
    return privateMasterNode.derive(change).derive(index);
};
export const getPrivateAddress = ({
    privateMasterNode,
    change = 0,
    index = 0,
    network,
}: AddressParams) => {
    const privateKey = getPrivateKey({
        privateMasterNode,
        index,
        change,
        network,
    });
    return ECPair.fromWIF(privateKey.toWIF(), network as Network);
};

export const getPublicKey = ({
    publicMasterNode,
    change = 0,
    index = 0,
}: PublicKeyParams) => {
    return publicMasterNode.derive(change).derive(index).publicKey;
};
export const getPublicAddressSegwit = ({
    publicMasterNode,
    change = 0,
    index = 0,
    network,
}: PublicAddressParams) => {
    const pubkey = getPublicKey({ publicMasterNode, change, index });
    return payments.p2pkh({ pubkey, network: network as Network }).address;
};

export const getPublicAddressP2PKHP2S = ({
    publicMasterNode,
    change = 0,
    index = 0,
    network,
}: PublicAddressParams) => {
    const pubkey = getPublicKey({ publicMasterNode, change, index });
    const redeem = payments.p2pkh({ pubkey, network: network as Network });
    return payments.p2sh({
        redeem,
        network: network as Network,
    }).address;
};
export const getPublicAddressP2PKH = ({
    publicMasterNode,
    change = 0,
    index = 0,
    network,
}: PublicAddressParams) => {
    const pubkey = getPublicKey({ publicMasterNode, change, index });
    return payments.p2pkh({ pubkey, network: network as Network }).address;
};