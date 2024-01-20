'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.hmacSHA512 = exports.hmacSHA256 = void 0;
const hmac_1 = require('@noble/hashes/hmac');
const hash_1 = require('./hash');
function hmacSHA256(key, buffer) {
    return Buffer.from((0, hmac_1.hmac)(hash_1.sha256, key, buffer));
}
exports.hmacSHA256 = hmacSHA256;
function hmacSHA512(key, buffer) {
    return Buffer.from((0, hmac_1.hmac)(hash_1.sha512, key, buffer));
}
exports.hmacSHA512 = hmacSHA512;
