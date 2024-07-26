import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="bg-gray-600 p-2 shadow-2xl shadow-orange-50">
      <ul className="flex flex-col justify-between items-center gap-2">
        <li className="text-white text-4xl cursor-pointer my-3">
          <span className="text-primary">
            D<sup className="font-extrabold text-primary">2</sup>
          </span>
          <span className="text-primary">Vault</span>
        </li>
        <li>
          <ul className="flex flex-col gap-4 h-screen text-xl">
            <Link
              to={'/'}
              className="text-white p-2 cursor-pointer hover:text-primary"
            >
              Home
            </Link>
            <Link
              to={'/user/register'}
              className="text-white p-2 cursor-pointer hover:text-primary"
            >
              Register
            </Link>
            <Link
              to={'/user/login'}
              className="text-white p-2 cursor-pointer hover:text-primary"
            >
              Login
            </Link>
            <Link
              to={'/docs/upload'}
              className="text-white p-2 cursor-pointer hover:text-primary"
            >
              Upload Doc
            </Link>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
