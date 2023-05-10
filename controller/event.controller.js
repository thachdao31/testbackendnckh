const Event = require('../model/event.model');
const baseController = require('./base.controller.js');

const EventController = {
    getAllEvents: async (req, res) => {
        baseController.getAll(Event, req, res);
    },
    createEvent: async (req, res) => {
        baseController.create(Event, req, res);
    },
    getEventById: async (req, res) => {
        baseController.get(Event, req, res);
    },
    updateEvent: async (req, res) => {
        baseController.update(Event, req, res);
    },
    checkIn: async (req, res) => {
        try {
            const event = await Event.findById(req.params.eventId);
            if (event) {
                const user = req.body.userId;
                if (!event.checkIn.includes(user) && !event.checkOut.includes(user)) {
                    event.checkIn.push(user);
                    await event.save();
                    res.json(event);
                } else {
                    res.status(400).json({ message: 'User already checked in' });
                }
            } else {
                res.status(404).json({ message: 'Event not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    checkOut: async (req, res) => {
        try {
            const event = await Event.findById(req.params.eventId);
            if (event) {
                const user = req.body.userId;
                if (event.checkIn.includes(user)) {
                    event.checkIn = event.checkIn.filter((id) => id.toString() !== user.toString());
                    event.checkOut.push(user);
                    await event.save();
                    res.json(event);
                } else {
                    res.status(400).json({ message: 'User has not checked in' });
                }
            } else {
                res.status(404).json({ message: 'Event not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteEvent: async (req, res) => {
        baseController.delete(Event, req, res);
    },
    addMember: async (req, res) => {
        try {
            const event = await Event.findById(req.params.eventId);
            if (event) {
                const user = req.body.userId;
                if (!event.listMember.includes(user)) {
                    event.listMember.push(user);
                    await event.save();
                    res.json(event);
                } else {
                    res.status(400).json({ message: 'User already in list' });
                }
            } else {
                res.status(404).json({ message: 'Event not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    removeMember: async (req, res) => {
        try {
            const event = await Event.findById(req.params.eventId);
            if (event) {
                const user = req.body.userId;
                if (event.listMember.includes(user)) {
                    event.listMember = event.listMember.filter((id) => id.toString() !== user.toString());
                    await event.save();
                    res.json(event);
                } else {
                    res.status(400).json({ message: 'User not in list' });
                }
            } else {
                res.status(404).json({ message: 'Event not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = EventController;