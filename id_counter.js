const fs = require('fs');
const path = require('path');

let idShortCounter = 0;
const counterFilePath = path.join(__dirname, 'id_counter.json');

function loadIdCounter() {
    try {
        if (fs.existsSync(counterFilePath)) {
            const data = fs.readFileSync(counterFilePath, 'utf8');
            const counterData = JSON.parse(data);
            if (counterData && typeof counterData.idShortCounter === 'number') {
                idShortCounter = counterData.idShortCounter;
            }
        }
    } catch (error) {
        console.error('Error loading ID counter:', error);
    }
}

function saveIdCounter() {
    try {
        const data = JSON.stringify({ idShortCounter });
        fs.writeFileSync(counterFilePath, data);
    } catch (error) {
        console.error('Error saving ID counter:', error);
    }
}

function generateSequentialShortId() {
    const id = String(++idShortCounter).padStart(8, '0');
    console.log('Generated ID:', id);
    return id.toUpperCase();
}

module.exports = { generateSequentialShortId, loadIdCounter, saveIdCounter };