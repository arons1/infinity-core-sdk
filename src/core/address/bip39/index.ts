import bip39 from 'bip39'
import {bip32,Network} from 'bitcoinjs-lib'
import {
    MasterNodeParams,
    MasterKeyParams
} from './types'

class Bip39 {
    getMasterNode = ({
        mnemonic,
        network
    }: MasterNodeParams) => {
        const seed = bip39.mnemonicToSeedSync(mnemonic);
        return bip32.fromSeed(seed, network);
    }
    getPublicMasterKey = ({
        root,
        bipIdCoin,
        protocol = 39
    }:MasterKeyParams) => {
        return root.deriveHardened(protocol)
        .deriveHardened(bipIdCoin)
        .deriveHardened(0).neutered().toBase58();
    }
    getPrivateMasterKey = ({
        root,
        bipIdCoin,
        protocol = 39
    }:MasterKeyParams) => {
        return root.deriveHardened(protocol)
        .deriveHardened(bipIdCoin)
        .deriveHardened(0).toBase58();
    }
}

export default Bip39