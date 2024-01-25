'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.signTransaction = void 0;
const signTransaction = async ({ web3, transaction, privateAddress }) => {
    const signedTransaction = await web3.eth.accounts.signTransaction(
        transaction,
        privateAddress,
    );
    return signedTransaction?.rawTransaction;
};
exports.signTransaction = signTransaction;
