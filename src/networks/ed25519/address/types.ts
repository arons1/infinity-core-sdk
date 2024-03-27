import { CoinIds } from '../../registry';

export type GetKeyPairParams = {
    path: string;
    seed: Buffer;
};

export type GetPublicKeyParams = {
    keyPair: any;
    bipIdCoin: CoinIds;
};

export type GetPrivateKeyParams = {
    keyPair: any;
};

export type GetTezosPublicKeyParams = GetPrivateKeyParams;
