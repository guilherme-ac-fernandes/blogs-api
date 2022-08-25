const rescue = require('express-rescue');
const { userService } = require('../services');

module.exports = {
  create: rescue(async (req, res, next) => {
    const { email, password } = req.body;
    const { token, code, message } = await userService.create({
      email, password,
    });
    if (code) return next({ code, message });
    return res.status(200).json({ token });
  }),
};