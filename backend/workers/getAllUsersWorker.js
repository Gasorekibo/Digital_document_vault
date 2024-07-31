import { createWorker } from '../config/bullmq.js';
import User from '../models/user.js';

createWorker('user-queue', async (job) => {
	const { userId } = job.data;

	try {
		const user = await User.findById(userId);
		if (!user || user.isAdmin === false) {
			console.error('User is not allowed to perform this action');
			return;
		}

		const users = await User.find({}, 'firstname lastname email');
		console.log('Users fetched successfully', users);
	} catch (error) {
		console.error('Error fetching users', error);
	}
});
