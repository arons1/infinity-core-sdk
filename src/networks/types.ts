import { BIP32Interface, Network } from '../core/bip32';
import { DerivationName, Encoding } from './constants';
import { CoinIds, Protocol, Coins, Curve } from './registry';
import { Keypair } from 'stellar-sdk';

export type GenerateAddressesParams = {
    mnemonic: string;
    idCoin: Coins;
};
export type GeneratePublicAddressParams = {
    publicAccountNode: BIP32Interface;
    change: number;
    index: number;
    network: Network;
    derivation: string;
};
export type GeneratePublicAddressesParams = {
    publicAccountNode: BIP32Interface;
    idCoin: Coins;
    change: number;
    index: number;
    derivation: string;
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
    account?: string;
};
export type PublicAddressResult = {
    publicKey: any;
    publicAddress: string | undefined;
};
export type RootNodeParams = {
    mnemonic: string;
    network?: Network;
};
export type MasterKeyParams = {
    rootNode: BIP32Interface;
    bipIdCoin: CoinIds;
    protocol: Protocol;
};
export type MasterAddressParams = {
    privateAccountNode: BIP32Interface;
    coinId: Coins;
    protocol: Protocol;
};
export type MasterPublicAddressParams = {
    publicAccountNode: BIP32Interface;
    coinId: Coins;
    protocol: Protocol;
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
    name: DerivationName;
    path: string;
    xpub?: Encoding;
    xprv?: Encoding;
    protocol: Protocol;
};
export type Derivation = {
    derivations: DerivationParams[];
    bip44: CoinIds;
    curve: Curve;
    network: Network;
};
export type getPublicAddressED25519Params = {
    keyPair: any;
};
export type getPrivateAddressED25519Params = getPublicAddressED25519Params;
export type getPrivateMasterKeyParams = {
    protocol?: Protocol;
    rootNode: BIP32Interface;
};
export type GetSeedParams = {
    mnemonic: string;
};
export type getAccountParams = {
    keyPair: Keypair;
};
export type getPublicMasterKeyParams = getPrivateMasterKeyParams;
export type getPublicMasterAddressParams = {
    protocol?: Protocol;
    publicAccountNode: BIP32Interface;
};
export type getPrivateMasterAddressParams = {
    protocol?: Protocol;
    change?: number;
    index?: number;
    privateAccountNode: BIP32Interface;
};

export type getPublicAddressParams = {
    change?: number;
    index?: number;
    publicAccountNode: BIP32Interface;
    protocol?: Protocol;
};
export type getPrivateAddressParams = {
    change?: number;
    index?: number;
    privateAccountNode: BIP32Interface;
};
