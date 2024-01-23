import { fromSeed } from '../../../core/bip32';
import { mnemonicToSeedSync } from '../../../core/bip39';
import { publicToAddress, toChecksumAddress } from '../sdk/ethereumjs-util';
import {
    MasterNodeParams,
    MasterKeyParams,
    AddressParams,
    PublicAddressParams,
} from './types';

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
    return (
        '0x' +
        privateMasterNode
            .derive(change)
            .derive(index)
            .privateKey?.toString('hex')
    );
};

export const getPublicKey = ({
    publicMasterNode,
    change = 0,
    index = 0,
}: PublicAddressParams) => {
    const address =
        '0x' +
        publicToAddress(
            publicMasterNode.derive(change).derive(index).publicKey,
            true,
        ).toString('hex');
    return toChecksumAddress(address);
};
