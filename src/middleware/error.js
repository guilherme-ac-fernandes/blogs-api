const { INTERNAL_SERVER_ERROR } = require('../services/helpers/codes');

module.exports = (err, _req, res, _next) => {
  // console.log('erro:', err);

  if (err.code) {
    return res.status(err.code).json({ message: err.message });
  }

  console.error(err);
  return res.status(INTERNAL_SERVER_ERROR).json({
    error: { code: 'internal', message: 'Internal server error' },
  });
};