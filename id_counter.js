const fs = require('fs');
const path = require('path');

const counterFilePath = path.join(__dirname, 'id_counter.json');

function loadIdCounter() {
    if (fs.existsSync(counterFilePath)) {
        const counterData = JSON.parse(fs.readFileSync(counterFilePath));
        idShortCounter = counterData.idShortCounter || 0;
    } else {
        idShortCounter = 0;
    }
}

function saveIdCounter() {
    const counterData = { idShortCounter };
    fs.writeFileSync(counterFilePath, JSON.stringify(counterData, null, 2));
}

module.exports = { loadIdCounter, saveIdCounter };