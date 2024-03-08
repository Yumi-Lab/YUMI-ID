const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();

const logFilePath = path.join(__dirname, 'logs.json');

let logs = [];
if (fs.existsSync(logFilePath)) {
    logs = JSON.parse(fs.readFileSync(logFilePath));
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, '[]');
}

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function generateSequentialShortId(logs) {
    let idShortCounter = 1;
    let idShort = String(idShortCounter).padStart(8, '0');
    const existingIds = logs.map(log => log.idShort);
    while (existingIds.includes(idShort)) {
        idShortCounter++;
        idShort = String(idShortCounter).padStart(8, '0');
    }
    return { idShort: idShort.toUpperCase(), logs: logs };
}

app.post('/route_testing', upload.single('file'), (req, res) => {
    try {
        const data = req.body || {};
        const uploadedFile = req.file;
        const macAddress = data.mac_address || '';
        const macHash = crypto.createHash('sha256').update(macAddress).digest('hex');
        const existingLog = logs.find((log) => log.macHash === macHash);

        if (!existingLog) {
            const { idShort, logs: updatedLogs } = generateSequentialShortId(logs);
            logs = updatedLogs; // Actualizar los logs con el valor devuelto por generateSequentialShortId()

            // Resto del código para guardar archivos y responder al cliente
            // Por ejemplo:
            /*
            const idLong = generateRandomHex16();
            const combinedId = `${idShort}_${idLong}`;
            const timestamp = data.timestamp || '';
            const folderName = path.join(__dirname, 'users_config', combinedId);
            // Resto del código...
            */

            res.status(200).json({
                id_short: idShort,
                message: 'Request handled successfully'
            });
        } else {
            // Resto del código para manejar el caso en que el registro ya existe
            // Por ejemplo:
            /*
            const timestamp = data.timestamp || '';
            // Resto del código...
            */

            res.status(200).json({
                id_short: existingLog.idShort,
                message: 'Existing log found'
            });
        }
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error:`, error);
        res.status(500).send('Internal Server Error');
    }
});

function shouldSaveFile(filePath, newFileHash) {
    if (!fs.existsSync(filePath)) {
        return true; 
    }
    const existingFileContent = fs.readFileSync(filePath);
    const existingFileHash = crypto.createHash('md5').update(existingFileContent).digest('hex');
    return newFileHash !== existingFileHash; 
}

module.exports = app;
