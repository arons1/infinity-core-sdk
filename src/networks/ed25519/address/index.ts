import nacl from 'tweetnacl';
import { mnemonicToSeedSync, validateMnemonic } from '../../../core/bip39';
import { derivePath } from '../../../core/ed25519';
import { deriveAddress } from 'ripple-keypairs';
import {
    CoinNotSupported,
    DerivationTypeNotSupported,
    DerivePathError,
    InvalidMnemonic,
    InvalidPublicKey,
    InvalidSecret,
    InvalidSeed,
} from '../../../errors/networks';
import {
    AddressResult,
    GenerateAddressParams,
    PublicKeyEd25519Params,
    RootNodeParams,
} from '../../types';
import { b58cencode, base58 } from '../../../core/base/base58';
import { StrKey } from '../../../core/ed25519/strkey';
import { extractPath } from '../../../utils';
import { fromSeed } from '../../../core/bip32';
import { blake2b } from '@noble/hashes/blake2b';
import { Keypair } from 'stellar-sdk';
import { Prefix, prefix } from '../../utils/tezos';
import {
    GetKeyPairParams,
    GetPrivateKeyParams,
    GetPublicKeyParams,
    GetTezosPublicKeyParams,
} from './types';
import { isValidPath } from '../../utils/secp256k1';
import { SupportedNetworks } from '../general';
import { DerivationName } from '../../constants';
import { CoinIds } from '../../registry';

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
getPublicStellarAddress
    Returns stellar public address
    @param publicKey: public key
*/
export const getPublicStellarAddress = ({
    publicKey,
}: {
    publicKey: Buffer;
}): string => {
    if (!Buffer.isBuffer(publicKey)) throw new Error(InvalidPublicKey);
    return StrKey.encodeEd25519PublicKey(publicKey);
};
/* 
getPublicSolanaAddress
    Returns Solana public address
    @param publicKey: public key
*/
export const getPublicSolanaAddress = ({
    publicKey,
}: {
    publicKey: Buffer;
}): string => {
    if (!Buffer.isBuffer(publicKey)) throw new Error(InvalidPublicKey);
    const bytes = new Uint8Array(
        publicKey.buffer,
        publicKey.byteOffset,
        publicKey.byteLength,
    );
    return base58.encode(bytes);
};
/* 
getPublicXRPAddress
    Returns XRP public address
    @param publicKey: public key
*/
export const getPublicXRPAddress = ({
    publicKey,
}: {
    publicKey: Buffer;
}): string => {
    if (!Buffer.isBuffer(publicKey)) throw new Error(InvalidPublicKey);
    return deriveAddress(publicKey.toString('hex').toUpperCase());
};

/* 
getSecretKey
    Returns secret key
    @param seed: seed
    @param path: derivation path
*/
export const getSecretKey = ({
    seed,
    path,
}: PublicKeyEd25519Params): Uint8Array | Buffer => {
    if (!isValidPath(path)) throw new Error(DerivePathError);
    if (!Buffer.isBuffer(seed)) throw new Error(InvalidSeed);
    const keySecret = derivePath(path, seed.toString('hex'));
    if (path.includes("/148'/")) {
        const keyPairSecret = Keypair.fromRawEd25519Seed(keySecret.key);
        return Buffer.concat([
            keyPairSecret.rawSecretKey(),
            keyPairSecret.rawPublicKey(),
        ]);
    }
    const keyPair = nacl.sign.keyPair.fromSeed(keySecret.key);
    return keyPair.secretKey;
};
/* 
getSecretAddress
    Returns secret address
    @param secretKey: secret key
    @param coinId: bip44 coin id
*/
export const getSecretAddress = ({
    secretKey,
    bipIdCoin,
}: {
    secretKey: Buffer;
    bipIdCoin: CoinIds;
}): string => {
    if (!Buffer.isBuffer(secretKey)) throw new Error(InvalidSecret);
    if (SupportedNetworks.find(a => a == bipIdCoin) == undefined)
        throw new Error(CoinNotSupported);
    if (bipIdCoin == CoinIds.XRP) {
        return '00' + secretKey.toString('hex').toUpperCase();
    } else if (bipIdCoin == CoinIds.STELLAR) {
        return StrKey.encodeEd25519SecretSeed(secretKey);
    } else if (bipIdCoin == CoinIds.TEZOS) {
        return b58cencode(secretKey, prefix[Prefix.EDSK]);
    } else {
        return base58.encode(secretKey);
    }
};
/* 
getKeyPair
    Returns key pair
    @param path: derivation path
    @param seed: seed
*/
export const getKeyPair = ({ path, seed }: GetKeyPairParams): any => {
    if (!isValidPath(path)) throw new Error(DerivationTypeNotSupported);
    const coin = extractPath(path)[1].number;
    if (SupportedNetworks.find(a => a == coin) == undefined)
        throw new Error(CoinNotSupported);
    if (coin == CoinIds.XRP) {
        const m = fromSeed(seed);
        return m.derivePath(path);
    } else {
        const keySecret = derivePath(path, seed.toString('hex'));
        if (coin == CoinIds.STELLAR)
            return Keypair.fromRawEd25519Seed(keySecret.key);
        else return nacl.sign.keyPair.fromSeed(keySecret.key);
    }
};
/* 
getPublicKey
    Returns public key
    @param keyPair: key pair
    @param coinId: bip44 coin id
*/
export const getPublicKey = ({ keyPair, bipIdCoin }: GetPublicKeyParams) => {
    if (SupportedNetworks.find(a => a == bipIdCoin) == undefined)
        throw new Error(CoinNotSupported);
    if (bipIdCoin == CoinIds.TEZOS) {
        return blake2b(keyPair.publicKey, { dkLen: 20 });
    } else if (bipIdCoin == 148) return keyPair.rawPublicKey();
    return keyPair.publicKey;
};
/* 
getPrivateKey
    Returns private key
    @param keyPair: key pair
*/
export const getPrivateKey = ({ keyPair }: GetPrivateKeyParams) => {
    return keyPair?.secretKey ?? keyPair?.privateKey ?? keyPair.rawSecretKey();
};
/* 
getTezosPublicKeyHash
    Returns tezos public key hash
    @param keyPair: key pair
*/
export const getTezosPublicKeyHash = ({ keyPair }: GetTezosPublicKeyParams) => {
    return b58cencode(keyPair.publicKey, prefix[Prefix.EDPK]);
};
/* 
getTezosPublicAddress
    Returns tezos public address
    @param publicKey: public key
*/
export const getPublicTezosAddress = ({
    publicKey,
}: {
    publicKey: Uint8Array;
}): string => {
    return b58cencode(publicKey, prefix[Prefix.TZ1]);
};
/* 
generateAddresses
    Returns addresses and private keys
    @param derivation: derivation object
    @param mnemonic: mnemonic
*/
export const generateAddresses = ({
    derivation,
    mnemonic,
}: GenerateAddressParams): AddressResult => {
    if (!isValidPath(derivation.path))
        throw new Error(DerivationTypeNotSupported);
    const path = extractPath(derivation.path);
    if (SupportedNetworks.find(a => a == path[1].number) == undefined)
        throw new Error(CoinNotSupported);
    const seed = getSeed({ mnemonic });
    const newAddress = {} as AddressResult;
    const keyPair = getKeyPair({
        path: derivation.path,
        seed,
    });
    newAddress.publicKey = getPublicKey({ keyPair, bipIdCoin: path[1].number });
    newAddress.privateKey = getPrivateKey({ keyPair });
    newAddress.privateAddress = getSecretAddress({
        secretKey: newAddress.privateKey,
        bipIdCoin: path[1].number,
    });
    switch (derivation.name) {
        case DerivationName.STELLAR:
            newAddress.publicAddress = getPublicStellarAddress({
                publicKey: newAddress.publicKey,
            });
            break;
        case DerivationName.XRP:
            newAddress.publicAddress = getPublicXRPAddress({
                publicKey: newAddress.publicKey,
            });
            break;
        case DerivationName.SOLANA:
            newAddress.publicAddress = getPublicSolanaAddress({
                publicKey: newAddress.publicKey,
            });
            break;
        case DerivationName.TEZOS:
            newAddress.publicAddress = getPublicTezosAddress({
                publicKey: newAddress.publicKey,
            });
            newAddress.publicKeyHash = getTezosPublicKeyHash({
                keyPair,
            });
            break;
        default:
            throw new Error(DerivationTypeNotSupported);
    }
    return newAddress;
};
