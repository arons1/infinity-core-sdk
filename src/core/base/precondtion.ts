import { ExpectedButOther, ExpectedButUndefined, InvalidStatment } from "../../errors";

type ErrorType = undefined | string | Error;

const check = (statement: any, orError?: ErrorType) => {
    if (!statement) {
        orError = orError ? orError : InvalidStatment;
        orError = orError instanceof Error ? orError : new Error(orError);

        throw orError;
    }
};

const checkIsDefined = <T>(something?: T, orError?: ErrorType): T => {
    check(
        typeof something !== 'undefined',
        orError || ExpectedButUndefined,
    );
    return something as T;
};

const checkIsUndefined = (something: any, orError?: ErrorType) => {
    check(
        typeof something === 'undefined',
        orError || `${ExpectedButOther} ${something}`,
    );
};

export { check, checkIsDefined, checkIsUndefined };
