const express = require('express');
const { body } = require('express-validator');
const {
  getComments,
  createComment,
  approveComment,
  deleteComment,
} = require('../controllers/commentController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
  .route('/:postId')
  .get(getComments);

router
  .route('/')
  .post(
    [
      body('postSlug').trim().notEmpty().withMessage('Post slug is required'),
      body('author').trim().notEmpty().withMessage('Name is required'),
      body('email').isEmail().withMessage('Please provide a valid email'),
      body('content').trim().notEmpty().withMessage('Comment content is required'),
    ],
    createComment
  );

router
  .route('/:id/approve')
  .put(protect, authorize('admin'), approveComment);

router
  .route('/:id')
  .delete(protect, authorize('admin'), deleteComment);

module.exports = router;