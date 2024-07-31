import express from 'express';
import {
	getAllUsers,
	loginUser,
	registerUser,
} from '../controllers/user.js';
import { checkSchema } from 'express-validator';
import {
	loginUserValidator,
	createUserValidator,
} from '../middlewares/userValidator.js';
import { authenticateJWT } from '../utils/helpers.js';

const router = express.Router();

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: The authenticated user object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/login', checkSchema(loginUserValidator), loginUser);

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: "John"
 *               lastname:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: The registered user object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Validation error
 */
router.post(
	'/register',
	checkSchema(createUserValidator),
	registerUser
);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retrieve all registered users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: An array of all registered users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Server error
 */
router.get('/', authenticateJWT, getAllUsers);

export default router;
