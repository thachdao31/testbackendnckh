const mongoose = require('mongoose');
const User = require('./user.model');

const studentSchema = new mongoose.Schema({
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
    },
    
    trainingPoints: {
        type: Number,
        default: 0,
        max: 100,
        min: 0
    }
},
{
    discriminatorKey: 'role',
}
)

const Student = User.discriminator('Student', studentSchema);
module.exports = Student;