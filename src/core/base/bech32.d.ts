/// <reference types="node" />
export declare function toBech32(prefix: string, data: any): string;
export declare function fromBech32(data: string, limit?: number | false): [string, Buffer];
