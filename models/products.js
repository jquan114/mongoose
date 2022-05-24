
const mongoose = require('mongoose'); // require mongoose
const Schema = mongoose.Schema; // create a shorthand for the mongoose Schema constructor

// create a new Schema
// This will define the shape of the documents in the collection
// Recource: https://mongoosejs.com/docs/guide.html
const productSchema = new mongoose.Schema({
        name: String,
        description: String,
        img: String,
        price: Number,
        qty: Number,
        comeplete: Boolean,
	});

const Product = mongoose.model('products', productSchema);

module.exports = Product;