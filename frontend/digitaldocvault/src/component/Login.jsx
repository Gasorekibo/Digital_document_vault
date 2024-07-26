import React from 'react';
import Navigation from './Navigation';

function Login() {
  return (
    <div>
      <div className="container mx-auto p-5 w-2/6 shadow-md bg-white rounded-md my-20">
        <h1 className="text-3xl font-bold text-center">
          <span className="text-primary">Log</span>in
        </h1>
        <form>
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
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
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
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-btnhover">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
