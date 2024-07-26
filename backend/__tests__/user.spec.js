import request from 'supertest';
import app from '../index.js';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock the User model and bcrypt
jest.mock('../models/user.js');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const mockUser = {
	_id: 'userId123',
	firstname: 'John',
	lastname: 'Doe',
	email: 'john.doe@example.com',
	password: 'hashedpassword123',
	isAdmin: true,
};

describe('User Controller', () => {
	describe('POST /user/login', () => {
		it('should login a user successfully', async () => {
			User.findOne.mockResolvedValue(mockUser);
			bcrypt.compare.mockResolvedValue(true);
			jwt.sign.mockReturnValue('mockToken');

			const response = await request(app)
				.post('/user/login')
				.send({
					email: 'john.doe@example.com',
					password: 'pass123',
				});

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty(
				'msg',
				'User logged in successfully!'
			);
			expect(response.body).toHaveProperty('token', 'mockToken');
		});

		it('should return 400 if validation fails', async () => {
			const response = await request(app)
				.post('/user/login')
				.send({
					email: 'invalidEmail',
					password: 'short',
				});

			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty('error');
		});

		it('should return 401 if email or password is incorrect', async () => {
			User.findOne.mockResolvedValue(mockUser);
			bcrypt.compare.mockResolvedValue(false);

			const response = await request(app)
				.post('/user/login')
				.send({
					email: 'john.doe@example.com',
					password: 'wrongpass',
				});

			expect(response.status).toBe(401);
			expect(response.body).toHaveProperty(
				'error',
				'Incorrect email or password'
			);
		});
	});

	describe('POST /user/register', () => {
		it('should register a new user successfully', async () => {
			User.create.mockResolvedValue(mockUser);
			bcrypt.hash.mockResolvedValue('hashedpassword123');

			const response = await request(app)
				.post('/user/register')
				.send({
					firstname: 'John',
					lastname: 'Doe',
					email: 'john.doe@example.com',
					password: 'pass123',
				});

			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty(
				'msg',
				'User registered successfully!'
			);
			expect(response.body.newUser).toHaveProperty(
				'firstname',
				'John'
			);
			expect(response.body.newUser).toHaveProperty(
				'lastname',
				'Doe'
			);
			expect(response.body.newUser).toHaveProperty(
				'email',
				'john.doe@example.com'
			);
		});

		it('should return 400 if validation fails', async () => {
			const response = await request(app)
				.post('/user/register')
				.send({
					firstname: 'John',
					email: 'invalidEmail',
					password: 'short',
				});

			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty('error');
		});

		it('should return 500 if hashing password fails', async () => {
			bcrypt.hash.mockRejectedValue(new Error('Hashing error'));

			const response = await request(app)
				.post('/user/register')
				.send({
					firstname: 'John',
					lastname: 'Doe',
					email: 'john.doe@example.com',
					password: 'pass123',
				});

			expect(response.status).toBe(500);
			expect(response.body).toHaveProperty(
				'error',
				'Something went wrong'
			);
		});
	});
});
