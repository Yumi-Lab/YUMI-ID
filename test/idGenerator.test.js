const assert = require('assert');
const { generateSequentialShortId, generateRandomHex16 } = require('../utils/idGenerator');

describe('ID Generation', function () {
    describe('generateSequentialShortId', function () {
        it('should generate a unique sequential short ID', function () {
            const id = generateSequentialShortId();
            const logs = [
                { idShort: '00000001',},
                { idShort: '00000002',},
            ];
            assert.strictEqual(typeof id, 'string');
        });
    });

    describe('generateRandomHex16', function () {
        it('should generate a random hexadecimal string of length 16', function () {
            const hexString = generateRandomHex16();
            assert.strictEqual(hexString.length, 16);
        });
    });
});
