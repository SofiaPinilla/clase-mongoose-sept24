const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    reviews: [{
      userId: { type: ObjectId, ref: 'User' },
      comment: String,
      // productId: { type: ObjectId, ref: 'Product' },
  }],
  likes: [{ type: ObjectId }],

}, { timestamps: true });

ProductSchema.index({
    name: "text",
  });
  
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
