import { NotImplemented } from '../../errors';
import { Curve } from '../registry';
import Base from './base';

class ED25519Base extends Base {
    curve = Curve.ED25519;
    supportedMethods(): string[] {
        return [];
    }
    getRootNode(_props: any) {
        throw new Error(NotImplemented);
    }
    getPrivateMasterKey(_props: any) {
        throw new Error(NotImplemented);
    }
    getPublicMasterKey(_props: any) {
        throw new Error(NotImplemented);
    }
    getPrivateMasterAddress(_props: any) {
        throw new Error(NotImplemented);
    }
    getPublicMasterAddress(_props: any) {
        throw new Error(NotImplemented);
    }
    getPrivateAddress(_props: any) {
        throw new Error(NotImplemented);
    }
    getPublicAddress(_props: any) {
        throw new Error(NotImplemented);
    }
    isValidAddress(_props: any) {
        throw new Error(NotImplemented);
    }
    isValidExtendedKey(_props: any) {
        throw new Error(NotImplemented);
    }
    generateAddresses(_props: any) {
        throw new Error(NotImplemented);
    }
    generatePublicAddresses(_props: any) {
        throw new Error(NotImplemented);
    }
}

export default ED25519Base;
