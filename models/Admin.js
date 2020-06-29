const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({

    admin_id: { type: Number },
    username: { type: String,unique: true },
    password: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    Created_at:{type: String},
});

adminSchema.index({ request: 'text' });

module.exports = Admin = mongoose.model('admins', adminSchema);
