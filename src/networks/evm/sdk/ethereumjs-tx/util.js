'use strict';
/**
 * The following methods are based on `ethereumjs/tx`, thanks for their work
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/tx
 * Distributed under the Mozilla Public License Version 2.0 software license, see the accompanying
 * file LICENSE or https://opensource.org/license/mpl-2-0/.
 */
Object.defineProperty(exports, '__esModule', { value: true });
exports.AccessLists = void 0;
const ethereumjs_util_1 = require('../ethereumjs-util');
const types_1 = require('./types');
class AccessLists {
    static getAccessListData(accessList) {
        let AccessListJSON;
        let bufferAccessList;
        if (accessList && (0, types_1.isAccessList)(accessList)) {
            AccessListJSON = accessList;
            const newAccessList = [];
            for (let i = 0; i < accessList.length; i++) {
                const item = accessList[i];
                const addressBuffer = (0, ethereumjs_util_1.toBuffer)(
                    item.address,
                );
                const storageItems = [];
                for (let index = 0; index < item.storageKeys.length; index++) {
                    storageItems.push(
                        (0, ethereumjs_util_1.toBuffer)(
                            item.storageKeys[index],
                        ),
                    );
                }
                newAccessList.push([addressBuffer, storageItems]);
            }
            bufferAccessList = newAccessList;
        } else {
            bufferAccessList = accessList ?? [];
            // build the JSON
            const json = [];
            for (let i = 0; i < bufferAccessList.length; i++) {
                const data = bufferAccessList[i];
                const address = (0, ethereumjs_util_1.bufferToHex)(data[0]);
                const storageKeys = [];
                for (let item = 0; item < data[1].length; item++) {
                    storageKeys.push(
                        (0, ethereumjs_util_1.bufferToHex)(data[1][item]),
                    );
                }
                const jsonItem = {
                    address,
                    storageKeys,
                };
                json.push(jsonItem);
            }
            AccessListJSON = json;
        }
        return {
            AccessListJSON,
            accessList: bufferAccessList,
        };
    }
    static verifyAccessList(accessList) {
        for (let key = 0; key < accessList.length; key++) {
            const accessListItem = accessList[key];
            const address = accessListItem[0];
            const storageSlots = accessListItem[1];
            if (accessListItem[2] !== undefined) {
                throw new Error(
                    'Access list item cannot have 3 elements. It can only have an address, and an array of storage slots.',
                );
            }
            if (address.length != 20) {
                throw new Error(
                    'Invalid EIP-2930 transaction: address length should be 20 bytes',
                );
            }
            for (
                let storageSlot = 0;
                storageSlot < storageSlots.length;
                storageSlot++
            ) {
                if (storageSlots[storageSlot].length != 32) {
                    throw new Error(
                        'Invalid EIP-2930 transaction: storage slot length should be 32 bytes',
                    );
                }
            }
        }
    }
    static getAccessListJSON(accessList) {
        const accessListJSON = [];
        for (let index = 0; index < accessList.length; index++) {
            const item = accessList[index];
            const JSONItem = {
                address:
                    '0x' +
                    (0, ethereumjs_util_1.setLengthLeft)(item[0], 20).toString(
                        'hex',
                    ),
                storageKeys: [],
            };
            const storageSlots = item[1];
            for (let slot = 0; slot < storageSlots.length; slot++) {
                const storageSlot = storageSlots[slot];
                JSONItem.storageKeys.push(
                    '0x' +
                        (0, ethereumjs_util_1.setLengthLeft)(
                            storageSlot,
                            32,
                        ).toString('hex'),
                );
            }
            accessListJSON.push(JSONItem);
        }
        return accessListJSON;
    }
}
exports.AccessLists = AccessLists;
