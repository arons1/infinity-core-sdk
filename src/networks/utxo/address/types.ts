import { Network, BIP32Interface } from '../../../core/bip32';

export type RootNodeParams = {
    mnemonic: string;
    network: Network;
};
export type MasterKeyParams = {
    rootNode: BIP32Interface;
    bipIdCoin: number;
    protocol: number;
};
export type AddressParams = {
    privateAccountNode: BIP32Interface;
    change?: number;
    index?: number;
    network: Network;
};
export type PublicKeyParams = {
    publicAccountNode: BIP32Interface;
    change?: number;
    index?: number;
};
export type PublicAddressParams = {
    publicAccountNode: BIP32Interface;
    change?: number;
    index?: number;
    network: Network;
};
