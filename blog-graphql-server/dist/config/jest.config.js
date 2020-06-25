"use strict";
module.exports = {
    rootDir: '../',
    testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
    transform: {
        '^.+\\.(ts|js|html)$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageReporters: ['html'],
    modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
};
