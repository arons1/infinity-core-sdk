import { Curve } from '../registry';
import Base from './base';

class ED25519Base extends Base {
    curve = Curve.ED25519
    supportedMethods(): string[] {
        return [];
    }
    getRootNode(_props: any) {
        throw new Error('Method not implemented.');
    }
    getPrivateMasterKey(_props: any) {
        throw new Error('Method not implemented.');
    }
    getPublicMasterKey(_props: any) {
        throw new Error('Method not implemented.');
    }
    getPrivateMasterAddress(_props: any) {
        throw new Error('Method not implemented.');
    }
    getPublicMasterAddress(_props: any) {
        throw new Error('Method not implemented.');
    }
    getPrivateAddress(_props: any) {
        throw new Error('Method not implemented.');
    }
    getPublicAddress(_props: any) {
        throw new Error('Method not implemented.');
    }
    isValidAddress(_props: any) {
        throw new Error('Method not implemented.');
    }
    isValidExtendedKey(_props: any) {
        throw new Error('Method not implemented.');
    }
    generateAddresses(_props: any) {
        throw new Error('Method not implemented.');
    }
    generatePublicAddresses(_props: any) {
        throw new Error('Method not implemented.');
    }
}

export default ED25519Base;
