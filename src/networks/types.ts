import { BIP32Interface, Network } from '../core/bip32';
import { DerivationName } from './constants';
import { CoinIds, Protocol, Coins, Curve } from './registry';
import { Encoding } from './utils/secp256k1';

export type GenerateAddressesParams = {
    mnemonic: string;
    idCoin: Coins;
};
export type GeneratePublicAddressParams = {
    publicNode: BIP32Interface;
    change: number;
    index: number;
    network: Network;
    derivation: string;
};
export type GeneratePublicAddressesParams = {
    publicNode: BIP32Interface;
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
};
export type Derivation = {
    derivations: DerivationParams[];
    bip44: number;
    curve: Curve;
};
