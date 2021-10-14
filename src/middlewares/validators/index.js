import { validationResult } from 'express-validator/check';

/** Util(s) */
import utils from '../../utils/helpers';

/** Validator(s) */
import validateTask from './validateTask';
import validateUser from './validateUser';

const {
  jsonResponse: { sendError },
} = utils;

const getErrors = (req, next) => {
  const errors = validationResult(req)
    .array()
    .map(error => error.msg);
  if (!errors.length) {
    return next();
  }
  return errors;
};

const handleValidation = async (req, res, next) => {
  let result = getErrors(req, next);
  if (result) result = [...new Set(getErrors(req, next))];
  return Array.isArray(result) ? sendError(res, 400, result) : result;
};

export default {
  handleValidation,
  validateUser,
  validateTask,
};
