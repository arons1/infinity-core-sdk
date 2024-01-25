'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.verifyMessage = exports.signMessage = void 0;
const signMessage = async ({ web3, message, privateKey }) => {
    return await web3.eth.accounts.sign(message, privateKey);
};
exports.signMessage = signMessage;
const verifyMessage = async ({ web3, message, address, signature }) => {
    const publicAddress = await web3.eth.accounts.recover(message, signature);
    console.log(publicAddress);
    return publicAddress?.toLowerCase() == address.toLowerCase();
};
exports.verifyMessage = verifyMessage;
