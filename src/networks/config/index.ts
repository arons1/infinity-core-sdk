import { NotSupported } from '../../errors';
import { CoinIds, Coins } from '../registry';
import ECDSACoin from './ecdsa';
import ED25519Coin from './ed25519';
import SECP256K1Coin from './secp256k1';
const Config = (idCoin: Coins): ED25519Coin | SECP256K1Coin | ECDSACoin => {
    switch (idCoin) {
        case Coins.BTC:
            return new SECP256K1Coin(Coins.BTC, CoinIds.BTC);
        case Coins.LTC:
            return new SECP256K1Coin(Coins.LTC, CoinIds.LTC);
        case Coins.DOGE:
            return new SECP256K1Coin(Coins.DOGE, CoinIds.DOGE);
        case Coins.GRS:
            return new SECP256K1Coin(Coins.GRS, CoinIds.GRS);
        case Coins.FIO:
            return new ECDSACoin(Coins.FIO, CoinIds.FIO);
        case Coins.STELLAR:
            return new ED25519Coin(Coins.STELLAR, CoinIds.STELLAR);
        case Coins.XRP:
            return new ED25519Coin(Coins.XRP, CoinIds.XRP);
        case Coins.ETH:
            return new ECDSACoin(Coins.ETH, CoinIds.ETH);
        case Coins.BNB:
            return new ECDSACoin(Coins.BNB, CoinIds.BNB);
        case Coins.MATIC:
            return new ECDSACoin(Coins.MATIC, CoinIds.ETH);
        case Coins.ONE:
            return new ECDSACoin(Coins.ONE, CoinIds.ETH);
        case Coins.CRS:
            return new ECDSACoin(Coins.CRS, CoinIds.ETH);
        case Coins.VET:
            return new ECDSACoin(Coins.VET, CoinIds.ETH);
        case Coins.SOLANA:
            return new ED25519Coin(Coins.SOLANA, CoinIds.SOLANA);
        case Coins.TEZOS:
            return new ED25519Coin(Coins.TEZOS, CoinIds.TEZOS);
        case Coins.AVAX:
            return new ECDSACoin(Coins.AVAX, CoinIds.ETH);
        case Coins.XDC:
            return new ECDSACoin(Coins.XDC, CoinIds.ETH);
        case Coins.KCC:
            return new ECDSACoin(Coins.KCC, CoinIds.ETH);
        case Coins.OKX:
            return new ECDSACoin(Coins.OKX, CoinIds.ETH);
        case Coins.BSC:
            return new ECDSACoin(Coins.BSC, CoinIds.ETH);
        case Coins.ARB:
            return new ECDSACoin(Coins.ARB, CoinIds.ETH);
        case Coins.ETH_TESTNET:
            return new ECDSACoin(Coins.ETH_TESTNET, CoinIds.ETH);
        case Coins.BSC_TESTNET:
            return new ECDSACoin(Coins.BSC_TESTNET, CoinIds.ETH);
        default:
            throw new Error(NotSupported);
    }
};
export default Config;
