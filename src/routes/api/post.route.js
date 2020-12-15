const express = require('express');
const { validate } = require('express-validation');
const postController = require('../../controllers/post.controller');
const {
  createPostValidation,
  editPostValidation,
  deletePostValidation,
  getPostValidation,
} = require('../../validations/post.validation');

const router = express.Router();

// GET /api/posts
router.route('/')
  .get(postController.listPost);

// POST /api/posts
router.route('/')
  .post(validate(createPostValidation, { keyByField: true }), postController.createPost);

// GET /api/posts/:id
router.route('/:id')
  .get(validate(getPostValidation), postController.showPost)
  .put(validate(editPostValidation), postController.editPost)
  .delete(validate(deletePostValidation), postController.deletePost);

module.exports = router;
