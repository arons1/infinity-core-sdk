import baseX from 'base-x';
import { toHex } from '../../core/base';
import { sha256 } from '@xrplf/isomorphic/sha256';
var ALLOWED_CHARS =
    'rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz';

var codec = baseX(ALLOWED_CHARS);
var regexp = new RegExp('^r[' + ALLOWED_CHARS + ']{27,35}$');

export const isValidAddress = (address: string) => {
    if (regexp.test(address)) {
        var bytes = codec.decode(address);
        var computedChecksum = Buffer.from(sha256(sha256(bytes.slice(0, -4))))
            .toString('hex')
            .substr(0, 8);
        var checksum = toHex(bytes.slice(-4));
        return computedChecksum === checksum;
    }
    return false;
};

export const isValidMemo = (memo: string) => {
    return (
        typeof memo == 'string' &&
        /^[0-9]*$/.test(memo) &&
        parseInt(memo) <= 4294967295
    );
};
