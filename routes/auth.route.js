const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Dossier racine pour stocker les fichiers
const UPLOAD_DIR = path.join(__dirname, '../users_config');

// Fonction pour obtenir ou créer le dossier utilisateur avec MAC
function getOrCreateUserFolder(mac) {
    const folders = fs.readdirSync(UPLOAD_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    const regex = new RegExp(`^([0-9]{10})_${mac}$`, 'i');
    let existing = folders.find(folder => folder.match(regex));

    if (existing) return existing;

    // Créer un nouvel ID s'il n'existe pas
    const existingIds = folders.map(folder => {
        const match = folder.match(/^([0-9]{10})_/);
        return match ? parseInt(match[1], 10) : -1;
    });
    const nextId = Math.max(...existingIds, 0) + 1;
    const userId = String(nextId).padStart(10, '0');
    return `${userId}_${mac}`;
}

// Configuration de Multer pour définir la destination et le nom du fichier
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const mac = req.body.mac_address?.replace(/:/g, '').toUpperCase() || 'UNKNOWN';
        const timestamp = req.body.timestamp || Date.now();

        const userFolder = getOrCreateUserFolder(mac);
        const fullPath = path.join(UPLOAD_DIR, userFolder, timestamp);

        fs.mkdirSync(fullPath, { recursive: true });
        cb(null, fullPath);
    },
    filename: (req, file, cb) => {
        cb(null, 'printer.cfg');
    }
});

const upload = multer({ storage });

// Route POST pour recevoir le fichier
router.post('', upload.single('file'), (req, res) => {
    const mac = req.body.mac_address || 'UNKNOWN';
    const timestamp = req.body.timestamp || 'NO_TIMESTAMP';

    if (!req.file) {
        console.warn('? Aucun fichier reçu.');
        return res.status(400).send('No file uploaded.');
    }

    console.log('? Fichier reçu :', req.file.filename);
    console.log('?? MAC :', mac);
    console.log('?? Timestamp :', timestamp);

    res.status(200).send('File received');
});

module.exports = router;
