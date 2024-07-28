import expressAsyncHandler from 'express-async-handler';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

// Ensure the directory exists
const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  fs.mkdirSync(dirname, { recursive: true });
  return true;
};

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb({ msg: 'unsupported image format.' }, false);
  }
};

// configure our middleware
const documentUploadMiddleware = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 60000000, // Max 60MB
  },
});

const documentResizeMiddleware = expressAsyncHandler(async (req, res, next) => {
  if (!req.file) {
    next();
  } else {
    req.file.filename = `user-${Date.now()}-${req.file.originalname}`;
    const outputPath = path.join('public', 'images', 'document', req.file.filename);

    ensureDirectoryExistence(outputPath);

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({
        quality: 90,
      })
      .toFile(outputPath);

    next();
  }
});

export { documentUploadMiddleware, documentResizeMiddleware };
