const express = require('express');

const { postController } = require('../controllers');
const Middleware = require('../middleware');

const router = express.Router();

router.use(Middleware.auth);
router.post('/', postController.create);
router.get('/', postController.getAll);
router.get('/search', postController.search);
router.get('/:id', postController.findById);
router.put('/:id', postController.update);
router.delete('/:id', postController.delete);

module.exports = router;
