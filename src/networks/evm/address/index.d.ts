/// <reference types="node" />
import { MasterNodeParams, MasterKeyParams, AddressParams, PublicAddressParams } from './types';
export declare const getMasterNode: ({ mnemonic, network }: MasterNodeParams) => import("../../../core/bip32").BIP32Interface;
export declare const getPublicMasterKey: ({ masterNode, bipIdCoin, protocol, }: MasterKeyParams) => import("../../../core/bip32").BIP32Interface;
export declare const getPrivateMasterKey: ({ masterNode, bipIdCoin, protocol, }: MasterKeyParams) => import("../../../core/bip32").BIP32Interface;
export declare const getPrivateKey: ({ privateMasterNode, change, index, }: AddressParams) => Buffer | undefined;
export declare const getPrivateAddress: ({ privateMasterNode, change, index, }: AddressParams) => string;
export declare const getPublicKey: ({ publicMasterNode, change, index, }: PublicAddressParams) => Buffer;
export declare const getPublicAddress: ({ publicMasterNode, change, index, }: PublicAddressParams) => string;
