import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import { hexToU8a, isHex } from '@polkadot/util';

/**
 * Validates the given address by checking if it is a valid Kusama address.
 *
 * @param {string} address - The address to be validated.
 * @return {boolean} Returns true if the address is valid, false otherwise.
 */
export const isValidAddress = (address: string) => {
    try {
        encodeAddress(
            isHex(address)
                ? hexToU8a(address)
                : decodeAddress(address, false, 2),
        );

        return true;
    } catch (error) {
        return false;
    }
};
