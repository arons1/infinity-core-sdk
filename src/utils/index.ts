import BigNumber from 'bignumber.js';

export const isValidNumber = (number: any) => {
    return !new BigNumber(number).isNaN();
};
