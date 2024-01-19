import {mnemonicToSeedSync,fromSeed} from '../../../core'
import {keccak256} from '../../../core/base'
import {privateToAddress} from '../sdk/ethereumjs-util';
import {MasterNodeParams,MasterKeyParams,AddressParams} from './types'

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
    protocol = 44
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
    protocol = 44
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