const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deepPopulate = require('mongoose-deep-populate')(mongoose);

const productSchema = new Schema({
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review'}],
    product_id: { type: Number },
    name: { type: String},
    category_name: { type: String},
    subcategory_name: { type: String},
    price: { type: Number},
    color: { type: String},
    weight: { type: Number},
    images:[{ path:{ type: String}}],
    Created_at:{type: String}
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  });

productSchema
.virtual('averageRating')
.get(function() {
var rating = 0;
if (this.reviews.length == 0) {
    rating = 0;
} else {
    this.reviews.map((review) => {
    rating += review.rating;
    });
    rating = rating / this.reviews.length;
}

return rating;
  });

productSchema.index({ request: 'text' });
productSchema.plugin(deepPopulate);

module.exports = product = mongoose.model('Product', productSchema);