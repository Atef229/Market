const express = require('express');
const router = express.Router();

// Load User model
const Category = require('../../models/Category');

// Load Input Validation
const validateAddInput = require('../../validation/add-category');

// @route   GET api/user/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Categoryies Works' }));

// @route   POST api/category/add
// @desc    category
// @access  Public
router.post('/add',(req, res) => {
    const { errors, isValid } = validateAddInput(req.body);
    
      // Check Validation
      if (!isValid) {
     return res.status(400).json(errors);
       } 
       
    Category.findOne({name: req.body.name}).then(category => {
        if (category) {
            
            errors.name = 'Category name already Taken';
            return res.status(400).json(errors);
        } else {
            let category_id=parseInt((Math.random() * 1000), 10);
            const newCategory = new Category({
            //Category
            category_id:category_id,
            name: req.body.name,
            });
                newCategory
                .save()
                .then(category => res.json(category))
                .catch(err => console.log(err));

        }
        });
    });

// @route   GET api/category/all
// @desc    Get all category
// @access  Public
router.get('/all', (req, res) => {
     const errors = {};
     Category.find().sort({ name: 1 })// sort by alphabetical, descending
    .then(category => {
        if (!category) {
        return res.status(404).json({ category: 'There are no category' });
        }

        res.json(category);
    })
    .catch(err => res.status(404).json({ category: 'There are no category' }));
});

// @route   GET api/category/:category_id
// @desc    Get category by category ID
// @access  Public
router.get('/:category_id', (req, res) => {
    const errors = {};
    Category.find({ category_id: req.params.category_id })
    .then(category => {
        if (category==0) {
        errors.category_id = 'Category Not Found';
        res.status(404).json(errors);
        }

        res.json(category);
    })
    .catch(err =>
        res.status(404).json({ category: 'no category found' })
    );
});

// @route   GET api/category/search
// @desc    Get  category by name search
// @access  Public
router.get('/search/:name',function(req, res) {
    const errors = {};
   Category.find({ name: new RegExp(req.params.name)})
   .then(category => {
     if (category==0) {
       errors.name= 'No Category Found';
       res.status(404).json(errors);
     }
   
     res.json(category);
   })
   .catch(err =>
     res.status(404).json({ category: 'no category found' })
   );
   });

// @route   DELETE api/category/delete/:category_id
// @desc    delete category
// @access  public
router.delete('/delete/:category_id', function (req, res) { 
    Category.findOne({ category_id: req.params.category_id })
    .then(category => {
      if (!category) {
        res.status(404).json('category not found');
      }else 
    Category.findOneAndRemove({category_id: req.params.category_id},
    function (err) {
    if (err) return res.status(500).send("There was a problem deleting the category.");
    res.status(200).send("category was deleted.");
  });
  })
  });

module.exports = router;