import nacl from 'tweetnacl';
import { mnemonicToSeedSync, validateMnemonic } from '../../../core/bip39';
import { derivePath } from '../../../core/ed25519';

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
    protocol,
    bipIdCoin,
}: PublicKeyEd25519Params): Buffer => {
    const keySecret = derivePath(
        `m/${protocol}'/${bipIdCoin}'/0'`,
        seed.toString('hex'),
    );
    const naclKeys = nacl.sign.keyPair.fromSeed(keySecret.key);
    return Buffer.from(naclKeys.publicKey);
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
    return StrKey.encodeEd25519PublicKey(publicKey);
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
    publicKey: Buffer;
}): string => {
    return StrKey.encodeEd25519PublicKey(publicKey);
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
    protocol,
    bipIdCoin,
}: PublicKeyEd25519Params): Uint8Array => {
    const keySecret = derivePath(
        `m/${protocol}'/${bipIdCoin}'/0'`,
        seed.toString('hex'),
    );
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
//"GDQEWSVP7QQWXY5MSFEVRPEPD5NMJHK6ACW4RHZMZAGA6CK6HU7OESPK"
export const generateAddresses = ({
    derivation,
    mnemonic,
}: GenerateAddressParams): AddressResult => {
    const path = extractPath(derivation.path);
    const seed = getSeed({ mnemonic });
    const newAddress = {} as AddressResult;
    newAddress.privateKey = Buffer.from(
        getSecretKey({
            seed,
            bipIdCoin: path[1].number,
            protocol: path[0].number,
        }),
    );
    newAddress.privateAddress = getSecretAddress({
        secretKey: newAddress.privateKey,
    });
    switch (derivation.name) {
        case 'legacy':
            newAddress.publicKey = getPublicKey({
                seed,
                bipIdCoin: path[1].number,
                protocol: path[0].number,
            });
            switch (path[1].number) {
                case 148:
                    newAddress.publicAddress = getPublicStellarAddress({
                        publicKey: newAddress.publicKey,
                    });
                    break;
                case 144:
                    newAddress.publicAddress = getPublicXRPAddress({
                        publicKey: newAddress.publicKey,
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
