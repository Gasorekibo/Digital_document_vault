import { matchedData, validationResult } from 'express-validator';
import { comparePassword, hashPass } from '../utils/helpers.js';
import User from '../models/user.js';
import errorHandler from '../utils/errorHandler.js';
import jwt from 'jsonwebtoken';
import addUserJob from '../producers/getAllCustomerQueue.js';

/**
 * Logs in a user.
 *
 * @async
 * @function loginUser
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>}
 */
const loginUser = async (req, res) => {
	try {
		const result = validationResult(req);

		if (!result.isEmpty()) {
			return res
				.status(400)
				.json({ error: req.t(result.errors[0].msg) });
		}

		const data = matchedData(req);
		const user = await User.findOne({ email: data.email });

		if (!user) {
			return res
				.status(401)
				.json({ error: req.t('Incorrect email or password') });
		}

		const passwordMatches = await comparePassword(
			data.password,
			user.password
		);

		if (!passwordMatches) {
			return res
				.status(401)
				.json({ error: req.t('Incorrect email or password') });
		}

		const JWT_SECRET = process.env.JWT_SECRET;
		const token = await jwt.sign({ id: user._id }, JWT_SECRET, {
			expiresIn: '1d',
		});

		res.status(200).json({
			msg: req.t('User logged in successfully!'),
			token,
		});
	} catch (error) {
		errorHandler(req, res, error);
	}
};

/**
 * Registers a new user.
 *
 * @async
 * @function registerUser
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>}
 */
const registerUser = async (req, res) => {
	try {
		const result = validationResult(req);

		if (!result.isEmpty()) {
			return res
				.status(400)
				.json({ error: req.t(result.errors[0].msg) });
		}

		const data = matchedData(req);
		const password = data.password;

		const hashedPassword = await hashPass(password);
		//

		if (!hashedPassword) {
			return res
				.status(500)
				.json({ err: req.t('Something went wrong') });
		}

		data.password = hashedPassword;
		const newUser = await User.create(data);
		req.session.user = newUser;

		return res.status(201).json({
			msg: req.t('User registered successfully!'),
			newUser: {
				firstname: newUser.firstname,
				lastname: newUser.lastname,
				email: newUser.email,
			},
		});
	} catch (error) {
		errorHandler(req, res, error);
	}
};

/**
 * Retrieves all users.
 *
 * @async
 * @function getAllUsers
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>}
 */
const getAllUsers = async (req, res) => {
	try {
		// const userId = req.userId;
		// const user = await User.findById(userId);
		// if (!user || user.isAdmin === false) {
		// 	return res.status(403).json({
		// 		msg: req.t(
		// 			'You are not allowed to perform this action'
		// 		),
		// 	});
		// }
		// const users = await User.find({}, 'firstname lastname email');
		// if (users) {
		// 	res.status(200).json({ users });
		// }

		addUserJob(req, res);
	} catch (error) {
		errorHandler(req, res, error);
	}
};

export { loginUser, registerUser, getAllUsers };
