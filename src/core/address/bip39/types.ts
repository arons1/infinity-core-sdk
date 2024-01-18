import {bip32,Network} from 'bitcoinjs-lib'

export type NewAddress = {
    masterNode:bip32.BIP32Interface;
    account:number;
    index:number,
    change:number
}
export type MasterNodeParams = {
    mnemonic:number;
    network:Network
}
export type MasterKeyParams = {
    masterNode:bip32.BIP32Interface;
    bipIdCoin:number;
    protocol: number;
}
