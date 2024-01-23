'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.estimateFeeTransfer =
    exports.getNonce =
    exports.getGasLimit =
    exports.getGasPrice =
        void 0;
// @ts-ignore
const erc20_1 = __importDefault(require('../../../core/abi/erc20'));
const sendBridge_1 = require('./sendBridge');
const abi_bsc_1 = require('./abi_bsc');
const bignumber_js_1 = __importDefault(require('bignumber.js'));
const estimateBridgeFee = async ({
    amount = '0',
    web3,
    source,
    destination = '',
    chainId,
    feeRatio,
    priorityFee,
}) => {
    var contract = new web3.eth.Contract(
        erc20_1.default,
        abi_bsc_1.tokenHubContractAddress,
        {
            from: source,
        },
    );
    const { estimateGas, data } = await (0, exports.getGasLimit)({
        source,
        destination,
        tokenContract: abi_bsc_1.tokenHubContractAddress,
        amount,
        contract,
        web3,
        isToken: true,
        isBridge: true,
    });
    var gasPrice = await (0, exports.getGasPrice)({
        web3,
    });
    const nonce = await (0, exports.getNonce)({
        address: source,
        web3,
    });
    var transaction = {
        from: source,
        nonce: nonce,
        to: abi_bsc_1.tokenHubContractAddress,
        value: amount,
        data,
    };
    transaction = await calculateGasPrice({
        transaction,
        gasPrice,
        web3,
        chainId,
        feeRatio,
        priorityFee,
    });
    return {
        estimateGas,
        gasPrice: transaction.gasPrice ?? transaction.maxFeePerGas,
        transaction,
    };
};
const estimateTokenFee = async ({
    amount = '0',
    web3,
    source,
    destination,
    tokenContract,
    chainId,
    feeRatio = 0.5,
    priorityFee,
}) => {
    var contract = new web3.eth.Contract(erc20_1.default, tokenContract, {
        from: source,
    });
    const { estimateGas, data } = await (0, exports.getGasLimit)({
        source,
        destination,
        tokenContract,
        amount,
        contract,
        web3,
        isToken: true,
        isBridge: false,
    });
    var gasPrice = await (0, exports.getGasPrice)({
        web3,
    });
    const nonce = await (0, exports.getNonce)({
        address: source,
        web3,
    });
    var transaction = {
        from: source,
        nonce: nonce,
        to: tokenContract,
        data,
        value: amount,
    };
    transaction = await calculateGasPrice({
        transaction,
        gasPrice,
        web3,
        chainId,
        feeRatio,
        priorityFee,
    });
    return {
        estimateGas,
        gasPrice: transaction.gasPrice ?? transaction.maxFeePerGas,
        transaction,
    };
};
const calculateGasPrice = async ({
    transaction,
    gasPrice,
    web3,
    chainId,
    feeRatio,
    priorityFee,
}) => {
    if (chainId == 1 || chainId == 137) {
        transaction.maxPriorityFeePerGas = web3.utils.toHex(
            new bignumber_js_1.default(priorityFee)
                .multipliedBy(feeRatio + 1)
                .toString(10)
                .split('.')[0],
        );
        transaction.maxFeePerGas = new bignumber_js_1.default(
            transaction.maxPriorityFeePerGas,
        )
            .plus(
                new bignumber_js_1.default(gasPrice).multipliedBy(1 + feeRatio),
            )
            .toString(10);
        transaction.maxFeePerGas = web3.utils.toHex(
            new bignumber_js_1.default(transaction.maxFeePerGas)
                .toString(10)
                .split('.')[0],
        );
        delete transaction.gasPrice;
    } else {
        transaction.gasPrice = web3.utils.toHex(gasPrice);
    }
    return transaction;
};
const estimateCurrencyFee = async ({
    amount = '0',
    web3,
    source,
    destination = '',
    chainId,
    feeRatio,
    priorityFee,
}) => {
    const { estimateGas } = await (0, exports.getGasLimit)({
        source,
        destination,
        amount,
        web3,
        isToken: false,
        isBridge: false,
    });
    var gasPrice = await (0, exports.getGasPrice)({ web3 });
    const nonce = await (0, exports.getNonce)({
        address: source,
        web3,
    });
    var transaction = {
        from: source,
        nonce: nonce,
        to: destination,
        value: amount,
    };
    transaction = await calculateGasPrice({
        transaction,
        gasPrice,
        web3,
        chainId,
        feeRatio,
        priorityFee,
    });
    return {
        estimateGas,
        gasPrice,
        transaction,
    };
};
const getGasPrice = async ({ web3 }) => {
    return await web3.eth.getGasPrice();
};
exports.getGasPrice = getGasPrice;
const getGasLimit = async ({
    destination,
    tokenContract,
    amount,
    source,
    contract,
    web3,
    isToken = false,
    isBridge = false,
}) => {
    if (isBridge) {
        const data = (0, sendBridge_1.getDataBSC)({
            toAddress: destination,
            amount,
            web3,
        });
        const estimateGas = await (0, sendBridge_1.getGasLimitBSC)({
            fromAddress: source,
            toAddress: destination,
            amount,
            web3,
        });
        return {
            data,
            estimateGas,
        };
    } else {
        if (isToken) {
            const nonce = await (0, exports.getNonce)({
                address: source,
                web3,
            });
            const data = contract.methods
                .transfer(destination, amount)
                .encodeABI();
            const estimateGas = await web3.eth.estimateGas({
                from: source,
                nonce: nonce,
                to: tokenContract,
                data,
                value: amount,
            });
            return {
                data,
                estimateGas,
            };
        } else {
            const nonce = await (0, exports.getNonce)({
                address: source,
                web3,
            });
            const estimateGas = await web3.eth.estimateGas({
                from: source,
                nonce: nonce,
                to: destination,
                value: amount,
            });
            return {
                estimateGas,
                data: '',
            };
        }
    }
};
exports.getGasLimit = getGasLimit;
const getNonce = async ({ address, web3 }) => {
    return await web3.eth.getTransactionCount(address, 'pending');
};
exports.getNonce = getNonce;
const estimateFeeTransfer = async ({
    web3,
    source,
    tokenContract = '',
    destination = '',
    amount = '0',
    chainId,
    feeRatio = 0.5,
    priorityFee,
}) => {
    const isBridge = destination.startsWith('bnb');
    if (isBridge) {
        return await estimateBridgeFee({
            amount,
            web3,
            source,
            destination,
            feeRatio,
            priorityFee,
            chainId,
        });
    } else {
        if (tokenContract.length > 0) {
            return await estimateTokenFee({
                web3,
                source,
                tokenContract,
                destination,
                amount,
                chainId,
                feeRatio,
                priorityFee,
            });
        } else {
            return await estimateCurrencyFee({
                web3,
                source,
                destination,
                amount,
                chainId,
                feeRatio,
                priorityFee,
            });
        }
    }
};
exports.estimateFeeTransfer = estimateFeeTransfer;
