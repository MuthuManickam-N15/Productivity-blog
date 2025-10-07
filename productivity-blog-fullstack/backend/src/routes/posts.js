const express = require('express');
const { body } = require('express-validator');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(getPosts)
  .post(
    protect,
    authorize('admin'),
    [
      body('title').trim().notEmpty().withMessage('Title is required'),
      body('excerpt').trim().notEmpty().withMessage('Excerpt is required'),
      body('content').trim().notEmpty().withMessage('Content is required'),
      body('category').trim().notEmpty().withMessage('Category is required'),
      body('image').trim().notEmpty().withMessage('Image is required'),
    ],
    createPost
  );

router
  .route('/:slug')
  .get(getPost);

router
  .route('/id/:id')
  .put(protect, authorize('admin'), updatePost)
  .delete(protect, authorize('admin'), deletePost);

module.exports = router;