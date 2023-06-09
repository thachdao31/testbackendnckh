const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const SALT = process.env.SALT;

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 50,
    },
    email: {
        type: String,
        minLength: 10,
        maxLength: 50,
        unique: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true,
        
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        default: 123456
    },
    role: {
        type: String,
        enum: ['Admin', 'Student', 'Manager', 'ClassManager'],
        default: 'Student'
    },
    DoB:{
        type: String,
        default: null
    },
    avatar: {
        type: String,
        default: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true,
    },
    joinDate: {
        type: Date,
    }
})

module.exports = mongoose.model('User', userSchema);