import utils from '../utils/helpers';

const {
  jsonResponse: { sendError },
  verifyToken,
} = utils;

export function checkAuthorizedUser(req, res, next) {
  const bearerToken =
    req.headers.authorization || req.headers['x-access-token'];

  if (!bearerToken) {
    return sendError(res, 401, 'Please provide a JWT token');
  }

  req.user = verifyToken(bearerToken.split(' ')[1]);
  if (!req.user) {
    return sendError(
      res,
      401,
      'Token is invalid, please provide a valid token',
    );
  }
  next();
}
