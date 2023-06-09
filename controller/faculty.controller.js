const baseController = require('./base.controller');
const Faculty = require('../model/faculty.model');

const FacultyController = {
    getAllFaculties: async(req, res) => {
        baseController.getAll(Faculty, req, res);
    },
    createFaculty: async(req, res) => {
        baseController.create(Faculty, req, res);
    },
    getFacultyById: async(req, res) => {
        baseController.get(Faculty, req, res);
    },
    updateFaculty: async(req, res) => {
        baseController.update(Faculty, req, res);
    },
    deleteFaculty: async ( req, res) => {
        baseController.delete(Faculty, req, res);
    },
    getManyFaculty: async (req, res) => {
        baseController.getMany(Faculty, req, res);
    }
}

module.exports = FacultyController;