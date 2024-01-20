/**
 * Mozilla Public License Version 2.0
 *
 *
 * https://github.com/ethereumjs/ethereumjs-monorepo/blob/master/packages/util/LICENSE
 *
 * */
/// <reference types="node" />
declare const ABI: any;
declare function RawEncode(types: string[], values: any[]): Buffer;
declare function SoliditySHA3(types: string[], values: any[]): Buffer;
export { ABI, RawEncode, SoliditySHA3 };
