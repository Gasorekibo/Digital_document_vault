import express from 'express';
import userRouter from './routes/user.js';
import dotenv from 'dotenv';
import createDbConnection from './utils/connect_db.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import googleAuthRouter from './routes/auth2.js';
import passport from 'passport';
import fileRouter from './routes/file.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { authenticateJWT } from './utils/helpers.js';
import User from './models/user.js';
import i18next from 'i18next';
import i18nextBackend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

i18next
	.use(i18nextBackend)
	.use(i18nextMiddleware.LanguageDetector)
	.init({
		fallbackLng: 'en',
		backend: {
			loadPath: './locales/{{lng}}/translation.json',
		},
	});
// Initialize express app
const app = express();

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'My API',
		version: '1.0.0',
		description: 'A description of my API',
	},
	servers: [
		{
			url: 'http://localhost:3000',
			description: 'Local server',
		},
	],
};

// Options for the swagger docs
const options = {
	swaggerDefinition,
	apis: ['./routes/*.js'], // Path to the API docs
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Set up Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(i18nextMiddleware.handle(i18next));
app.use(express.json());

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const allowedOrigins = [
	'http://127.0.0.1:5500',
	'http://localhost:5173',
];

app.use(
	cors({
		origin: allowedOrigins,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true, // Allow credentials
	})
);

// Configure session with MongoDB store
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		saveUninitialized: false,
		resave: false,
		store: MongoStore.create({
			mongoUrl: process.env.MONGODB_URI,
		}),
		cookie: {
			maxAge: 60000 * 60 * 48, // 48 hours
			secure: false, // Set to true if using HTTPS
			sameSite: 'lax', // Adjust based on needs
		},
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	})
);
// Load environment variables
dotenv.config();

// Connect to the database
createDbConnection();

// Set up routes
app.use('/user', userRouter);
app.use('/auth', googleAuthRouter);
app.use('/file', fileRouter);

/**
 * @route GET /
 * @description Renders the home page
 * @access Public
 */
app.get('/', authenticateJWT, async (req, res) => {
	console.log(req.cookies);
	const userId = req.userId;
	console.log(`USER ID: ${userId}`);
	const user = await User.findById(userId);
	console.log(user);
	if (!user) return res.status(401).json({ msg: 'User not found' });
	res.json({ message: 'Welcome to the Digital Document Vault!' });
});

/**
 * @route POST /upload
 * @description Handles file uploads
 * @access Public
 */

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`SERVER IS STARTED AND IS RUNNING ON PORT: ${PORT}`);
});

export default app;
