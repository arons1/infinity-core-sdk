import { CoinIds, Coins, Curve } from '../registry';

abstract class Base {
    abstract curve: Curve;
    idCoin: Coins;
    bipIdCoin: CoinIds;
    constructor(coinId: Coins, bipIdCoin: CoinIds) {
        this.idCoin = coinId;
        this.bipIdCoin = bipIdCoin;
    }
    abstract getRootNode(_props: any): any;
    abstract getPrivateMasterKey(_props: any): any;
    abstract getPublicMasterKey(_props: any): any;
    abstract getPrivateMasterAddress(_props: any): any;
    abstract getPublicMasterAddress(_props: any): any;
    abstract getPrivateAddress(_props: any): any;
    abstract getPublicAddress(_props: any): any;
    abstract isValidAddress(_props: any): any;
    abstract isValidExtendedKey(_props: any): any;
    abstract generateAddresses(_props: any): any;
    abstract generatePublicAddresses(_props: any): any;
    abstract supportedMethods(): string[];
}

export default Base;
