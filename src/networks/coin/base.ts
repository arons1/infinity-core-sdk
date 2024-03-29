import { Bip44IdNotSupported, CoinNotSupported } from '../../errors';
import { CoinIds, Coins, Curve } from '../registry';

abstract class Base {
    abstract curve: Curve;
    idCoin: Coins;
    bipIdCoin: CoinIds;
    constructor(coinId: Coins, bipIdCoin: CoinIds) {
        if (Object.values(Coins).find(a => a == coinId) == undefined)
            throw new Error(CoinNotSupported);
        if (Object.values(CoinIds).find(a => a == bipIdCoin) == undefined)
            throw new Error(Bip44IdNotSupported);
        this.idCoin = coinId;
        this.bipIdCoin = bipIdCoin;
    }
    abstract getSeed(_props: any): any;
    abstract getKeyPair(_props: any): any;
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
    abstract getAccount(_props: any): string;
}

export default Base;
