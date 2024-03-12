const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function generateSequentialShortId(logs) {
    let idShortCounter = 1;
    let idShort = String(idShortCounter).padStart(10, '0');
    
    const existingIds = logs ? logs.flat().map(log => log.idShort) : [];
    console.log('Existing IDs:', existingIds);
    
    while (existingIds.includes(idShort)) {
        idShortCounter++;
        idShort = String(idShortCounter).padStart(10, '0');
    }
    
    saveIdCounter(idShortCounter);
    console.log('Generated ID:', idShort);
    
    return idShort.toUpperCase();
}

function generateRandomHex16() {
    const bytes = crypto.randomBytes(8);
    const hexString = bytes.toString('hex').toUpperCase().slice(0, 16);
    return hexString;
}

function saveIdCounter(idShortCounter) {
    const counterFilePath = path.join(__dirname, 'id_counter.json');
    fs.writeFileSync(counterFilePath, JSON.stringify({ idShortCounter }));
}

module.exports = { generateSequentialShortId, generateRandomHex16 };