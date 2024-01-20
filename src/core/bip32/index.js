'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.fromPrivateKey =
    exports.fromPublicKey =
    exports.fromBase58 =
    exports.fromSeed =
    exports.tinySecp256k1Interface =
        void 0;
var bip32_1 = require('./bip32');
Object.defineProperty(exports, 'tinySecp256k1Interface', {
    enumerable: true,
    get: function () {
        return bip32_1.tinySecp256k1Interface;
    },
});
Object.defineProperty(exports, 'fromSeed', {
    enumerable: true,
    get: function () {
        return bip32_1.fromSeed;
    },
});
Object.defineProperty(exports, 'fromBase58', {
    enumerable: true,
    get: function () {
        return bip32_1.fromBase58;
    },
});
Object.defineProperty(exports, 'fromPublicKey', {
    enumerable: true,
    get: function () {
        return bip32_1.fromPublicKey;
    },
});
Object.defineProperty(exports, 'fromPrivateKey', {
    enumerable: true,
    get: function () {
        return bip32_1.fromPrivateKey;
    },
});
