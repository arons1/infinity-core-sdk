import { Network } from '../core/bip32';
import { Coins } from './registry';

const networks:Record<Coins, Network> = {
    [Coins.BTC]: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bech32: 'bc',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    [Coins.LTC]: {
        messagePrefix: '\u0018Litecoin Signed Message:\n',
        bech32: 'ltc',
        bip32: {
            private: 0x019d9cfe,
            public: 0x019da462,
        },
        pubKeyHash: 0x30,
        scriptHash: 0x32,
        wif: 0xb0,
    },
    [Coins.DOGE]: {
        messagePrefix: '\x19Dogecoin Signed Message:\n',
        bip32: {
            public: 0x02facafd,
            private: 0x02fac398,
        },
        pubKeyHash: 0x1e,
        scriptHash: 0x16,
        wif: 0x9e,
    },
    [Coins.ETH]: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    [Coins.MATIC]: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    [Coins.GRS]: {
        messagePrefix: '\\x19GroestlCoin Signed Message:\n',
        bech32: 'grs',
        bip32: {
            public: 0x04b24746,
            private: 0x04b2430c,
        },
        pubKeyHash: 0x24,
        scriptHash: 0x05,
        wif: 0x80,
    },
    [Coins.ONE]: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    [Coins.CRS]: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    [Coins.VET]: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    [Coins.AVAX]: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    [Coins.XDC]: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    [Coins.KCC]: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    [Coins.OKX]: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    [Coins.BSC]: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    [Coins.FIO]: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    [Coins.STELLAR]: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bech32: 'bc',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    [Coins.XRP]: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bech32: 'bc',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    [Coins.BNB]: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bech32: 'bc',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    [Coins.SOLANA]: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bech32: 'bc',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    [Coins.TEZOS]: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bech32: 'bc',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    [Coins.ARB]: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    [Coins.ETH_TESTNET]: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    [Coins.BSC_TESTNET]: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    }
};

export default networks