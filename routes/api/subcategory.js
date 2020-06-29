const express = require('express');
const router = express.Router();

// Load User model
const SubCategory = require('../../models/SubCategory');
const Category = require('../../models/Category');

// Load Input Validation
const validateAddInput = require('../../validation/add-subcategory');

// @route   GET api/user/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'SubCategory Works' }));

// @route   POST api/subcategoty/add
// @desc    subcategoty
// @access  Public
router.post('/add',(req, res) => {
    const { errors, isValid } = validateAddInput(req.body);
    
      // Check Validation
      if (!isValid) {
     return res.status(400).json(errors);
       } 
      SubCategory.findOne({name: req.body.name}).then(subCategory => {
            if (subCategory) {
              
              errors.name = 'Name already Taken';
              return res.status(400).json(errors);
            } else {
            let subcategory_id=parseInt((Math.random() * 1000), 10);
              const newSubCategory =
               new SubCategory
              ({
                //subCategory
                subcategory_id:subcategory_id,
                name: req.body.name,
                category_name: req.body.category_name,
              })
              newSubCategory
              .save()
              .then(subCategory => res.json(subCategory))
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });

              name = newSubCategory.category_name 
            Category.findOne({ name: newSubCategory.category_name })   
          .then(subCategory => {
              console.log(subCategory);
              
              if(name){
                console.log(name);
            if (!subCategory) {
              errors.name = 'Category not found';
              res.status(404).json(errors);
              name = subCategory.name
              this.name;
               }else{
            res.json(subCategory);
  
            Category.findOne({ name: newSubCategory.category_name }) 
            .then(categories => {
                console.log(categories);
                
                const subcategoty ={
                    //subcategoty
                  //category_name: newSubCategory.category_name,
                  name: newSubCategory.name,
                  subcategory_id: newSubCategory.subcategory_id,
                  category_name: newSubCategory.category_name,
                  function (err, newSubCategory) {
                  res.status(200).send(newSubCategory);
                  }};
                  console.log(subcategoty);
                  categories.sub_categories.unshift(subcategoty);
                  console.log(subcategoty);
                  categories.save().then(categories => res.json(categories));
                  
                })
        }
           }
          }); 
        }
        }); 
        });

// @route   GET api/subcategory/all/:category_name
// @desc    Get all subcategory
// @access  Public
router.get('/all/:category_name', (req, res) => {
     const errors = {};
    SubCategory.find({ category_name: req.params.category_name })
    .then(category => {
        console.log(category);
        
        if (category==0) {
        errors.category_name = 'Category Not Found';
        res.status(404).json(errors);
        }

        res.json(category);
    })
    .catch(err =>
        res.status(404).json({ category: 'no category found' })
    );
});

// @route   GET api/subcategory/:name
// @desc    Get all subcategory
// @access  Public 
// get all subcategories with out category data
router.get('/all', (req, res) => {
  const errors = {};
  SubCategory.find({})
 //.select('sub_categories')
 //.select({'sub_categories.name':1})
 .then(category => {
    //  console.log(category);
     
     if (category==0) {
     errors.category_name = 'Category Not Found';
     res.status(404).json(errors);
     }



     res.json(category);
 })
 .catch(err =>
     res.status(404).json({ category: 'no category found' })
 );
});

// @route   DELETE api/subcategory/delete/:category_id
// @desc    delete subcategory
// @access  public
router.delete('/delete/:category_id/:subcategory_id',(req, res) => {
      Category.findOne({ category_id: req.params.category_id })
        .then(subcategoty => {
          // Get remove index
          const removeIndex = subcategoty.sub_categories
            .map(item => item.subcategory_id)
            .indexOf(req.params.subcategory_id);
  
          // Splice out of array
          subcategoty.sub_categories.splice(removeIndex, 1);
  
          // Save
          subcategoty.save().then(subcategoty => res.json(subcategoty));
        })
        .catch(err => res.status(404).json(err));
    }
  );


module.exports = router;