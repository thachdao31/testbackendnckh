const mongoose = require('mongoose');
const User = require('./user.model');

const teacherSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
},
{
    discriminatorKey: 'role',
}
)
const Manager = User.discriminator('Manager', teacherSchema);
module.exports = Manager;