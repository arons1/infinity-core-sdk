import { CoinIds, Coins } from '../registry';
import Base from './base';
import UTXOBase from './utxo';
const config: Record<Coins,Base> = {
    [Coins.BTC]: new UTXOBase(Coins.BTC, CoinIds.BTC),
    [Coins.LTC]: new UTXOBase(Coins.LTC, CoinIds.LTC),
    [Coins.DOGE]: new UTXOBase(Coins.DOGE, CoinIds.DOGE),
    [Coins.GRS]: new UTXOBase(Coins.GRS, CoinIds.GRS),
    [Coins.FIO]: new Base(Coins.FIO,CoinIds.FIO),
    [Coins.STELLAR]: new Base(Coins.STELLAR,CoinIds.STELLAR),
    [Coins.XRP]: new Base(Coins.XRP,CoinIds.XRP),
    [Coins.ETH]: new Base(Coins.ETH,CoinIds.ETH),
    [Coins.BNB]: new Base(Coins.BNB,CoinIds.BNB),
    [Coins.MATIC]: new Base(Coins.MATIC,CoinIds.ETH),
    [Coins.ONE]: new Base(Coins.ONE,CoinIds.ETH),
    [Coins.CRS]: new Base(Coins.CRS,CoinIds.ETH),
    [Coins.VET]: new Base(Coins.VET,CoinIds.ETH),
    [Coins.SOLANA]: new Base(Coins.SOLANA,CoinIds.SOLANA),
    [Coins.TEZOS]: new Base(Coins.TEZOS,CoinIds.TEZOS),
    [Coins.AVAX]: new Base(Coins.AVAX,CoinIds.ETH),
    [Coins.XDC]: new Base(Coins.XDC,CoinIds.ETH),
    [Coins.KCC]: new Base(Coins.KCC,CoinIds.ETH),
    [Coins.OKX]: new Base(Coins.OKX,CoinIds.ETH),
    [Coins.BSC]: new Base(Coins.BSC,CoinIds.ETH),
    [Coins.ARB]: new Base(Coins.ARB,CoinIds.ETH),
    [Coins.ETH_TESTNET]: new Base(Coins.ETH,CoinIds.ETH),
    [Coins.BSC_TESTNET]: new Base(Coins.ETH,CoinIds.ETH),
};

export default config;
