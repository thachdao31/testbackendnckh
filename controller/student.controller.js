const baseController = require('./base.controller');
const Student = require('../model/student.model');
const Manager = require('../model/manager.model');
const Admin = require('../model/admin.model');
const ClassManager = require('../model/classManager.model');

const User = require('../model/user.model');

const models = {
    Manager: Manager,
    Student: Student,
    Admin: Admin,
    ClassManager: ClassManager,
};

const StudentController = {
    getAllUsers: async (req, res) => {
        const modelName = req.query.role;
        let Model = models[modelName];
        console.log(Model);
        if (!Model) Model = User;

        baseController.getAll(Model, req, res);
    },
    //create user
    createUser: async (req, res) => {
        const modelName = req.body.role;
        const Model = models[modelName];
        console.log(modelName);
        if (!Model) return res.status(400).json({ message: "Invalid role" });

        baseController.create(Model, req, res);
    },
    //get user by id
    getUserById: async (req, res) => {
        baseController.get(User, req, res);
    },
    //update user by id
    updateUser: async (req, res) => {
        const id = req.params.id;
        const userData = await User.findById(id);
        const Model = models[userData.role];
        baseController.update(Model, req, res);
    },
    deleteUser: async (req, res) => {
        baseController.delete(User, req, res);
    },
    createManyUsers: async (req, res) => {
        const data = req.body;
        const Model = models[data.role];
        if (!Model) return res.status(400).json({ message: "Invalid role" });

        baseController.createMany(Model, req, res);
    },
    // get many user by id
    getManyUser: async (req, res) => {
        const modelName = req.query.role;
        let Model = models[modelName];
        console.log(Model);
        if (!Model) Model = User;


        baseController.getMany(Model, req, res);
    }
}

module.exports = StudentController;