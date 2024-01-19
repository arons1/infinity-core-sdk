import {EstimateGasBridgeParams,EstimateGasParams,GasLimitParams,NonceParams,GasPriceParams,TransactionEVM,EstimateGasTokenParams} from './types'
import ERC20Abi from '../../../core/abi/erc20'

import BigNumber from 'bignumber.js'
const estimateBridgeFee = async ({
    amount,
    web3,
    source,
    destination
}: EstimateGasBridgeParams) => {

}
const estimateTokenFee = async ({
    amount = "0",
    web3,
    source,
    destination,
    tokenContract
}: EstimateGasTokenParams) => {
    var contract = new web3.eth.Contract(ERC20Abi, tokenContract, {from: source})
    const {estimateGas,data} = await getGasLimit({source,destination,tokenContract,amount,contract,web3})
    var gasPrice = await getGasPrice({
        web3
    })
    const nonce = await getNonce({
        address:source,
        web3
    })
    var transaction = {
        "from"      : source,
        "nonce"     : nonce,
        "to"        : tokenContract,
        data,
        "value":amount
    } as TransactionEVM
    transaction = await calculateGasPrice({
        transaction,
        gasPrice,
        web3
    })
    return {
        estimateGas,
        gasPrice:transaction.gasPrice ?? transaction.maxFeePerGas,
        transaction
    }
}

const calculateGasPrice = async ({
    transaction,
    gasPrice,
    web3
})

const estimateCurrencyFee = async ({
    amount,
    web3,
    source,
    destination
}: EstimateGasParams) => {

}
export const getGasPrice = async ({
    web3
}:GasPriceParams) => {

}
export const getGasLimit = async ({
    destination,
    tokenContract,
    amount,
    source,
    contract,
    web3
}:GasLimitParams) => {
    return {
        data,
        estimateGas
    }
}
export const getNonce = async ({
    address,
    web3
}:NonceParams) => {
    return await web3.eth.getTransactionCount(address,'pending');
}

export const estimateFeeTransfer = async ({
    web3,
    source,
    tokenContract = '',
    destination = '',
    amount = '0'
}: EstimateGasParams) => {
    const isBridge = destination.startsWith('bnb')
    if(isBridge){
        return await estimateBridgeFee({
            amount,
            web3,
            source,
            destination
        })
    }
    else{
        if(tokenContract.length > 0){
            return await estimateTokenFee({
                web3,
                source,
                tokenContract,
                destination,
                amount
            })
        }
        else{
            return await estimateCurrencyFee({
                web3,
                source,
                destination,
                amount
            })
        }
    }
}