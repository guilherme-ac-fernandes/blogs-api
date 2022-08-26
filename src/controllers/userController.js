const rescue = require('express-rescue');
const { userService } = require('../services');

module.exports = {
  login: rescue(async (req, res, next) => {
    const { email, password } = req.body;
    const { data, code, message } = await userService.login({
      email, password,
    });
    if (message) return next({ code, message });
    return res.status(code).json({ token: data });
  }),

  create: rescue(async (req, res, next) => {
    const { displayName, email, password, image } = req.body;
    const { data, code, message } = await userService.create({
      displayName, email, password, image,
    });
    if (message) return next({ code, message });
    return res.status(code).json({ token: data });
  }),

  getAll: rescue(async (_req, res, next) => {
    const { data, code, message } = await userService.getAll();
    if (message) return next({ code, message });
    return res.status(code).json(data);
  }),

  findById: rescue(async (req, res, next) => {
    const { id } = req.params;
    const { data, code, message } = await userService.findById(id);
    if (message) return next({ code, message });
    return res.status(code).json(data);
  }),
};