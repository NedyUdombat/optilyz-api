import bcrypt from 'bcrypt';

import User from '../models/user';
import utils from '../utils/helpers';

const {
  jsonResponse: { sendSuccess, sendError },
  generateToken,
} = utils;

const create = async (req, res) => {
  const {
    body: { name, email, password },
  } = req;

  const userExists = await User.findOne({ email: email.toLowerCase() });

  if (userExists) {
    return sendError(res, 409, 'This user already exists.');
  }

  const user = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
  });

  delete user._doc.password;

  const payload = Object.assign({}, user._doc);
  delete payload.password;

  return sendSuccess(res, 201, 'Your account has been successfully created.', {
    user,
  });
};

const authenticate = async (req, res) => {
  const {
    body: { email, password },
  } = req;

  const userExists = await User.findOne({ email: email.toLowerCase() });

  if (!userExists) {
    return sendError(
      res,
      404,
      'This user does not exist, please create an account',
    );
  }

  if (!bcrypt.compareSync(password, userExists.password))
    return sendError(res, 401, 'Password is incorrect');

  const payload = Object.assign({}, userExists._doc);
  delete payload.password;

  return sendSuccess(res, 201, 'Successfully Logged In', {
    token: generateToken(payload),
    user: payload,
  });
};

export default {
  create,
  authenticate,
};
