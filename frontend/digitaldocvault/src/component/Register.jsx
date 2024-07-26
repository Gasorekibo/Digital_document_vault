import React from 'react';
import Navigation from './Navigation';

function Register() {
  return (
    <div>
      <div className="container mx-auto p-5 w-2/6 shadow-md bg-white rounded-md my-20">
        <h1 className="text-3xl font-bold text-center">
          <span className="text-primary">Reg</span>ister
        </h1>
        <form>
          <div className="my-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 "
            >
              User Name
            </label>
            <input
              type="username"
              name="username"
              id="username"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button className="bg-primary text-white py-2 px-4 rounded-md">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
