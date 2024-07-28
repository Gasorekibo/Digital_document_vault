import { Worker } from 'bullmq';
import { Redis } from 'ioredis';
import User from '../models/user.js';
import { hashPass } from '../utils/helpers.js';

const redisClient = new Redis({
	host: process.env.REDIS_HOST || 'redis',
	port: process.env.REDIS_PORT || 6379,
	maxRetriesPerRequest: null,
});

const registrationWorker = new Worker(
	'registrationQueue',
	async (job) => {
		const data = job.data;
		console.log(data);

		try {
			const password = data.password;
			const hashedPassword = await hashPass(password);

			if (!hashedPassword)
				throw new Error('Something went wrong');

			data.password = hashedPassword;
			const newUser = await User.create(data);

			console.log(newUser);

			// Store result in Redis
			await redisClient.set(
				`job:${job.id}`,
				JSON.stringify({
					success: true,
					user: {
						firstName: newUser.firstName,
						lastName: newUser.lastName,
						email: newUser.email,
					},
				}),
				'EX',
				3600
			);

			return {
				success: true,
				user: {
					firstName: newUser.firstName,
					lastName: newUser.lastName,
					email: newUser.email,
				},
			};
		} catch (error) {
			await redisClient.set(
				`job:${job.id}`,
				JSON.stringify({
					success: false,
					error: error.message,
				}),
				'EX',
				3600
			);
			throw error;
		}
	},
	{
		connection: redisClient,
		concurrency: 5,
	}
);

export { registrationWorker };
