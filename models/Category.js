const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    
    category_id: { type: Number },
    name: { type: String},
    sub_categories: [{
        name : {type: String},
        subcategory_id : {type: String}
         }]
});

categorySchema.index({ request: 'text' });

module.exports = category = mongoose.model('Category', categorySchema);