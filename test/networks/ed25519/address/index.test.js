"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const index_1 = require("../../../../lib/commonjs/networks/ed25519/address/index");
const mnemonic = 'derive lab over dragon nothing pioneer until deputy inherit help next release';
(0, globals_1.describe)('generateAddressED25519', () => {
    (0, globals_1.test)('generateStellarAddress', async () => {
        const seed = (0, index_1.getSeed)({ mnemonic });
        const publicKey = (0, index_1.getPublicKey)({
            bipIdCoin: 148,
            protocol: 44,
            seed,
        });
        const publicAddress = (0, index_1.getPublicStellarAddress)({ publicKey });
        (0, globals_1.expect)(publicAddress).toBe('GDQEWSVP7QQWXY5MSFEVRPEPD5NMJHK6ACW4RHZMZAGA6CK6HU7OESPK');
    });
});
