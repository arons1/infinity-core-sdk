import { NotImplemented } from "../../errors";
import { CoinIds, Coins } from "../registry";
interface BaseInterface {
    idCoin: Coins;
    bipIdCoin: CoinIds;
    getRootNode:(props:any) => any;
    getPrivateMasterKey:(props:any) => any;
    getPublicMasterKey:(props:any) => any;
    getPrivateMasterAddress:(props:any) => any;
    getPublicMasterAddress:(props:any) => any;
    getPrivateAddress:(props:any) => any;
    getPublicAddress:(props:any) => any;
    isValidAddress:(props:any) => any;
    generateAddresses:(props:any) => any;
    generatePublicAddresses:(props:any) => any;
    isValidExtendedKey:(props:any) => any;

}
class Base implements BaseInterface {
    idCoin: Coins;
    bipIdCoin: CoinIds;
    constructor(coinId: Coins, bipIdCoin: CoinIds) {
        this.idCoin = coinId;
        this.bipIdCoin = bipIdCoin;
    }
    getRootNode = (_props:any):any => { throw new Error(NotImplemented); }
    getPrivateMasterKey = (_props:any):any => { throw new Error(NotImplemented); }
    getPublicMasterKey = (_props:any):any => { throw new Error(NotImplemented); }
    getPrivateMasterAddress = (_props:any):any => { throw new Error(NotImplemented); }
    getPublicMasterAddress = (_props:any):any => { throw new Error(NotImplemented); }
    getPrivateAddress = (_props:any):any => { throw new Error(NotImplemented); }
    getPublicAddress = (_props:any):any => { throw new Error(NotImplemented); }
    isValidAddress = (_props:any):any => { throw new Error(NotImplemented); }
    isValidExtendedKey = (_props:any):any => { throw new Error(NotImplemented); }
    generateAddresses = (_props:any):any => { throw new Error(NotImplemented); }
    generatePublicAddresses = (_props:any):any => { throw new Error(NotImplemented); }
}

export default Base