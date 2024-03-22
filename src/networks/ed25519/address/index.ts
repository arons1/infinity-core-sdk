import nacl from 'tweetnacl';
import { mnemonicToSeedSync, validateMnemonic } from '../../../core/bip39';
import { derivePath } from '../../../core/ed25519';
import { deriveAddress } from 'ripple-keypairs';
import {
    DerivationTypeNotSupported,
    InvalidMnemonic,
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
}: PublicKeyEd25519Params): Uint8Array => {
    const keySecret = derivePath(path, seed.toString('hex'));
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
    coinId,
}: {
    secretKey: Buffer;
    coinId: number;
}): string => {
    if (coinId == 148) {
        return '00' + secretKey.toString('hex')?.toUpperCase();
    } else if (coinId == 1729) {
        return b58cencode(secretKey, new Uint8Array([43, 246, 78, 7]));
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
export const getKeyPair = ({
    path,
    seed,
}: {
    path: string;
    seed: Buffer;
}): any => {
    const coin = extractPath(path)[1].number;
    if (coin == 144) {
        const m = fromSeed(seed);
        return m.derivePath(path);
    } else {
        const keySecret = derivePath(path, seed.toString('hex'));
        if (coin == 1729) {
            return nacl.sign.keyPair.fromSeed(keySecret.key);
        }
        return nacl.sign.keyPair.fromSeed(keySecret.key);
    }
};
/* 
getPublicKey
    Returns public key
    @param keyPair: key pair
    @param coinId: bip44 coin id
*/
export const getPublicKey = ({
    keyPair,
    coinId,
}: {
    keyPair: any;
    coinId: number;
}) => {
    if (coinId == 1729) {
        return blake2b(keyPair.publicKey, { dkLen: 20 });
    }
    return keyPair.publicKey;
};
/* 
getPrivateKey
    Returns private key
    @param keyPair: key pair
*/
export const getPrivateKey = ({ keyPair }: { keyPair: any }) => {
    return keyPair?.secretKey ?? keyPair?.privateKey;
};
/* 
getTezosPublicKeyHash
    Returns tezos public key hash
    @param keyPair: key pair
*/
export const getTezosPublicKeyHash = ({ keyPair }: { keyPair: any }) => {
    return b58cencode(keyPair.publicKey, new Uint8Array([13, 15, 37, 217]));
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
    return b58cencode(publicKey, new Uint8Array([6, 161, 159]));
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
    const path = extractPath(derivation.path);
    const seed = getSeed({ mnemonic });
    const newAddress = {} as AddressResult;
    const keyPair = getKeyPair({
        path: derivation.path,
        seed,
    });
    newAddress.publicKey = getPublicKey({ keyPair, coinId: path[1].number });
    newAddress.privateKey = getPrivateKey({ keyPair });
    newAddress.privateAddress = getSecretAddress({
        secretKey: newAddress.privateKey,
        coinId: path[1].number,
    });
    switch (derivation.name) {
        case 'stellar':
            newAddress.publicAddress = getPublicStellarAddress({
                publicKey: newAddress.publicKey,
            });
            break;
        case 'xrp':
            newAddress.publicAddress = getPublicXRPAddress({
                publicKey: newAddress.publicKey,
            });
            break;
        case 'solana':
            newAddress.publicAddress = getPublicSolanaAddress({
                publicKey: newAddress.publicKey,
            });
            break;
        case 'tezos':
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
