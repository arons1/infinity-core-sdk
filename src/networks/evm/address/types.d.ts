import { Network, BIP32Interface } from '../../../core/bip32';
export type MasterNodeParams = {
    mnemonic: string;
    network: Network;
};
export type MasterKeyParams = {
    masterNode: BIP32Interface;
    bipIdCoin: number;
    protocol: number;
};
export type AddressParams = {
    privateMasterNode: BIP32Interface;
    change?: number;
    index?: number;
};
export type PublicAddressParams = {
    publicMasterNode: BIP32Interface;
    change?: number;
    index?: number;
};
