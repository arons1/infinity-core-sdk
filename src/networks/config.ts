import { DerivationName } from './constants';
import { CoinIds, Coins, Curve, Protocol } from './registry';
import { Derivation } from './types';
import { Encoding } from './utils/secp256k1';

const derivations : Record<Coins, Derivation> = {
    [Coins.BTC]: {
        derivations: [
            {
                name: DerivationName.SEGWIT,
                path: "m/84'/0'/0'/0/0",
                xpub: Encoding.ZPUB,
                xprv: Encoding.ZPRIV,
                protocol: Protocol.SEGWIT,
            },
            {
                name: DerivationName.WRAPPED_SEGWIT,
                path: "m/49'/0'/0'/0/0",
                xpub: Encoding.YPUB,
                xprv: Encoding.YPRIV,
                protocol: Protocol.WRAPPED_SEGWIT,
            },
        ],
        bip44: CoinIds.BTC,
        curve: Curve.SECP256K1,
    },
    [Coins.LTC]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/2'/0'/0/0",
                xpub: Encoding.XPUB,
                xprv: Encoding.XPRIV,
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.LTC,
        curve: Curve.SECP256K1,
    },
    [Coins.DOGE]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/3'/0'/0/0",
                xpub: Encoding.XPUB,
                xprv: Encoding.XPRIV,
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.DOGE,
        curve: Curve.SECP256K1,
    },
    [Coins.FIO]: {
        derivations: [
            {
                name: DerivationName.FIO,
                path: "m/44'/235'/0'/0/0",
                xpub: Encoding.XPUB,
                xprv: Encoding.XPRIV,
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.FIO,
        curve: Curve.ECDSA,
    },
    [Coins.STELLAR]: {
        derivations: [
            {
                name: DerivationName.STELLAR,
                path: "m/44'/148'/0'",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.STELLAR,
        curve: Curve.ED25519,
    },
    [Coins.SOLANA]: {
        derivations: [
            {
                name: DerivationName.SOLANA,
                path: "m/44'/501'/0'/0'",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.SOLANA,
        curve: Curve.ED25519,
    },
    [Coins.TEZOS]: {
        derivations: [
            {
                name: DerivationName.TEZOS,
                path: "m/44'/1729'/0'/0'",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.TEZOS,
        curve: Curve.ED25519,
    },
    [Coins.XRP]: {
        derivations: [
            {
                name: DerivationName.XRP,
                path: "m/44'/144'/0'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.XRP,
        curve: Curve.ED25519,
    },
    [Coins.ETH]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/0'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
    },
    [Coins.BNB]: {
        derivations: [
            {
                name: DerivationName.BNB,
                path: "m/44'/714'/0'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.BNB,
        curve: Curve.ECDSA,
    },
    [Coins.MATIC]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/0'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
    },
    [Coins.BSC]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/0'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
    },
    [Coins.GRS]: {
        derivations: [
            {
                name: DerivationName.SEGWIT,
                path: "m/84'/17'/0'/0/0",
                xpub: Encoding.ZPUB,
                xprv: Encoding.ZPRIV,
                protocol: Protocol.SEGWIT,
            },
        ],
        bip44: CoinIds.GRS,
        curve: Curve.SECP256K1,
    },
    [Coins.ONE]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/0'/0/0",
                protocol: Protocol.LEGACY,
            },
            {
                name: DerivationName.HARMONY,
                path: "m/44'/60'/0'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
    },
    [Coins.CRS]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/0'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
    },
    [Coins.VET]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/0'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
    },
    [Coins.AVAX]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/0'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
    },
    [Coins.XDC]: {
        derivations: [
            {
                name: DerivationName.XDC,
                path: "m/44'/60'/0'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
    },
    [Coins.KCC]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/0'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
    },
    [Coins.OKX]: {
        derivations: [
            {
                name: DerivationName.OKX,
                path: "m/44'/60'/0'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
    },
    [Coins.ARB]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/0'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
    },
    [Coins.BSC_TESTNET]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/0'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
    },
    [Coins.ETH_TESTNET]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/0'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
    },
};

export default derivations
