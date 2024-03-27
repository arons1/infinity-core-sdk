import { Coins } from "../../registry";

export type SignTransactionParams = {
    transaction: any;
    keyPair: any;
    coinId: Coins;
};
