const router = require('express').Router();

const classController = require('../controller/class.controller');

router.get('/', classController.getAllClasses);
router.post('/', classController.createClass);
router.get('/:id', classController.getClassById);
router.put('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);

module.exports = router;
