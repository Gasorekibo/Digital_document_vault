import { Queue } from 'bullmq';
import { Redis } from 'ioredis';

const redisClient = new Redis({
	host: process.env.REDIS_HOST || 'redis',
	port: process.env.REDIS_PORT || 6379,
	maxRetriesPerRequest: null,
});

const registrationQueue = new Queue('registrationQueue', {
	connection: redisClient,
});

const registerUserQueue = async (req, res, userData) => {
	try {
		const job = await registrationQueue.add(
			'registerUserQueue',
			userData,
			{
				attempts: 3,
				removeOnComplete: true,
				backoff: { type: 'fixed', delay: 1000 },
			}
		);

		return res.status(202).json({
			message: 'Registration job created',
			jobId: job.id,
		});
	} catch (error) {
		errorHandler(req, res, error);
	}
};

export { registerUserQueue };
