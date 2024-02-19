import { BIP32Interface, Network } from "../core/bip32";

export type GenerateAddressesParams = {
    mnemonic:string
    idCoin:string
}

export type AddressResult = {
    extendedPrivateAddress:string;
    extendedPublicAddress:string;
    privateKey:Buffer;
    privateAddress:string;
    publicKey:Buffer;
    publicAddress:string
}
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
export type PublicAddressParams = {
    publicAccountNode: BIP32Interface;
    change?: number;
    index?: number;
};
