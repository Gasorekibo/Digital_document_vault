import { createQueue } from '../config/bullmq.js';

const userQueue = createQueue('user-queue');

// Add a job to the queue
const addUserJob = (req, res) => {
	userQueue.add('fetch-users', { userId: req.userId });
	res.send('User job added successfully');
};

export default addUserJob;
