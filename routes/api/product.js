const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const uuid = require('uuid');
const moment = require('moment');
const async = require('async');

// Load User model
const Product = require('../../models/Product');
const SubCategory = require('../../models/SubCategory');
const Category = require('../../models/Category');
const Review = require('../../models/Review');
const Order = require('../../models/Order');

// Load Input Validation
const validateAddInput = require('../../validation/add-product');

// @route   GET api/user/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Products Works' }));

// @route   POST api/product/add
// @desc    add product
// @access  Public
var storage = multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, __dirname +'/../../uploads');
    },
    filename: (request, file, callback) => {
   
      callback(null, "product-img" + uuid.v1()+ path.extname(file.originalname))
    }
  });
  
  var upload = multer({ storage: storage })
  let file = upload.array('Images')
  
  router.post('/add',file, (req, res) => {
          const { errors, isValid } = validateAddInput(req.body);
  
          // Check Validation
          if (!isValid) {
         return res.status(400).json(errors);
           }
          let images = req.files.Images ? '/uploads/' +req.files.Images.filename : null
      
          Product.findOne({product_id: req.body.product_id}).then(user => {
            if (user) {
                
              errors.product_id = 'Product ID already Taken';
              return res.status(400).json(errors);
            } else {
             
               Category.findOne({name: req.body.category_name}).then(category_name => {
                console.log(category_name);
                if (!category_name) {
        
                  errors.category_name = 'Category Name not found';
                  return res.status(400).json(errors);
                }else
                     console.log(category_name);
                     //console.log(files.path);
            // let product_id=parseInt((Math.random() * 10000), 10);
              const newProduct = new Product({
                product_id:req.body.product_id,
                name: req.body.name,
                category_name: req.body.category_name,
                subcategory_name: req.body.subcategory_name,
                price: req.body.price,
                color: req.body.color,
                weight: req.body.weight,
                images:req.files,
                Created_at:moment().format('L'+' '+'LTS')
              });
               //console.log(images);
                  newProduct
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            });
            }
          });
        });

// @route   PUT api/product/update/:product_id
// @desc    update product by id 
// @access  public

router.put('/update/:product_id', upload.array('Images'), function (req, res) {
 
  Product.findOne({ product_id: req.params.product_id })
     .then(product => {
       if (!product) {
         res.status(404).json('product not found');
       }else
       if(req.files){
         user = req.params.name,
         req.params.product_id,
         req.params.category_name,
         req.params.subcategory_name,
         req.params.price,
         req.params.color,
         req.params.weight,
         images = req.files;

         Product.findOneAndUpdate({product_id: req.params.product_id}
         ,{images}, {new: true},
          function (err, product) {
           res.status(200).send(product);
           
       });
     }else
     Product.findOneAndUpdate({product_id: req.params.product_id}
      ,req.body, {new: true},
       function (err, product) {
        res.status(200).send(product);;
     });
     })
 });

// @route   GET api/product/all
// @desc    Get all product
// @access  Public
router.get('/all', (req, res) => {
  // const errors = {};
  // sort by alphabetical, descending
   Product.find().sort({ Created_at: -1 })// sort by Created_at, descending
     .then(product => {
       if (!product) {
         return res.status(404).json({ product: 'There are no product' });
       }
 
       res.json(product);
     })
     .catch(err => res.status(404).json({ product: 'There are no product' }));
 });

// @route   GET api/product/all/page
// @desc    Get all product ber page
// @access  Public
router.get('/all/page', (req, res, next) => {
  const perPage = 1;
  const page = req.query.page;
  async.parallel([
    function(callback) {
      Product.count({}, (err, count) => {
        var totalProducts = count;
        callback(err, totalProducts);
      });
    },
    function(callback) {
      Product.find({}).sort({ Created_at: -1 })// sort by Created_at, descending
      // .deepPopulate('reviews')
        .skip(perPage * page)
        .limit(perPage)
        .exec((err, products) => {
          if(err) return next(err);
          callback(err, products);
        });
    }
  ], function(err, results) {
    var totalProducts = results[0];
    var products = results[1];
   
    res.json({
      // success: true,
      // message: 'category',
      products: products,
      totalProducts: totalProducts,
      pages: Math.ceil(totalProducts / perPage)
    });
  });
  
});

// @route   GET api/product/:product_id
// @desc    Get product by product ID
// @access  Public
router.get('/:product_id', (req, res) => {
  const errors = {};

  Product.find({ product_id: req.params.product_id })
    .deepPopulate('reviews')
    .then(product => {
      if (product==0) {
        errors.product_id = 'No Product Found';
        res.status(404).json(errors);
      }

      res.json(product);
    })
    .catch(err =>
      res.status(404).json({ product: 'No Product Found' })
    );

});

// @route   GET api/product/search
// @desc    Get  product by name search
// @access  Public
router.get('/search/:name',function(req, res) {
  const errors = {};
Product.find({$or:[
   {name: new RegExp(req.params.name)},
   {subcategory_name: new RegExp(req.params.name)}
  ]})
.then(product => {
  if (product==0) {
    errors.name= 'No Product Found';
    res.status(404).json(errors);
  }

  res.json(product);
})
.catch(err =>
  res.status(404).json({ product: 'no product found' })
);
})

// @route   DELETE api/product/delete/:product_id
// @desc    delete product
// @access  public
router.delete('/delete/:product_id', function (req, res) { 
  Product.findOne({ product_id: req.params.product_id })
  .then(product => {
    if (!product) {
      res.status(404).json('product not found');
    }else 
  Product.findOneAndRemove({product_id: req.params.product_id},
  function (err) {
  if (err) return res.status(500).send("There was a problem deleting the product.");
  res.status(200).send("product was deleted.");
});
  })
});

// @route   POST api/product/review/:_id
// @desc    add review
// @access  Public
router.post('/review/:_id', (req, res, next) => {
  async.waterfall([
    function(callback) {
      Product.findOne({ product_id: req.body.product_id}, (err, product) => {
        if (product) {
          callback(err, product);
        }
      });
    },
    function(product) {
      let review = new Review();
      review.owner = req.params._id;

      if (req.body.title) review.title = req.body.title;
      if (req.body.description) review.description = req.body.description
      review.rating = req.body.rating;

      product.reviews.push(review._id);
      product.save();
      review.save();
      res.json({
        success: true,
        message: "Successfully added the review"
      });
    }
  ]);
});

module.exports = router;