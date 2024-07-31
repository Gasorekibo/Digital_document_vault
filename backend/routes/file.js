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

/**
 * @swagger
 * /file/upload:
 *   post:
 *     summary: Upload a document
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Document uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
fileRouter.post(
	'/upload',
	authMiddleware,
	checkSchema(uploadDocCtrl),
	documentUploadMiddleware.single('image'),
	documentResizeMiddleware,
	uploadDocsController
);

/**
 * @swagger
 * /file/all:
 *   get:
 *     summary: Get all documents
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Unauthorized
 */
fileRouter.get('/all', authMiddleware, getAllDocumentController);

/**
 * @swagger
 * /file/category/{category}:
 *   get:
 *     summary: Get documents by category
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Document category
 *     responses:
 *       200:
 *         description: List of documents in the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Unauthorized
 */
fileRouter.get(
	'/category/:category',
	authMiddleware,
	getAllCategorizedDocument
);

/**
 * @swagger
 * /file/delete/{id}:
 *   delete:
 *     summary: Delete a document
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Document ID
 *     responses:
 *       200:
 *         description: Document deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Document not found
 */
fileRouter.delete(
	'/delete/:id',
	authMiddleware,
	deleteDocumentController
);

export default fileRouter;
