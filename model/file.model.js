const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
        unique: true
    },
    fileCode: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
        required: true,
        unique: true
    },
    fileType: {
        type: String,
        required: true,
    },
    fileSize: {
        type: Number,
        required: true,
    },
})


module.exports = mongoose.model('File', fileSchema);

