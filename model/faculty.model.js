const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    facultyName: {
        type: String,
        required: true,
        unique: true
    },
    facultyCode: {
        type: String,
        required: true,
        unique: true
    }
})


module.exports = mongoose.model('Faculty', facultySchema);