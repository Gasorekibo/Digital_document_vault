import { Queue, Worker } from 'bullmq';

const redisConfig = {
	host: process.env.REDIS_HOST || 'localhost',
	port: process.env.REDIS_PORT || 6379,
};

const createQueue = (name) => {
	const queue = new Queue(name, { connection: redisConfig });
	return queue;
};

const createWorker = (name, processor) => {
	const worker = new Worker(name, processor, {
		connection: redisConfig,
	});
	return worker;
};

export { createQueue, createWorker };
