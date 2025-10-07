const { validationResult } = require('express-validator');
const { sendContactEmail } = require('../utils/email');

// @desc    Send contact form
// @route   POST /api/contact
// @access  Public
exports.sendContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    // Send email to admin
    await sendContactEmail({ name, email, subject, message });

    res.status(200).json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    next(error);
  }
};