const express = require('express');

const router = express.Router();

const { postController } = require('../controllers');
const Middleware = require('../middleware');

router.use(Middleware.auth);
router.post('/', postController.create);
router.get('/', postController.getAll);
router.get('/search', postController.search);
router.get('/:id', postController.findById);
router.put('/:id', postController.update);
router.delete('/:id', postController.delete);

module.exports = router;
