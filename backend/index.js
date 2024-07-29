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
// Initialize express app
const app = express();
app.use(express.json());

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
      secure: false,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      sameSite: 'lax',
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
app.get('/', (req, res) => {
  res.send('Hello, World!');
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
