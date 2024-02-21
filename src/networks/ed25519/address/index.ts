import nacl from 'tweetnacl';
import { mnemonicToSeedSync, validateMnemonic } from '../../../core/bip39';
import { derivePath } from '../../../core/ed25519';
import sodium from 'libsodium-wrappers';
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
export const getPublicTezosAddress = ({
    publicKey,
}: {
    publicKey: Uint8Array;
}): string => {
    return 'tz1' + base58.encode(publicKey);
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
        return 'edsk' + base58.encode(secretKey);
    } else {
        return base58.encode(secretKey);
    }
};

export const getKeyPair = (coin: number, path: string, seed: Buffer): any => {
    if (coin == 144) {
        const m = fromSeed(seed);
        return m.derivePath(path);
    } else if (coin == 1729) {
        const keySecret = derivePath(path, seed.toString('hex'));
        return sodium.crypto_sign_seed_keypair(keySecret.key.slice(0, 32));
    } else {
        const keySecret = derivePath(path, seed.toString('hex'));
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
        return sodium.crypto_generichash(20, keyPair.publicKey);
    }
    return keyPair.publicKey;
};
export const getPrivateKey = ({ keyPair }: { keyPair: any }) => {
    return keyPair?.privateKey ?? keyPair?.privateKey;
};
export const getTezosPublicKeyHash = ({ keyPair }: { keyPair: any }) => {
    return 'edpk' + base58.encode(keyPair.publicKey);
};
//"HSPjuCaHafg3YUfcQy3iVkLL4g639xHBC9FEiQNzmrWZ"
export const generateAddresses = ({
    derivation,
    mnemonic,
}: GenerateAddressParams): AddressResult => {
    const path = extractPath(derivation.path);
    const seed = getSeed({ mnemonic });
    const newAddress = {} as AddressResult;
    const keyPair = getKeyPair(path[1].number, derivation.path, seed);
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
