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
    return deriveAddress(publicKey.toString('hex').toUpperCase());
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
export const getPrivateKey = ({ keyPair }: { keyPair: any }) => {
    return keyPair?.privateKey ?? keyPair?.privateKey;
};
export const getTezosPublicKeyHash = ({ keyPair }: { keyPair: any }) => {
    return b58cencode(keyPair.publicKey, new Uint8Array([13, 15, 37, 217]));
};
export const getPublicTezosAddress = ({
    publicKey,
}: {
    publicKey: Uint8Array;
}): string => {
    return b58cencode(publicKey, new Uint8Array([6, 161, 159]));
};
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
        case 'legacy':
            switch (path[1].number) {
                case 148:
                    newAddress.publicAddress = getPublicStellarAddress({
                        publicKey: newAddress.publicKey,
                    });
                    break;
                case 144:
                    newAddress.publicAddress = getPublicXRPAddress({
                        publicKey: keyPair.publicKey,
                    });
                    break;
                case 501:
                    newAddress.publicAddress = getPublicSolanaAddress({
                        publicKey: newAddress.publicKey,
                    });
                    break;
                case 1729:
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

            break;
        default:
            throw new Error(DerivationTypeNotSupported);
    }
    return newAddress;
};
