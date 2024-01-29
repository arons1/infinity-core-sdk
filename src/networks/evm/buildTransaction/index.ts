import { InvalidAddress, InvalidChainError } from "../../../errors/networks";
import { validatePublicAddress } from "../address";
import { calculateGasPrice, getGasPrice, getNonce } from "../estimateFee";
import { SupportedChains } from "../general/contants";
import { TransactionEVM } from "../general/types";
import { BuildTransaction } from "./types";

export const buildTransaction = async ({
    value,
    source,
    destination,
    data,
    web3,
    chainId,
    feeRatio = 0.5,
    priorityFee,
    gasPrice
}:BuildTransaction) : Promise<TransactionEVM> => {
    if (!validatePublicAddress({ address: source })) throw  new Error(InvalidAddress);
    if (!SupportedChains.includes(chainId)) throw  new Error(InvalidChainError);
    if (!validatePublicAddress({ address: destination })) throw  new Error(InvalidAddress);
    if(!gasPrice)
        gasPrice = await getGasPrice({
            web3,
        });
    const nonce = await getNonce({
        address: source,
        web3,
    });
    var transaction = {
        from: source,
        nonce: nonce,
        to: destination,
        data,
        value,
    } as TransactionEVM;
    transaction = await calculateGasPrice({
        transaction,
        gasPrice,
        web3,
        chainId,
        feeRatio,
        priorityFee,
    });
    return transaction
}