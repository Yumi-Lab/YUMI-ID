// route_authentication.js
const express = require('express');
const multer = require('multer');
const routeController = require('../controllers/authentication');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    const programInfo = {
        name: 'Yumi-Id',
        description: '',
        version: '1.0.0'
    };

    res.json(programInfo);
});
router.post('/', upload.single('file'), routeController.handleRouteTesting);

module.exports = router;
