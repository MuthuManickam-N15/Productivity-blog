const express = require('express');
const upload = require('../middleware/upload');
const { uploadImage } = require('../utils/cloudinary');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @desc    Upload image
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protect, authorize('admin'), upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file',
      });
    }

    const result = await uploadImage(req.file);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;