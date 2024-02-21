import nacl from 'tweetnacl';
import { mnemonicToSeedSync, validateMnemonic } from '../../../core/bip39';
import { derivePath } from '../../../core/ed25519';
import sodium from 'libsodium-wrappers'
import {
    DerivationTypeNotSupported,
    InvalidMnemonic,
} from '../../../errors/networks';
import {
    AddressResult,
    GenerateAddressParams,
    Keys,
    PublicKeyEd25519Params,
    RootNodeParams,
} from '../../types';
import { base58 } from '../../../core/base/base58';
import { StrKey } from '../../../core/ed25519/strkey';
import { extractPath } from '../../../utils';
import { fromSeed } from '../../../core/bip32';
/* 
getSecret
    Returns secret
    @param mnemonic: X words phrase
*/
export const getSeed = ({ mnemonic }: RootNodeParams): Buffer => {
    if (!validateMnemonic(mnemonic)) throw new Error(InvalidMnemonic);
    return mnemonicToSeedSync(mnemonic);
};

/* 
getPublicKey
    Returns Public address
    @param seed: seed
    @param protocol: protocol to derivate
    @param bipIdCoin: coin id bip44
*/
export const getPublicKey = ({
    seed,
    path,
}: PublicKeyEd25519Params): Keys => {
    return derivePath(path, seed.toString('hex'));
};

export const getPublicStellarAddress = ({
    publicKey,
}: {
    publicKey: Buffer;
}): string => {
    return StrKey.encodeEd25519PublicKey(publicKey);
};
export const getPublicSolanaAddress = ({
    publicKey,
}: {
    publicKey: Buffer;
}): string => {
    const bytes = new Uint8Array(
        publicKey.buffer,
        publicKey.byteOffset,
        publicKey.byteLength,
    );
    return base58.encode(bytes);
};
export const getPublicXRPAddress = ({
    publicKey,
}: {
    publicKey: Buffer;
}): string => {
    return StrKey.encodeEd25519PublicKey(publicKey);
};
export const getPublicTezosAddress = ({
    publicKey,
}: {
    publicKey: Uint8Array;
}): string => {

    return "tz1"+base58.encode(publicKey);
};
/* 
getPublicKey
    Returns secret key
    @param seed: seed
    @param protocol: protocol to derivate
    @param bipIdCoin: coin id bip44
*/
export const getSecretKey = ({
    seed,
    path,
}: PublicKeyEd25519Params): Uint8Array => {
    const keySecret = derivePath(path, seed.toString('hex'));
    const keyPair = nacl.sign.keyPair.fromSeed(keySecret.key);
    return keyPair.secretKey;
};

export const getSecretAddress = ({
    secretKey,
}: {
    secretKey: Buffer;
}): string => {
    return base58.encode(secretKey);
};

const getKeyPair = (coin:number,path:string,seed:Buffer) : any => {
    if(coin != 144){
        const keySecret = derivePath(path, seed.toString('hex'));
        return nacl.sign.keyPair.fromSeed(keySecret.key);
    }
    else{
        const m = fromSeed(seed);
        return m.derivePath(path);
    }
    
}
//"HSPjuCaHafg3YUfcQy3iVkLL4g639xHBC9FEiQNzmrWZ"
export const generateAddresses = ({
    derivation,
    mnemonic,
}: GenerateAddressParams): AddressResult => {
    const path = extractPath(derivation.path);
    const seed = getSeed({ mnemonic });
    const newAddress = {} as AddressResult;
    const keyPair = getKeyPair(path[1].number,derivation.path,seed);
    switch (derivation.name) {
        case 'legacy':
            switch (path[1].number) {
                case 148:
                    newAddress.privateKey = keyPair?.secretKey;
                    newAddress.privateAddress = getSecretAddress({
                        secretKey: newAddress.privateKey,
                    });
                    newAddress.publicKey = keyPair.publicKey;
                    newAddress.publicAddress = getPublicStellarAddress({
                        publicKey: newAddress.publicKey,
                    });
                    break;
                case 144:
                    newAddress.privateKey = keyPair?.privateKey;
                    newAddress.privateAddress = "00"+keyPair?.privateKey?.toString('hex')?.toUpperCase();
                    newAddress.publicKey = keyPair.publicKey;
                    newAddress.publicAddress = getPublicXRPAddress({
                        publicKey: keyPair.publicKey.toString('hex').toUpperCase(),
                    });
                    break;
                case 501:
                    newAddress.privateKey = keyPair?.secretKey
                    newAddress.privateAddress = getSecretAddress({
                        secretKey: newAddress.privateKey,
                    });
                    newAddress.publicKey = keyPair.publicKey;
                    newAddress.publicAddress = getPublicSolanaAddress({
                        publicKey: newAddress.publicKey,
                    });
                    break;
                case 1729:
                    const keySecret = derivePath(derivation.path, seed.toString('hex'));
                    const kp = sodium.crypto_sign_seed_keypair(keySecret.key.slice(0, 32));
                    newAddress.publicKey = sodium.crypto_generichash(20, kp.publicKey)
                    newAddress.privateKey = kp.privateKey
                    newAddress.privateAddress = "edsk" + base58.encode(kp.privateKey)
                    newAddress.publicAddress = getPublicTezosAddress({
                        publicKey: newAddress.publicKey,
                    });
                    newAddress.publicKeyHash = "edpk" + base58.encode(kp.publicKey)
                    break;
                default:
                    throw new Error(DerivationTypeNotSupported);
            }

            break;
        default:
            throw new Error(DerivationTypeNotSupported);
    }
    return newAddress;
};
