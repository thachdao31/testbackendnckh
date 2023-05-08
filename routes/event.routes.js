const router = require('express').Router();
const eventController = require('../controller/event.controller');

router.get('/', eventController.getAllEvents);
router.post('/', eventController.createEvent);
router.get('/:id', eventController.getEventById);
router.put('/:id', eventController.updateEvent);
router.post('/:eventId/check-in', eventController.checkIn);
router.post('/:eventId/check-out', eventController.checkOut);
router.delete('/:id', eventController.deleteEvent);
router.post('/addmember/:eventId', eventController.addMember);
router.post('/removemember/:eventId', eventController.removeMember)

module.exports = router;