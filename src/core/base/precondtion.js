'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.checkIsUndefined = exports.checkIsDefined = exports.check = void 0;
const check = (statement, orError) => {
    if (!statement) {
        orError = orError ? orError : 'Invalid statement';
        orError = orError instanceof Error ? orError : new Error(orError);
        throw orError;
    }
};
exports.check = check;
const checkIsDefined = (something, orError) => {
    check(
        typeof something !== 'undefined',
        orError || 'Expect defined but actually undefined',
    );
    return something;
};
exports.checkIsDefined = checkIsDefined;
const checkIsUndefined = (something, orError) => {
    check(
        typeof something === 'undefined',
        orError || `Expect undefined but actually ${something}`,
    );
};
exports.checkIsUndefined = checkIsUndefined;
