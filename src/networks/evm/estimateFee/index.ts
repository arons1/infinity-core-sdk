import {EstimateGasBridgeParams,EstimateGasParams,GasLimitParams,NonceParams,GasPriceParams,TransactionEVM,EstimateGasTokenParams,CalculateGasPrice} from './types'
import ERC20Abi from '../../../core/abi/erc20'
import {getDataBSC,getGasLimitBSC} from './sendBridge'
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
    tokenContract,
    chainId,
    feeRatio = 0.5,
    priorityFee
}: EstimateGasTokenParams) => {
    var contract = new web3.eth.Contract(ERC20Abi, tokenContract, {from: source})
    const {estimateGas,data} = await getGasLimit({source,destination,tokenContract,amount,contract,web3,isToken:true,isBridge:true})
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
        web3,
        chainId,
        feeRatio,
        priorityFee
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
    web3,
    chainId,
    feeRatio,
    priorityFee
}:CalculateGasPrice) => {
    if(chainId == 1 || chainId == 137){
        transaction.maxPriorityFeePerGas = web3.utils.toHex(new BigNumber(priorityFee).multipliedBy(feeRatio+1).toString(10).split('.')[0])
        transaction.maxFeePerGas = new BigNumber(transaction.maxPriorityFeePerGas).plus(new BigNumber(gasPrice).multipliedBy(1+feeRatio)).toString(10);
        transaction.maxFeePerGas = web3.utils.toHex(new BigNumber(transaction.maxFeePerGas).toString(10).split('.')[0])
        delete transaction.gasPrice
      }
      else{
        transaction.gasPrice = web3.utils.toHex(gasPrice)
      }
      return transaction
}

const estimateCurrencyFee = async ({
    amount,
    web3,
    source,
    destination,
    chainId
}: EstimateGasParams) => {

}
export const getGasPrice = async ({
    web3
}:GasPriceParams) => {
    return await web3.eth.getGasPrice()
}
export const getGasLimit = async ({
    destination,
    tokenContract,
    amount,
    source,
    contract,
    web3,
    isToken = false,
    isBridge = false
}:GasLimitParams) : Promise<{
    data:string;
    estimateGas:string
}> => {
    if(isToken){
            const nonce = await getNonce({address:source,web3})
            const data = contract.methods.transfer(destination, amount).encodeABI();
            const estimateGas = await web3.eth.estimateGas({
                "from"      : source,
                "nonce"     : nonce,
                "to"        : tokenContract,
                data,
                "value"     : amount
            })
            return {
                data,
                estimateGas
            }
    }
    else{
        if(isBridge){
            const data = getDataBSC({
                toAddress:destination,
                amount,
                web3
            })
            const estimateGas = await getGasLimitBSC({
                fromAddress:source,
                toAddress:destination,
                amount,
                web3
            })
            return {
                data,
                estimateGas
            }
        }
        else{
            const nonce = await getNonce({address:source,web3})
            const estimateGas = await web3.eth.estimateGas({
                "from"      : source,
                "nonce"     : nonce,
                "to"        : destination,
                "value"     : amount
            })
            return {
                estimateGas,
                data:""
            }
        }
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
    amount = '0',
    chainId,
    feeRatio = 0.5,
    priorityFee
}: EstimateGasParams) => {
    const isBridge = destination.startsWith('bnb')
    if(isBridge){
        return await estimateBridgeFee({
            amount,
            web3,
            source,
            destination,
            feeRatio,
            priorityFee
        })
    }
    else{
        if(tokenContract.length > 0){
            return await estimateTokenFee({
                web3,
                source,
                tokenContract,
                destination,
                amount,
                chainId,
                feeRatio,
                priorityFee
            })
        }
        else{
            return await estimateCurrencyFee({
                web3,
                source,
                destination,
                amount,
                chainId,
                feeRatio,
                priorityFee
            })
        }
    }
}