const router = require('express').Router();
const facultyController = require('../controller/faculty.controller');

router.get('/', facultyController.getAllFaculties);
router.post('/', facultyController.createFaculty);
router.get('/:id', facultyController.getFacultyById);
router.put('/:id', facultyController.updateFaculty);
router.delete('/:id', facultyController.deleteFaculty);
router.post('/getmany', facultyController.getManyFaculty);

module.exports = router;
