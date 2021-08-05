const express = require('express');
const imageController = require('../controllers/imageController');
const imageUploader = require('../helper/image-uploader');

const router = express.Router();

router.post('/upload', imageUploader.upload.single('image'), imageController.upload);

module.exports = router;