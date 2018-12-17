const mongoose = require('mongoose');

const host = process.env.DATABASE_IP || 'localhost'; 

mongoose.connect(
  `mongodb://${host}/SDC`,
  { useNewUrlParser: true,}
);

const db = mongoose.connection;

db.on('error', function(e) {
  console.log('there is an error connecting to mongodb:', e);
});
db.once('open', function() {
  console.log('mongodb connected !!!');
});

const productSchema = new mongoose.Schema({
  productName: String,
  category: String, 
  attributes: {
    video: String, 
    shippingDate: String,
    included: [String],
    specs: [String]
  },
  descriptions: [Object]
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;
