const rescue = require('express-rescue');
const { categoryService } = require('../services');

module.exports = {
  create: rescue(async (req, res, next) => {
    const { name } = req.body;
    const { data, code, message } = await categoryService.create({ name });
    if (message) return next({ code, message });
    return res.status(code).json({ ...data });
  }),
};