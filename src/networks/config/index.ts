import { CoinIds, Coins } from '../registry';
import ECDSABase from './ecdsa';
import ED25519Base from './ed25519';
import UTXOBase from './utxo';
const config: Record<Coins, ED25519Base | UTXOBase | ECDSABase> = {
    [Coins.BTC]: new UTXOBase(Coins.BTC, CoinIds.BTC),
    [Coins.LTC]: new UTXOBase(Coins.LTC, CoinIds.LTC),
    [Coins.DOGE]: new UTXOBase(Coins.DOGE, CoinIds.DOGE),
    [Coins.GRS]: new UTXOBase(Coins.GRS, CoinIds.GRS),
    [Coins.FIO]: new ECDSABase(Coins.FIO, CoinIds.FIO),
    [Coins.STELLAR]: new ED25519Base(Coins.STELLAR, CoinIds.STELLAR),
    [Coins.XRP]: new ED25519Base(Coins.XRP, CoinIds.XRP),
    [Coins.ETH]: new ECDSABase(Coins.ETH, CoinIds.ETH),
    [Coins.BNB]: new ECDSABase(Coins.BNB, CoinIds.BNB),
    [Coins.MATIC]: new ECDSABase(Coins.MATIC, CoinIds.ETH),
    [Coins.ONE]: new ECDSABase(Coins.ONE, CoinIds.ETH),
    [Coins.CRS]: new ECDSABase(Coins.CRS, CoinIds.ETH),
    [Coins.VET]: new ECDSABase(Coins.VET, CoinIds.ETH),
    [Coins.SOLANA]: new ED25519Base(Coins.SOLANA, CoinIds.SOLANA),
    [Coins.TEZOS]: new ED25519Base(Coins.TEZOS, CoinIds.TEZOS),
    [Coins.AVAX]: new ECDSABase(Coins.AVAX, CoinIds.ETH),
    [Coins.XDC]: new ECDSABase(Coins.XDC, CoinIds.ETH),
    [Coins.KCC]: new ECDSABase(Coins.KCC, CoinIds.ETH),
    [Coins.OKX]: new ECDSABase(Coins.OKX, CoinIds.ETH),
    [Coins.BSC]: new ECDSABase(Coins.BSC, CoinIds.ETH),
    [Coins.ARB]: new ECDSABase(Coins.ARB, CoinIds.ETH),
    [Coins.ETH_TESTNET]: new ECDSABase(Coins.ETH, CoinIds.ETH),
    [Coins.BSC_TESTNET]: new ECDSABase(Coins.ETH, CoinIds.ETH),
};

export default config;
