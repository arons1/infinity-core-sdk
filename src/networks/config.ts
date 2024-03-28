import { DerivationName } from './constants';
import networks from './networks';
import { CoinIds, Coins, Curve, Protocol } from './registry';
import { Derivation } from './types';
import { Encoding } from './utils/secp256k1';

const derivations: Record<Coins, Derivation> = {
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
        network: networks[Coins.BTC],
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
        network: networks[Coins.LTC],
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
        network: networks[Coins.DOGE],
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
        network: networks[Coins.FIO],
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
        network: networks[Coins.STELLAR],
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
        network: networks[Coins.SOLANA],
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
        network: networks[Coins.TEZOS],
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
        network: networks[Coins.XRP],
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
        network: networks[Coins.ETH],
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
        network: networks[Coins.BNB],
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
        network: networks[Coins.MATIC],
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
        network: networks[Coins.BSC],
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
        network: networks[Coins.GRS],
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
        network: networks[Coins.ONE],
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
        network: networks[Coins.CRS],
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
        network: networks[Coins.VET],
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
        network: networks[Coins.AVAX],
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
        network: networks[Coins.XDC],
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
        network: networks[Coins.KCC],
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
        network: networks[Coins.OKX],
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
        network: networks[Coins.ARB],
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
        network: networks[Coins.BSC_TESTNET],
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
        network: networks[Coins.ETH_TESTNET],
    },
};

export default derivations;
