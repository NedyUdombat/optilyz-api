const jsonResponse = {
  sendSuccess: (res, status, message = '', data = []) =>
    res.status(status).json({ status: 'success', message, ...data }),
  sendError: (res, status, message, data = []) =>
    res.status(status).json({ status: 'error', message, ...data }),
  sendFail: (res, status, message) =>
    res.status(status).json({ status: 'fail', message }),
};

export default {
  jsonResponse,
};
