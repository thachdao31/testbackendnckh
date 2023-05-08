const mongoose  = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
        unique: true
    },
    checkIn: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        {timestamps: true}
    ],

    checkOut: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        {timestamps: true}
    ],
    listMember: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    ],
    time: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        // required: true
    },
})

module.exports = mongoose.model('Event', eventSchema);