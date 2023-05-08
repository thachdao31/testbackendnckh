const mongoose = require('mongoose');
const User = require('./user.model');

const classManagerSchema = new mongoose.Schema({
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
    },
},
{
    discriminatorKey: 'role',
}
)
const ClassManager = User.discriminator('ClassManager', classManagerSchema);
module.exports = ClassManager;
