const express = require('express');

const router = express.Router();

const { userController } = require('../controllers');
const Middleware = require('../middleware');

router.post('/', userController.create);

router.use(Middleware.auth);
router.get('/', userController.getAll);
router.get('/:id', userController.findById);
router.delete('/me', userController.delete);

module.exports = router;
