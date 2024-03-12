const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { generateSequentialShortId, generateRandomHex16 } = require('../utils/idGenerator');
const { shouldSaveFile } = require('../utils/fileHandler');

const logFilePath = path.join(__dirname, '..', '/utils/logs.json');
let logs = [];

if (fs.existsSync(logFilePath)) {
    logs = JSON.parse(fs.readFileSync(logFilePath));
}

function handleRouteTesting(req, res) {
    try {
        const data = req.body || {};
        const uploadedFile = req.file;
        const macAddress = data.mac_address || '';
        const macHash = crypto.createHash('sha256').update(macAddress).digest('hex');

        const existingLog = logs.find((log) => log.macHash === macHash);

        if (!existingLog) {
            const idShort = generateSequentialShortId(logs);
            const idLong = generateRandomHex16();
            const combinedId = `${idShort}_${idLong}`;
            const timestamp = data.timestamp || '';
            const folderName = path.join(__dirname, '..', 'users_config', combinedId);

            if (!fs.existsSync(folderName)) {
                fs.mkdirSync(folderName, { recursive: true });
            }

            let filePath = '';
            if (timestamp) {
                const sanitizedTimestamp = timestamp.replace(/[^a-zA-Z0-9-_]/g, '');
                filePath = path.join(folderName, sanitizedTimestamp, 'printer.cfg');
            } else {
                console.error('Timestamp is undefined or empty.');
            }

            if (!fs.existsSync(path.dirname(filePath))) {
                fs.mkdirSync(path.dirname(filePath), { recursive: true });
            }

            const newFileHash = crypto.createHash('md5').update(uploadedFile.buffer).digest('hex');
            if (shouldSaveFile(filePath, newFileHash)) {
                fs.writeFileSync(filePath, uploadedFile.buffer);
            } else {
                console.log(`File already exists with the same content: ${filePath}`);
            }

            const newLog = {
                macHash: macHash,
                idLong: idLong,
                idShort: idShort,
                timestamp: new Date().toISOString()
            };

            logs.push(newLog);
            fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2));

            res.status(200).json({
                id_long: idLong,
                id_short: idShort,
            });

            console.log(`[${new Date().toISOString()}] Request handled successfully for MAC ${macAddress}`);
        } else {
            const timestamp = data.timestamp || '';

            if (timestamp) {
                const sanitizedTimestamp = timestamp.replace(/[^a-zA-Z0-9-_]/g, '');
                const folderPath = path.join(__dirname, '..', 'users_config', existingLog.idShort + '_' + existingLog.idLong);

                if (!fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath, { recursive: true });
                }

                const newFilePath = path.join(folderPath, sanitizedTimestamp, 'printer.cfg');

                if (!fs.existsSync(path.dirname(newFilePath))) {
                    fs.mkdirSync(path.dirname(newFilePath), { recursive: true });
                }

                const newFileHash = crypto.createHash('md5').update(uploadedFile.buffer).digest('hex');
                if (shouldSaveFile(newFilePath, newFileHash)) {
                    fs.writeFileSync(newFilePath, uploadedFile.buffer);
                    console.log(`File saved to existing directory: ${newFilePath}`);
                } else {
                    console.log(`File already exists with the same content: ${newFilePath}`);
                }
            } else {
                console.error('Timestamp is undefined or empty.');
            }

            res.status(200).json({
                id_long: existingLog.idLong,
                id_short: existingLog.idShort,
            });
        }
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error:`, error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    handleRouteTesting
};