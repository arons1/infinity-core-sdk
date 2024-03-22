import { DerivationName } from './constants';
import { Derivation } from './types';

export default {
    btc: {
        derivations: [
            {
                name: DerivationName.SEGWIT,
                path: "m/84'/0'/0'/0/0",
                xpub: 'zpub',
                xprv: 'zpriv',
            },
            {
                name: DerivationName.WRAPPED_SEGWIT,
                path: "m/49'/0'/0'/0/0",
                xpub: 'ypub',
                xprv: 'ypriv',
            },
        ],
        bip44: 0,
        curve: 'secp256k1',
    },
    ltc: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/2'/0'/0/0",
                xpub: 'xpub',
                xprv: 'xprv',
            },
        ],
        bip44: 2,
        curve: 'secp256k1',
    },
    doge: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/3'/0'/0/0",
                xpub: 'xpub',
                xprv: 'xprv',
            },
        ],
        bip44: 3,
        curve: 'secp256k1',
    },
    fio: {
        derivations: [
            {
                name: DerivationName.FIO,
                path: "m/44'/235'/0'/0/0",
                xpub: 'xpub',
                xprv: 'xprv',
            },
        ],
        bip44: 235,
        curve: 'ecdsa',
    },
    stellar: {
        derivations: [
            {
                name: DerivationName.STELLAR,
                path: "m/44'/148'/0'",
            },
        ],
        bip44: 148,
        curve: 'ed25519',
    },
    solana: {
        derivations: [
            {
                name: DerivationName.SOLANA,
                path: "m/44'/501'/0'/0'",
            },
        ],
        bip44: 501,
        curve: 'ed25519',
    },
    tezos: {
        derivations: [
            {
                name: DerivationName.TEZOS,
                path: "m/44'/1729'/0'/0'",
            },
        ],
        bip44: 1729,
        curve: 'ed25519',
    },
    xrp: {
        derivations: [
            {
                name: DerivationName.XRP,
                path: "m/44'/144'/0'/0/0",
            },
        ],
        bip44: 144,
        curve: 'ed25519',
    },
    eth: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/40'/60'/0'/0/0",
            },
        ],
        bip44: 60,
        curve: 'ecdsa',
    },
    bnb: {
        derivations: [
            {
                name: 'bnb',
                path: "m/44'/714'/0'/0/0",
            },
        ],
        bip44: 714,
        curve: 'ecdsa',
    },
    matic: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/0'/0/0",
            },
        ],
        bip44: 60,
        curve: 'ecdsa',
    },
    bsc: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/0'/0/0",
            },
        ],
        bip44: 60,
        curve: 'ecdsa',
    },
    groestlcoin: {
        derivations: [
            {
                name: DerivationName.SEGWIT,
                path: "m/84'/0'/0'/0/0",
                xpub: 'zpub',
                xprv: 'zpriv',
            },
        ],
        bip44: 17,
        curve: 'secp256k1',
    },
    harmony: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/0'/0/0",
            },
            {
                name: DerivationName.HARMONY,
                path: "m/44'/60'/0'/0/0",
            },
        ],
        bip44: 60,
        curve: 'ecdsa',
    },
    cronos: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/0'/0/0",
            },
        ],
        bip44: 60,
        curve: 'ecdsa',
    },
    vechain: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/0'/0/0",
            },
        ],
        bip44: 60,
        curve: 'ecdsa',
    },
    avax: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/0'/0/0",
            },
        ],
        bip44: 60,
        curve: 'ecdsa',
    },
    xdc: {
        derivations: [
            {
                name: DerivationName.XDC,
                path: "m/44'/60'/0'/0/0",
            },
        ],
        bip44: 60,
        curve: 'ecdsa',
    },
    kcc: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/0'/0/0",
            },
        ],
        bip44: 60,
        curve: 'ecdsa',
    },
    okc: {
        derivations: [
            {
                name: DerivationName.OKX,
                path: "m/44'/60'/0'/0/0",
            },
        ],
        bip44: 60,
        curve: 'ecdsa',
    },
} as Record<string, Derivation>;
