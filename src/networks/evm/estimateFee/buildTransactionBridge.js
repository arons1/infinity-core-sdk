'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.buildSignedBscTx = void 0;
const ethereumjs_tx_1 = require('../sdk/ethereumjs-tx');
const buildSignedBscTx = async ({
    privateKey,
    toAddress,
    amount,
    data = '',
    web3,
}) => {
    const { address: fromAddress } =
        web3.eth.accounts.privateKeyToAccount(privateKey);
    const txCount = await web3.eth.getTransactionCount(fromAddress, 'pending');
    const gasPrice = await web3.eth.getGasPrice();
    const estimateGas = await web3.eth.estimateGas({
        to: toAddress,
        data,
        value: amount,
        from: fromAddress,
    });
    const rawTx = {
        nonce: web3.utils.toHex(txCount),
        gasPrice: web3.utils.toHex(gasPrice),
        gasLimit: web3.utils.toHex(estimateGas),
        to: toAddress,
        value: web3.utils.toHex(amount),
        data: web3.utils.toHex(data),
        chainId: 56,
    };
    const tx = new ethereumjs_tx_1.Transaction(rawTx);
    tx.sign(Buffer.from(privateKey.replace('0x', ''), 'hex'));
    return {
        signedTransaction: `0x${tx.serialize().toString('hex')}`,
        gasPrice,
        estimateGas,
    };
};
exports.buildSignedBscTx = buildSignedBscTx;
