const assert = require('assert');
const { shouldSaveFile } = require('../utils/fileHandler');
const fs = require('fs');
const crypto = require('crypto');

describe('shouldSaveFile', function() {
    it('should return true if the file does not exist', function() {
        const filePath = 'test.txt'; 
        const newFileHash = 'abc123';
        const result = shouldSaveFile(filePath, newFileHash);
        assert.strictEqual(result, true);
    });

    it('should return true if the file content hash is different', function() {
        const filePath = 'test.txt';
        const existingFileContent = 'existing content';
        fs.writeFileSync(filePath, existingFileContent);
        const newFileHash = crypto.createHash('md5').update('new content').digest('hex');
        const result = shouldSaveFile(filePath, newFileHash);
        assert.strictEqual(result, true);
        fs.unlinkSync(filePath); 
    });

    it('should return false if the file content hash is the same', function() {
        const filePath = 'test.txt'; 
        const existingFileContent = 'existing content';
        fs.writeFileSync(filePath, existingFileContent);
        const existingFileHash = crypto.createHash('md5').update(existingFileContent).digest('hex');
        const result = shouldSaveFile(filePath, existingFileHash);
        assert.strictEqual(result, false);
        fs.unlinkSync(filePath); 
    });
});
