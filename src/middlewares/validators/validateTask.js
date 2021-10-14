import { check } from 'express-validator/check';

const isDate = date => {
  const timestamp = Date.parse(date);
  return !Number.isNaN(Number(timestamp));
};

export const validateTask = [
  check('title', 'A valid title is required')
    .exists()
    .isString()
    .isLength({ min: 3 }),
  check('description', 'A valid description is required')
    .exists()
    .isString()
    .isLength({ min: 3 }),
  check('deadline', 'A valid deadline is required')
    .exists()
    .custom(isDate),
  check('notificationTime', 'A valid notification time is required')
    .exists()
    .custom(isDate),
];

export default validateTask;
