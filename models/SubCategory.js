const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
    
    subcategory_id: { type: Number },
    name: { type: String},
    category_name: { type: String}
});

subcategorySchema.index({ request: 'text' });

module.exports = subcategory = mongoose.model('SubCategory', subcategorySchema);