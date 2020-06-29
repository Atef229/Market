const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAddInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.category_name = !isEmpty(data.category_name) ? data.category_name : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

    if (Validator.isEmpty(data.category_name)) {
    errors.category_name = 'Category Name field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};