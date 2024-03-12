const fs = require('fs');
const crypto = require('crypto');

function shouldSaveFile(filePath, newFileHash) {
    if (!fs.existsSync(filePath)) {
        return true; 
    }
    const existingFileContent = fs.readFileSync(filePath);
    const existingFileHash = crypto.createHash('md5').update(existingFileContent).digest('hex');
    return newFileHash !== existingFileHash; 
}

module.exports = { shouldSaveFile };
