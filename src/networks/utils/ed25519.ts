import nacl from "tweetnacl";
import { mnemonicToSeedSync, validateMnemonic } from "../../core/bip39";
import { derivePath } from "../../core/ed25519";

import { InvalidMnemonic } from "../../errors/networks";
import { PublicKeyEd25519Params, RootNodeParams } from "../types";
import { base58 } from "../../core/base/base58";
/* 
getRootNode
    Returns root node
    @param mnemonic: X words phrase
    @param network: Network for this node
*/
export const getSecret = ({
    mnemonic
}: RootNodeParams): Buffer => {
    if (!validateMnemonic(mnemonic)) throw new Error(InvalidMnemonic);
    return mnemonicToSeedSync(mnemonic);
};

/* 
getPublicKey
    Returns Public address
    @param publicAccountNode: Account Extended Public Node
    @param change: account change derivation
    @param index: account index derivation
*/
export const getPublicKey = ({
    secret,
    protocol,
    bipIdCoin
}: PublicKeyEd25519Params): Buffer => {
    const keySecret = derivePath(`m/${protocol}'/${bipIdCoin}'/0'`, secret.toString('hex'));
    const keyPair = nacl.sign.keyPair.fromSeed(keySecret.key);
    const signPk = keyPair.secretKey.subarray(32);
    const zero = Buffer.alloc(1, 0);
    return Buffer.concat([zero, Buffer.from(signPk)])
};

/* 
getPublicKey
    Returns Public address
    @param publicAccountNode: Account Extended Public Node
    @param change: account change derivation
    @param index: account index derivation
*/
export const getSecretKey = ({
    secret,
    protocol,
    bipIdCoin
}: PublicKeyEd25519Params): string => {
    const keySecret = derivePath(`m/${protocol}'/${bipIdCoin}'/0'`, secret.toString('hex'));
    const keyPair = nacl.sign.keyPair.fromSeed(keySecret.key);
    return base58.encode(keyPair.secretKey)
};