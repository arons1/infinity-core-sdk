import { NotSupported } from '../../errors';
import { CoinIds, Coins } from '../registry';
import ECDSABase from './ecdsa';
import ED25519Base from './ed25519';
import SECP256K1Base from './secp256k1';
const config = (idCoin: Coins): ED25519Base | SECP256K1Base | ECDSABase => {
    switch (idCoin) {
        case Coins.BTC:
            return new SECP256K1Base(Coins.BTC, CoinIds.BTC);
        case Coins.LTC:
            return new SECP256K1Base(Coins.LTC, CoinIds.LTC);
        case Coins.DOGE:
            return new SECP256K1Base(Coins.DOGE, CoinIds.DOGE);
        case Coins.GRS:
            return new SECP256K1Base(Coins.GRS, CoinIds.GRS);
        case Coins.FIO:
            return new ECDSABase(Coins.FIO, CoinIds.FIO);
        case Coins.STELLAR:
            return new ED25519Base(Coins.STELLAR, CoinIds.STELLAR);
        case Coins.XRP:
            return new ED25519Base(Coins.XRP, CoinIds.XRP);
        case Coins.ETH:
            return new ECDSABase(Coins.ETH, CoinIds.ETH);
        case Coins.BNB:
            return new ECDSABase(Coins.BNB, CoinIds.BNB);
        case Coins.MATIC:
            return new ECDSABase(Coins.MATIC, CoinIds.ETH);
        case Coins.ONE:
            return new ECDSABase(Coins.ONE, CoinIds.ETH);
        case Coins.CRS:
            return new ECDSABase(Coins.CRS, CoinIds.ETH);
        case Coins.VET:
            return new ECDSABase(Coins.VET, CoinIds.ETH);
        case Coins.SOLANA:
            return new ED25519Base(Coins.SOLANA, CoinIds.SOLANA);
        case Coins.TEZOS:
            return new ED25519Base(Coins.TEZOS, CoinIds.TEZOS);
        case Coins.AVAX:
            return new ECDSABase(Coins.AVAX, CoinIds.ETH);
        case Coins.XDC:
            return new ECDSABase(Coins.XDC, CoinIds.ETH);
        case Coins.KCC:
            return new ECDSABase(Coins.KCC, CoinIds.ETH);
        case Coins.OKX:
            return new ECDSABase(Coins.OKX, CoinIds.ETH);
        case Coins.BSC:
            return new ECDSABase(Coins.BSC, CoinIds.ETH);
        case Coins.ARB:
            return new ECDSABase(Coins.ARB, CoinIds.ETH);
        case Coins.ETH_TESTNET:
            return new ECDSABase(Coins.ETH_TESTNET, CoinIds.ETH);
        case Coins.BSC_TESTNET:
            return new ECDSABase(Coins.BSC_TESTNET, CoinIds.ETH);
        default:
            throw new Error(NotSupported);
    }
};

export default config;
