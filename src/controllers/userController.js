const rescue = require('express-rescue');
const { userService } = require('../services');

module.exports = {
  login: rescue(async (req, res, next) => {
    const { email, password } = req.body;
    const { data, code, message } = await userService.login({
      email, password,
    });
    if (code) return next({ code, message });
    return res.status(code).json({ data });
  }),
  create: rescue(async (req, res, next) => {
    const { displayName, email, password, image } = req.body;
    const { data, code, message } = await userService.create({
      displayName, email, password, image,
    });
    if (code) return next({ code, message });
    return res.status(code).json({ data });
  }),
  getAll: rescue(async (_req, res, next) => {
    const { data, code, message } = await userService.getAll();
    if (message) return next({ code, message });
    return res.status(code).json(data);
  }),
};