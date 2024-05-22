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
import { CoinIds, Protocol } from '../../registry';

/**
 * Retrieves the seed from the given mnemonic.
 *
 * @param {RootNodeParams} mnemonic - The mnemonic to generate the seed from.
 * @return {Buffer} The generated seed.
 */
export const getSeed = ({ mnemonic }: RootNodeParams): Buffer => {
    if (!validateMnemonic(mnemonic)) throw new Error(InvalidMnemonic);
    return mnemonicToSeedSync(mnemonic);
};

/**
 * Returns the Stellar public address corresponding to the given public key.
 *
 * @param {Object} params - The parameters for generating the Stellar public address.
 * @param {Buffer} params.publicKey - The public key for which the address is generated.
 * @throws {Error} Throws an error if the public key is not a Buffer.
 * @return {string} The Stellar public address corresponding to the public key.
 */
export const getPublicStellarAddress = ({
    publicKey,
}: {
    publicKey: Buffer;
}): string => {
    if (!Buffer.isBuffer(publicKey)) throw new Error(InvalidPublicKey);
    return StrKey.encodeEd25519PublicKey(publicKey);
};

/**
 * Returns the Solana public address corresponding to the given public key.
 *
 * @param {Buffer} publicKey - The public key for which the address is generated.
 * @return {string} The Solana public address.
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

/**
 * Retrieves the XRP address corresponding to the given public key.
 *
 * @param {Object} params - The parameters for generating the XRP address.
 * @param {Buffer} params.publicKey - The public key for which the address is generated.
 * @throws {Error} Throws an error if the public key is not a Buffer.
 * @return {string} The XRP address corresponding to the public key.
 */
export const getPublicXRPAddress = ({
    publicKey,
}: {
    publicKey: Buffer;
}): string => {
    if (!Buffer.isBuffer(publicKey)) throw new Error(InvalidPublicKey);
    return deriveAddress(publicKey.toString('hex').toUpperCase());
};

/**
 * Retrieves the secret key based on the provided seed and path.
 *
 * @param {PublicKeyEd25519Params} params - An object containing the seed and path.
 * @param {Buffer} params.seed - The seed.
 * @param {string} params.path - The derivation path.
 * @param {number} params.walletAccount - The wallet account.
 * @throws {Error} Throws an error if the path is not valid or the seed is not a buffer.
 * @return {Uint8Array | Buffer} Returns the secret key as a Uint8Array or Buffer.
 */
export const getSecretKey = ({
    seed,
    path,
    walletAccount,
}: PublicKeyEd25519Params): Uint8Array | Buffer => {
    path = path.replace('ACCOUNT', walletAccount + '');
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

/**
 * Returns the secret address for a given secret key and coin ID.
 *
 * @param {Object} params - An object containing the secret key and coin ID.
 * @param {Buffer} params.secretKey - The secret key.
 * @param {CoinIds} params.bipIdCoin - The coin ID.
 * @throws {Error} Throws an error if the coin ID is not supported.
 * @return {string} The secret address.
 */

export const getSecretAddress = ({
    secretKey,
    bipIdCoin,
}: {
    secretKey: Buffer;
    bipIdCoin: CoinIds;
}): string => {
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

/**
 * Generates a key pair based on the provided path and seed.
 *
 * @param {GetKeyPairParams} params - An object containing the path and seed.
 * @param {string} params.path - The derivation path.
 * @param {Buffer} params.seed - The seed.
 * @param {number} params.walletAccount - The wallet account ID.
 * @throws {Error} Throws an error if the path is not valid or the coin is not supported.
 * @return {any} Returns the generated key pair.
 */
export const getKeyPair = ({
    path,
    seed,
    walletAccount,
}: GetKeyPairParams): any => {
    path = path.replace('ACCOUNT', walletAccount + '');
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

/**
 * Returns the public key from the given key pair. If the coin ID is not supported, an error is thrown.
 * If the coin ID is TEZOS, the public key is hashed using blake2b with a digest length of 20.
 * If the coin ID is 148, the raw public key is returned. Otherwise, the public key is returned as is.
 *
 * @param {GetPublicKeyParams} params - An object containing the key pair and the coin ID.
 * @param {KeyPair} params.keyPair - The key pair from which to extract the public key.
 * @param {CoinIds} params.bipIdCoin - The coin ID used to determine how to extract the public key.
 * @throws {Error} Throws an error if the coin ID is not supported.
 * @return {Buffer | Uint8Array} The extracted public key.
 */
export const getPublicKey = ({ keyPair, bipIdCoin }: GetPublicKeyParams) => {
    if (SupportedNetworks.find(a => a == bipIdCoin) == undefined)
        throw new Error(CoinNotSupported);
    if (bipIdCoin == CoinIds.TEZOS) {
        return blake2b(keyPair.publicKey, { dkLen: 20 });
    } else if (bipIdCoin == 148) return keyPair.rawPublicKey();
    return keyPair.publicKey;
};

/**
 * Returns the private key from the key pair if available, otherwise returns the raw secret key.
 *
 * @param {GetPrivateKeyParams} keyPair - The key pair object.
 * @return {Uint8Array | Buffer} The private key or raw secret key.
 */
export const getPrivateKey = ({ keyPair }: GetPrivateKeyParams) => {
    return keyPair?.secretKey ?? keyPair?.privateKey ?? keyPair.rawSecretKey();
};

/**
 * Returns the base58-encoded Tezos public key hash of the given key pair.
 *
 * @param {GetTezosPublicKeyParams} params - An object containing the key pair.
 * @param {Keypair} params.keyPair - The key pair to generate the public key hash from.
 * @return {string} The base58-encoded Tezos public key hash.
 */
export const getTezosPublicKeyHash = ({ keyPair }: GetTezosPublicKeyParams) => {
    return b58cencode(keyPair.publicKey, prefix[Prefix.EDPK]);
};

/**
 * Returns the Tezos public address corresponding to the given public key.
 *
 * @param {object} params - The parameters for generating the public address.
 * @param {Uint8Array} params.publicKey - The public key for which the address is generated.
 * @return {string} The Tezos public address.
 */
export const getPublicTezosAddress = ({
    publicKey,
}: {
    publicKey: Uint8Array;
}): string => {
    return b58cencode(publicKey, prefix[Prefix.TZ1]);
};

/**
 * Generates addresses based on derivation and mnemonic.
 *
 * @param {GenerateAddressParams} derivation - The derivation parameters.
 * @param {number} params.walletAccount - The wallet account ID.
 * @return {AddressResult} The generated address result.
 */
export const generateAddresses = ({
    derivation,
    mnemonic,
    walletAccount,
}: GenerateAddressParams): AddressResult => {
    if (!isValidPath(derivation.path.replace('ACCOUNT', walletAccount + '')))
        throw new Error(DerivationTypeNotSupported);
    const path = extractPath(
        derivation.path.replace('ACCOUNT', walletAccount + ''),
    );
    if (SupportedNetworks.find(a => a == path[1].number) == undefined)
        throw new Error(CoinNotSupported);
    const seed = getSeed({ mnemonic });
    const newAddress = {} as AddressResult;
    const keyPair = getKeyPair({
        path: derivation.path,
        seed,
        walletAccount,
    });
    newAddress.protocol = path[0].number as Protocol;
    newAddress.derivationName = derivation.name;

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
