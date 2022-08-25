const rescue = require('express-rescue');
const { userService } = require('../services');

module.exports = {
  login: rescue(async (req, res, next) => {
    const { email, password } = req.body;
    const { token, code, message } = await userService.login({
      email, password,
    });
    if (code) return next({ code, message });
    return res.status(200).json({ token });
  }),
};