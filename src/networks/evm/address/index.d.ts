/// <reference types="node" />
import { MasterNodeParams, MasterKeyParams, AddressParams } from './types';
export declare const getMasterNode: ({ mnemonic, network }: MasterNodeParams) => import("../../../core/bip32").BIP32Interface;
export declare const getPublicMasterKey: ({ masterNode, bipIdCoin, protocol, }: MasterKeyParams) => import("../../../core/bip32").BIP32Interface;
export declare const getPrivateMasterKey: ({ masterNode, bipIdCoin, protocol, }: MasterKeyParams) => import("../../../core/bip32").BIP32Interface;
export declare const getPrivateKey: ({ privateMasterNode, change, index, }: AddressParams) => string;
export declare const getPublicKey: ({ privateMasterNode, change, index, }: AddressParams) => Buffer;
