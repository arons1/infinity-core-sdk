'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.transferFromBscToBbc =
    exports.getGasLimitBSC =
    exports.getDataBSC =
    exports.getFeeBSCtoBC =
        void 0;
const bech32_buffer_1 = require('bech32-buffer');
const bignumber_js_1 = __importDefault(require('bignumber.js'));
const buildTransactionBridge_1 = require('./buildTransactionBridge');
const abi_bsc_1 = require('./abi_bsc');
const getFeeBSCtoBC = async web3 => {
    const contract = new web3.eth.Contract(
        abi_bsc_1.tokenHubAbi,
        abi_bsc_1.tokenHubContractAddress,
    );
    return await contract.methods.getMiniRelayFee().call();
};
exports.getFeeBSCtoBC = getFeeBSCtoBC;
const getDataBSC = ({ toAddress, amount, web3 }) => {
    const decodeData = (0, bech32_buffer_1.decode)(toAddress);
    const decodeAddress = Buffer.from(decodeData.data).toString('hex');
    const contract = new web3.eth.Contract(
        abi_bsc_1.tokenHubAbi,
        abi_bsc_1.tokenHubContractAddress,
    );
    const transferOutABI = contract.methods
        .transferOut(
            '0x0000000000000000000000000000000000000000',
            `0x${decodeAddress}`,
            `0x${new bignumber_js_1.default(amount).toString(16)}`,
            Math.ceil(Date.now() / 1000 + 600),
        )
        .encodeABI();
    return transferOutABI;
};
exports.getDataBSC = getDataBSC;
const getGasLimitBSC = async ({ fromAddress, toAddress, amount, web3 }) => {
    const data = (0, exports.getDataBSC)({ toAddress, amount, web3 });
    const relayFeeWei = await (0, exports.getFeeBSCtoBC)(web3);
    const amount_minus_fee = new bignumber_js_1.default(amount)
        .plus(relayFeeWei)
        .toString(16);
    let estimatedGas;
    try {
        estimatedGas = await web3.eth.estimateGas({
            to: abi_bsc_1.tokenHubContractAddress,
            data,
            value: `0x${amount_minus_fee}`,
            from: fromAddress,
        });
    } catch (e) {
        console.error(e);
    }
    return estimatedGas;
};
exports.getGasLimitBSC = getGasLimitBSC;
const transferFromBscToBbc = async ({
    privateKey,
    toAddress,
    amount,
    web3,
}) => {
    const decodeData = (0, bech32_buffer_1.decode)(toAddress);
    const decodeAddress = Buffer.from(decodeData.data).toString('hex');
    const contract = new web3.eth.Contract(
        abi_bsc_1.tokenHubAbi,
        abi_bsc_1.tokenHubContractAddress,
    );
    const transferOutABI = contract.methods
        .transferOut(
            '0x0000000000000000000000000000000000000000',
            `0x${decodeAddress}`,
            web3.utils.toHex(amount),
            Math.ceil(Date.now() / 1000 + 600),
        )
        .encodeABI();
    const relayFeeWei = await (0, exports.getFeeBSCtoBC)(web3);
    const amount_minus_fee = new bignumber_js_1.default(amount)
        .plus(relayFeeWei)
        .toString(10);
    const sendTx = await (0, buildTransactionBridge_1.buildSignedBscTx)({
        data: transferOutABI,
        privateKey,
        toAddress: abi_bsc_1.tokenHubContractAddress,
        amount: amount_minus_fee,
        web3,
    });
    return { ...sendTx, relayFeeWei: new bignumber_js_1.default(relayFeeWei) };
};
exports.transferFromBscToBbc = transferFromBscToBbc;
