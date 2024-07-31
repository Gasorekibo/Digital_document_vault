import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Hashes a password using bcrypt.
 * @async
 * @function hashPass
 * @param {string} password - The plain text password to be hashed.
 * @returns {Promise<string>} - A promise that resolves to the hashed password.
 * @throws {Error} - If hashing fails.
 */
const hashPass = async (password) => {
	const salt = await bcryptjs.genSalt();
	const hashedPassword = await bcryptjs.hash(password, salt);
	return hashedPassword;
};

/**
 * Compares a plain text password with a hashed password.
 * @async
 * @function comparePassword
 * @param {string} password - The plain text password to compare.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} - A promise that resolves to true if the passwords match, otherwise false.
 * @throws {Error} - If comparison fails.
 */
const comparePassword = async (password, hashedPassword) => {
	const passwordMatches = await bcryptjs.compare(
		password,
		hashedPassword
	);
	return passwordMatches;
};

/**
 * Middleware to authenticate JWT.
 * @async
 * @function authenticateJWT
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {void}
 * @throws {Error} - If authentication fails.
 */
const authenticateJWT = async (req, res, next) => {
	console.log(req.headers);
	const authHeader = req.headers['authorization'];
	const JWT_SECRET_KEY = process.env.JWT_SECRET;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res
			.status(401)
			.json({
				message: req.t('Access denied. No token provided.'),
			});
	}

	const token = authHeader.split(' ')[1];
	console.log(`RECEIVED TOKEN: ${token} `);

	try {
		const decoded = await jwt.verify(token, JWT_SECRET_KEY);
		req.userId = decoded.id;
		next();
	} catch (err) {
		res.status(403).json({ message: req.t('Invalid token') });
	}
};

export { hashPass, comparePassword, authenticateJWT };
