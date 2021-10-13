const jsonResponse = {
  sendSuccess: (res, status, message = '', data = []) =>
    res.status(status).json({ status: 'success', message, ...data }),
  sendError: (res, status, message, data = []) =>
    res.status(status).json({ status: 'error', message: message, ...data }),
  sendFail: (res, status, message) =>
    res.status(status).json({ status: 'fail', message: message }),
};

export default {
  jsonResponse,
};
