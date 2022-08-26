const rescue = require('express-rescue');
const { postServices } = require('../services');

module.exports = {
  create: rescue(async (req, res, next) => {
    const { title, content, categoryIds } = req.body;
    const { userId } = req.user;
    const { data, code, message } = await postServices.create(userId, {
      title, content, categoryIds,
    });
    if (message) return next({ code, message });
    return res.status(code).json(data);
  }),
};