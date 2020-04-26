const Validator = require('validator')
const isEmpty = require('./isEmpty')

const validateRegisterInput = ({ username, email, password, password2 }) => {
  let errors = {}

  username = !isEmpty(username) ? username : ''
  email = !isEmpty(email) ? email : ''
  password = !isEmpty(password) ? password : ''
  password2 = !isEmpty(password2) ? password2 : ''

  if (!Validator.isLength(username, { min: 2, max: 30 })) {
    errors.username = 'Username must be between 2 and 30 characters'
  }

  if (Validator.isEmpty(username)) {
    errors.username = 'Username field is required'
  }

  if (!Validator.isEmail(email)) {
    errors.email = 'Email is invalid'
  }

  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is required'
  }

  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters'
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required'
  }

  if (!Validator.equals(password, password2)) {
    errors.password2 = 'Passwords must match'
  }

  if (Validator.isEmpty(password2)) {
    errors.password2 = 'Confirm password field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}

module.exports = validateRegisterInput
