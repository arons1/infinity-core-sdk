import {mnemonicToSeedSync,fromSeed,Network,BIP32Interface} from '../../../core'
import {keccak256} from '../../../core/base'
import {privateToAddress} from '../sdk/ethereumjs-util';

export type MasterNodeParams = {
    mnemonic:string;
    network:Network
}
export type MasterKeyParams = {
    masterNode:BIP32Interface;
    bipIdCoin:number;
    protocol:number;
}
export type AddressParams = {
    privateMasterNode:BIP32Interface;
    change:number;
    index:number;
}
export const getMasterNode = ({
    mnemonic,
    network
}: MasterNodeParams) => {
    const seed = mnemonicToSeedSync(mnemonic);
    return fromSeed(seed, network);
}
export const getPublicMasterKey = ({
    masterNode,
    bipIdCoin,
    protocol = 39
}:MasterKeyParams) => {
    return getPrivateMasterKey({
        masterNode,
        bipIdCoin,
        protocol
    }).neutered();
}
export const getPrivateMasterKey = ({
    masterNode,
    bipIdCoin,
    protocol = 39
}:MasterKeyParams) => {
    return masterNode.deriveHardened(protocol)
    .deriveHardened(bipIdCoin)
    .deriveHardened(0);
}

export const getPrivateKey = ({
    privateMasterNode,
    change = 0,
    index = 0
}:AddressParams) => {
    return "0x"+ privateMasterNode.derive(change).derive(index).privateKey.toString('hex')
}

export const getPublicKey = ({
    privateMasterNode,
    change = 0,
    index = 0
}:AddressParams) => {
    return privateToAddress(privateMasterNode.derive(change).derive(index).privateKey)
}