import express from 'express';
import { uploadDocsController } from '../controllers/uploadDoc.js';
import { checkSchema } from 'express-validator';
import { uploadDocCtrl } from '../middlewares/fileValidator.js';
import {
  documentUploadMiddleware,
  documentResizeMiddleware,
} from '../middlewares/fileUpload.js';

const fileRouter = express.Router();

fileRouter.post(
  '/upload',
  checkSchema(uploadDocCtrl),
  documentUploadMiddleware.single('image'),
  documentResizeMiddleware,
  uploadDocsController
);

export default fileRouter;
