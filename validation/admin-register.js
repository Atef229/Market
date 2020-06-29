const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
  data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';


  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = 'First Name field is required';
  }

  if (!Validator.isLength(data.first_name, { min: 2, max: 30 })) {
    errors.first_name = 'First Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.last_name)) {
    errors.last_name = 'Last Name field is required';
  }

  if (!Validator.isLength(data.last_name, { min: 2, max: 30 })) {
    errors.last_name = 'Last Name must be between 2 and 30 characters';
  }


  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }

  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = 'Username must be between 2 and 30 characters';
  }


  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }


  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }



  return {
    errors,
    isValid: isEmpty(errors)
  };
};