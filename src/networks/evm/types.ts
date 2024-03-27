import { Chains } from './general';

export type GeneralApiParams = {
    chainId: Chains;
    apiKey: string;
    address: string;
    page: number;
    limit: number;
};
