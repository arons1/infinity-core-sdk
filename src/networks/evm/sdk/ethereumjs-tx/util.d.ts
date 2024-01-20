/**
 * The following methods are based on `ethereumjs/tx`, thanks for their work
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/tx
 * Distributed under the Mozilla Public License Version 2.0 software license, see the accompanying
 * file LICENSE or https://opensource.org/license/mpl-2-0/.
 */
import { AccessList, AccessListBuffer } from './types';
export declare class AccessLists {
    static getAccessListData(accessList: AccessListBuffer | AccessList): {
        AccessListJSON: AccessList;
        accessList: AccessListBuffer;
    };
    static verifyAccessList(accessList: AccessListBuffer): void;
    static getAccessListJSON(accessList: AccessListBuffer): any[];
}
