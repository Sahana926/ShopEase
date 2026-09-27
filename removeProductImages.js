<<<<<<< HEAD
const mongoose = require('mongoose');
const Product = require('./backend/models/Product');

async function removeImages() {
  await mongoose.connect('mongodb://localhost:27017/ethnickart', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await Product.updateMany({}, { $unset: { image: 1 } });
  console.log('All product images removed!');
  mongoose.disconnect();
}

=======
const mongoose = require('mongoose');
const Product = require('./backend/models/Product');

async function removeImages() {
  await mongoose.connect('mongodb://localhost:27017/ethnickart', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await Product.updateMany({}, { $unset: { image: 1 } });
  console.log('All product images removed!');
  mongoose.disconnect();
}

>>>>>>> 3d99d7d (Initial commit: full-stack ecommerce app with API fixes and deployment configs)
removeImages(); 