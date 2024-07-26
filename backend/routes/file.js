import express from 'express';
import {
  uploadDocsController,
  getAllDocumentController,
  getAllCategorizedDocument,
} from '../controllers/uploadDoc.js';
import { checkSchema } from 'express-validator';
import { uploadDocCtrl } from '../middlewares/fileValidator.js';
import {
  documentUploadMiddleware,
  documentResizeMiddleware,
} from '../middlewares/fileUpload.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const fileRouter = express.Router();

fileRouter.post(
  '/upload',
  checkSchema(uploadDocCtrl),
  documentUploadMiddleware.single('image'),
  documentResizeMiddleware,
  authMiddleware,
  uploadDocsController
);

fileRouter.get('/all', getAllDocumentController);
fileRouter.get('/category/:category', getAllCategorizedDocument);

export default fileRouter;
