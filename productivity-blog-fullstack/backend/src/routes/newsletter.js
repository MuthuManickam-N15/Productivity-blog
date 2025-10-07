const express = require('express');
const { body } = require('express-validator');
const { subscribe, unsubscribe } = require('../controllers/newsletterController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post(
  '/subscribe',
  [body('email').isEmail().withMessage('Please provide a valid email')],
  subscribe
);

router.post('/unsubscribe', unsubscribe);

router.get('/subscribers', protect, authorize('admin'), getSubscribers);


module.exports = router;