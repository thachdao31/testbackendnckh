const router = require('express').Router();

const fileController = require('../controller/file.controller');

router.post('/', fileController.uploadFile);
router.get('/', fileController.getAllFile);
router.delete('/:id', fileController.deleteFile);
router.get('/download/:id', fileController.downloadFile);
router.get('/:id', fileController.getFileInfo);


module.exports = router;