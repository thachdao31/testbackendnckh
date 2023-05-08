const mongoose = require('mongoose');
const User = require('./user.model');

const adminSchema = new mongoose.Schema({
},
{
    discriminatorKey: 'role',
}
)

const Admin = User.discriminator('Admin', adminSchema);
module.exports = Admin;