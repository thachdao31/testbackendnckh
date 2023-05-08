const Class = require('../model/class.model');
const baseController = require('./base.controller.js');

const ClassController = {
    getAllClasses: async(req, res) => {
        baseController.getAll(Class, req, res);
    },
    createClass: async(req, res) => {
        baseController.create(Class, req, res);
    },
    getClassById: async(req, res) => {
        baseController.get(Class, req, res);
    },
    updateClass: async(req, res) => {
        baseController.update(Class, req, res);
    },
    deleteClass: async ( req, res) => {
        baseController.delete(Class, req, res);
    }

}

module.exports = ClassController;