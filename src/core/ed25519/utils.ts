export const pathRegex = new RegExp("^m(\\/[0-9]+')+$");

export const replaceDerive = (val: string): string => val.replace("'", '');
export function verifyChecksum(expected: Uint8Array, actual: Uint8Array) {
    if (expected.length !== actual.length) {
        return false;
    }

    if (expected.length === 0) {
        return true;
    }

    for (let i = 0; i < expected.length; i += 1) {
        if (expected[i] !== actual[i]) {
            return false;
        }
    }

    return true;
}
