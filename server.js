const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const user = require('./routes/api/user');
const admin = require('./routes/api/admin');
const category = require('./routes/api/category');
const subcategory = require('./routes/api/subcategory');
const product = require('./routes/api/product');
const cart = require('./routes/api/cart');
const order = require('./routes/api/order');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db,{ useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));




// Use Routes
app.use('/api/user', user);
app.use('/api/admin', admin);
app.use('/api/category', category);
app.use('/api/subcategory', subcategory);
app.use('/api/product', product);
app.use('/api/cart', cart);
app.use('/api/order', order);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));