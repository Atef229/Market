const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAddInput(data) {
  let errors = {};

  data.product_id = !isEmpty(data.product_id) ? data.product_id : '';
  data.name = !isEmpty(data.name) ? data.name : '';
  data.category_name = !isEmpty(data.category_name) ? data.category_name : '';
  data.subcategory_name = !isEmpty(data.subcategory_name) ? data.subcategory_name : '';
  data.price = !isEmpty(data.price) ? data.price : '';

  if (Validator.isEmpty(data.product_id)) {
    errors.product_id = 'Product Id field is required';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.category_name)) {
    errors.category_name = 'Category Name field is required';
  }

  if (Validator.isEmpty(data.subcategory_name)) {
    errors.subcategory_name = 'Subcategory Name field is required';
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = 'Price field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};