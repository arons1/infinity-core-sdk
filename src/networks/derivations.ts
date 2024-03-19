import { Derivation } from './types';

export default {
    btc: {
        derivations: [
            {
                name: 'segwit',
                path: "m/84'/0'/0'/0/0",
                xpub: 'zpub',
                xprv: 'zpriv',
            },
            {
                name: 'wrapped-segwit',
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
                name: 'legacy',
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
                name: 'legacy',
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
                name: 'legacy',
                path: "m/44'/235'/0'/0/0",
                xpub: 'xpub',
                xprv: 'xprv',
            },
        ],
        bip44: 235,
        curve: 'secp256k1',
    },
    stellar: {
        derivations: [
            {
                name: 'legacy',
                path: "m/44'/148'/0'",
            },
        ],
        bip44: 148,
        curve: 'ed25519',
    },
    xrp: {
        derivations: [
            {
                name: 'legacy',
                path: "m/44'/144'/0'/0/0",
            },
        ],
        bip44: 144,
        curve: 'ed25519',
    },
    eth: {
        derivations: [
            {
                name: 'legacy',
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
                name: 'legacy',
                path: "m/44'/60'/0'/0/0",
            },
        ],
        bip44: 60,
        curve: 'ecdsa',
    },
    bsc: {
        derivations: [
            {
                name: 'legacy',
                path: "m/44'/60'/0'/0/0",
            },
        ],
        bip44: 60,
        curve: 'ecdsa',
    },
    groestlcoin: {
        derivations: [
            {
                name: 'segwit',
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
                name: 'legacy',
                path: "m/44'/60'/0'/0/0",
            },
            {
                name: 'harmony',
                path: "m/44'/60'/0'/0/0",
            },
        ],
        bip44: 60,
        curve: 'ecdsa',
    },
    cronos: {
        derivations: [
            {
                name: 'legacy',
                path: "m/44'/60'/0'/0/0",
            },
        ],
        bip44: 60,
        curve: 'ecdsa',
    },
    vechain: {
        derivations: [
            {
                name: 'legacy',
                path: "m/44'/60'/0'/0/0",
            },
        ],
        bip44: 60,
        curve: 'ecdsa',
    },
    solana: {
        derivations: [
            {
                name: 'legacy',
                path: "m/44'/501'/0'/0'",
            },
        ],
        bip44: 501,
        curve: 'ed25519',
    },
    tezos: {
        derivations: [
            {
                name: 'legacy',
                path: "m/44'/1729'/0'/0'",
            },
        ],
        bip44: 1729,
        curve: 'ed25519',
    },
    avax: {
        derivations: [
            {
                name: 'legacy',
                path: "m/44'/60'/0'/0/0",
            },
        ],
        bip44: 60,
        curve: 'ecdsa',
    },
    xdc: {
        derivations: [
            {
                name: 'xdc',
                path: "m/44'/60'/0'/0/0",
            },
        ],
        bip44: 60,
        curve: 'ecdsa',
    },
    kcc: {
        derivations: [
            {
                name: 'legacy',
                path: "m/44'/60'/0'/0/0",
            },
        ],
        bip44: 60,
        curve: 'ecdsa',
    },
    okc: {
        derivations: [
            {
                name: 'okx',
                path: "m/44'/60'/0'/0/0",
            },
        ],
        bip44: 60,
        curve: 'ecdsa',
    },
} as Record<string, Derivation>;
