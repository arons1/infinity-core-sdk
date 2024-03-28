import { NotSupported } from '../../errors';
import { CoinIds, Coins } from '../registry';
interface BaseInterface {
    idCoin: Coins;
    bipIdCoin: CoinIds;
    getRootNode: (props: any) => any;
    getPrivateMasterKey: (props: any) => any;
    getPublicMasterKey: (props: any) => any;
    getPrivateMasterAddress: (props: any) => any;
    getPublicMasterAddress: (props: any) => any;
    getPrivateAddress: (props: any) => any;
    getPublicAddress: (props: any) => any;
    isValidAddress: (props: any) => any;
    generateAddresses: (props: any) => any;
    generatePublicAddresses: (props: any) => any;
    isValidExtendedKey: (props: any) => any;
}
class Base implements BaseInterface {
    idCoin: Coins;
    bipIdCoin: CoinIds;
    constructor(coinId: Coins, bipIdCoin: CoinIds) {
        this.idCoin = coinId;
        this.bipIdCoin = bipIdCoin;
    }
    getRootNode = (_props: any): any => {
        throw new Error(NotSupported);
    };
    getPrivateMasterKey = (_props: any): any => {
        throw new Error(NotSupported);
    };
    getPublicMasterKey = (_props: any): any => {
        throw new Error(NotSupported);
    };
    getPrivateMasterAddress = (_props: any): any => {
        throw new Error(NotSupported);
    };
    getPublicMasterAddress = (_props: any): any => {
        throw new Error(NotSupported);
    };
    getPrivateAddress = (_props: any): any => {
        throw new Error(NotSupported);
    };
    getPublicAddress = (_props: any): any => {
        throw new Error(NotSupported);
    };
    isValidAddress = (_props: any): any => {
        throw new Error(NotSupported);
    };
    isValidExtendedKey = (_props: any): any => {
        throw new Error(NotSupported);
    };
    generateAddresses = (_props: any): any => {
        throw new Error(NotSupported);
    };
    generatePublicAddresses = (_props: any): any => {
        throw new Error(NotSupported);
    };
}

export default Base;
