import { BIP32Interface, Network } from '../core/bip32';

export type GenerateAddressesParams = {
    mnemonic: string;
    idCoin: string;
};
export type GeneratePublicAddressParams = {
    publicNode: BIP32Interface;
    change: number;
    index: number;
    network: Network;
    derivation: DerivationParams;
};
export type GeneratePublicAddressesParams = {
    publicNode: BIP32Interface;
    idCoin: string;
    change: number;
    index: number;
};
export type AddressResult = {
    extendedPrivateAddress: string | undefined;
    extendedPublicAddress: string | undefined;
    privateKey: any;
    privateAddress: string | undefined;
    publicKey: any;
    publicAddress: string | undefined;
    extendedNode: BIP32Interface | undefined;
    publicKeyHash?: string;
};
export type RootNodeParams = {
    mnemonic: string;
    network?: Network;
};
export type MasterKeyParams = {
    rootNode: BIP32Interface;
    bipIdCoin: number;
    protocol: number;
};
export type Keys = {
    key: Buffer;
    chainCode: Buffer;
};
export type PublicKeyEd25519Params = {
    seed: Buffer;
    path: string;
};
export type AddressParams = {
    privateAccountNode: BIP32Interface;
    change?: number;
    index?: number;
    network?: Network;
};
export type PublicAddressParams = {
    publicAccountNode: BIP32Interface;
    change?: number;
    index?: number;
    network?: Network;
};
export type RedemParams = {
    publicKey: Buffer;
    change?: number;
    index?: number;
    network?: Network;
};
export type GenerateAddressParams = {
    mnemonic: string;
    network: Network;
    derivation: DerivationParams;
};
export type DerivationParams = {
    name: string;
    path: string;
    xpub?: string;
    xprv?: string;
};
export type Derivation = {
    derivations: DerivationParams[];
    bip44: number;
    curve: string;
};
