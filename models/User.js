const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    user_id: { type: Number },
    email: { type: String},
    password: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    avatar: { type: String },
    mobile_number: { type: String},
    address: { type: String },
    credit_card_number: { type: Number },
    orders: [],
    Created_at:{type: String},
});

userSchema.index({ request: 'text' });

module.exports = user = mongoose.model('User', userSchema);
