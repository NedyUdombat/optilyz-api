import { check } from 'express-validator/check';

export const validateUserRegistration = [
  check('name', 'A valid full name is required')
    .exists()
    .isString()
    .isLength({ min: 4 }),
  check('email', 'A valid email is required')
    .exists()
    .isString()
    .isEmail()
    .isLength({ min: 5, max: 30 }),
  check('password', 'A valid password is required')
    .exists()
    .trim()
    .isString()
    .isLength({ min: 5, max: 30 }),
];

export const validateUserAuthentication = [
  check('email', 'A valid email is required')
    .exists()
    .isString()
    .isEmail()
    .isLength({ min: 5, max: 30 }),
  check('password', 'A valid password is required')
    .exists()
    .trim()
    .isString()
    .isLength({ min: 5, max: 30 }),
];

export default { validateUserRegistration, validateUserAuthentication };
