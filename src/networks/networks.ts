import { Network } from '../core/bip32';

export default {
    btc: {
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
    ltc: {
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
    doge: {
        messagePrefix: '\x19Dogecoin Signed Message:\n',
        bip32: {
            public: 0x02facafd,
            private: 0x02fac398,
        },
        pubKeyHash: 0x1e,
        scriptHash: 0x16,
        wif: 0x9e,
    },
    eth: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    matic: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    groestlcoin: {
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
    harmony: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    cronos: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    vechain: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    avax: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    xdc: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    kcc: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    okc: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
    bsc: {
        messagePrefix: '\u0018Bitcoin Signed Message:\n',
        bip32: {
            public: 76067358,
            private: 76066276,
        },
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128,
    },
} as Record<string, Network>;
