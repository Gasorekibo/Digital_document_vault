import { matchedData, validationResult } from 'express-validator';
import { comparePassword, hashPass } from '../utils/helpers.js';
import User from '../models/user.js';
import errorHandler from '../utils/errorHandler.js';
import { registerUserQueue } from '../utils/producer.js';
import { registrationWorker } from '../utils/consumer.js';

/**
 * Logs in a user
 * @param {Object} req - The Express request object
 * @param {Object} res - The Express response object
 * @returns {Promise<void>}
 */
const loginUser = async (req, res) => {
	try {
		const result = validationResult(req);

		if (!result.isEmpty()) {
			return res
				.status(400)
				.json({ error: result.errors[0].msg });
		}

		const data = matchedData(req);

		const user = await User.findOne({ email: data.email });
		if (!user)
			return res
				.status(401)
				.json({ error: 'Incorect email or password' });
		const passwordMatches = await comparePassword(
			data.password,
			user.password
		);

		if (!passwordMatches)
			return res
				.status(401)
				.json({ error: 'Incorrect email or password' });

		req.session.user = user;
		res.status(200).json({ msg: 'User Loged in successfully!' });
	} catch (error) {
		errorHandler(req, res, error);
	}
};

/**
 * Registers a new user
 * @param {Object} req - The Express request object
 * @param {Object} res - The Express response object
 * @returns {Promise<void>}
 */
const registerUser = async (req, res) => {
	try {
		const result = validationResult(req);

		if (!result.isEmpty()) {
			return res
				.status(400)
				.json({ error: result.errors[0].msg });
		}

		const data = matchedData(req);

		await registerUserQueue(req, res, data); // Send data to the queue for processing
	} catch (error) {
		errorHandler(req, res, error);
	}
};

/**
 * Retrieves all users
 * @param {Object} req - The Express request object
 * @param {Object} res - The Express response object
 * @returns {Promise<void>}
 */
const getAllUsers = async (req, res) => {
	try {
		const user = req.session.user;

		if (!user.isAdmin)
			return res.status(403).json({
				error: 'You are not allowed to perform this action',
			});
		const users = await User.find({}, 'firstname lastname email');
		if (users) res.status(200).json({ users });
	} catch (error) {
		errorHandler(req, res, error);
	}
};

export { loginUser, registerUser, getAllUsers };
