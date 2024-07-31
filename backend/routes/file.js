import express from 'express';
import {
  uploadDocsController,
  getAllDocumentController,
  getAllCategorizedDocument,
  deleteDocumentController,
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
  authMiddleware,
  checkSchema(uploadDocCtrl),
  documentUploadMiddleware.single('image'),
  documentResizeMiddleware,
  uploadDocsController
);

fileRouter.get('/all', authMiddleware, getAllDocumentController);
fileRouter.get(
  '/category/:category',
  authMiddleware,
  getAllCategorizedDocument
);
fileRouter.delete('/delete/:id', authMiddleware, deleteDocumentController);

export default fileRouter;
