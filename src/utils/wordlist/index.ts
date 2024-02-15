import wordlist_english from './wordlist_english';

export * from './wordlist_chinese_simplified';
export * from './wordlist_chinese_traditional';
export * from './wordlist_english';
export * from './wordlist_french';
export * from './wordlist_italian';
export * from './wordlist_japanese';
export * from './wordlist_spanish';
export const wordlists: Record<string, string[]> = {
    EN: wordlist_english,
};
