const rescue = require('express-rescue');
const { loginService } = require('../services');

module.exports = {
  login: rescue(async (req, res, next) => {
    const { email, password } = req.body;
    const { data, code, message } = await loginService.login({
      email, password,
    });
    if (message) return next({ code, message });
    return res.status(code).json({ token: data });
  }),
};