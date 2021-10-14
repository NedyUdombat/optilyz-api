import jwt from 'jsonwebtoken';

import variables from '../configs/variables';

const { JWT_SECRET, JWT_EXPIERSIN } = variables;

const jsonResponse = {
  sendSuccess: (res, status, message = '', data = []) =>
    res.status(status).json({ status: 'success', message, ...data }),
  sendError: (res, status, message, data = []) =>
    res.status(status).json({ status: 'error', message, ...data }),
  sendFail: (res, status, message) =>
    res.status(status).json({ status: 'fail', message }),
};

const generateToken = (payload, expiresIn = JWT_EXPIERSIN) =>
  jwt.sign({ ...payload }, JWT_SECRET, { expiresIn });

const verifyToken = token =>
  jwt.verify(token, JWT_SECRET, (err, data) => {
    if (err) {
      return null;
    }
    return data;
  });

export default {
  jsonResponse,
  generateToken,
  verifyToken,
};
