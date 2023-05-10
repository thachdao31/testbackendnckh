const router = require('express').Router();

const userController = require('../controller/student.controller');

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/createMany', userController.createManyUsers);
router.post('/getMany', userController.getManyUser);

module.exports = router;
