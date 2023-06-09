const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true,
        unique: true
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true
    },
    year: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Classes', classSchema);

