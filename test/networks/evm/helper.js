"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.web3BSC = exports.web3Ethereum = void 0;
const web3_1 = __importDefault(require("web3"));
exports.web3Ethereum = new web3_1.default('https://rpc.mevblocker.io/');
exports.web3BSC = new web3_1.default('https://bsc-dataseed.bnbchain.org/');
