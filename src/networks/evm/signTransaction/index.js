'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.signTransaction = void 0;
const signTransaction = async ({ web3, transaction, privateKey }) => {
    const signedTransaction = await web3.eth.accounts.signTransaction(
        transaction,
        privateKey,
    );
    return signedTransaction?.rawTransaction;
};
exports.signTransaction = signTransaction;
