const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { protect } = require('../middleware/authMiddleware');
const ApiError = require('../utils/ApiError');

const router = express.Router();

// Ensure upload directory exists in client/public/images/products/uploads
const uploadDir = path.join(__dirname, '../../client/public/images/products/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '_');
    cb(null, `${Date.now()}_${basename}${ext.toLowerCase()}`);
  }
});

// File filter — only image MIME types
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

/**
 * POST /api/upload
 * Handles device image upload and returns public relative URL path.
 */
router.post('/', protect, upload.single('image'), (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'Please select an image file to upload.');
  }

  const imagePath = `/images/products/uploads/${req.file.filename}`;
  res.status(200).json({
    success: true,
    image: imagePath,
    data: { image: imagePath }
  });
});

module.exports = router;
