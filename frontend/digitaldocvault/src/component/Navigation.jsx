import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="bg-gray-800 p-2">
      <ul className="flex justify-between items-center px-28">
        <li className="text-white text-4xl cursor-pointer">
          <span className="text-primary">
            D<sup className="font-extrabold text-primary">2</sup>
          </span>
          <span className="text-primary">Vault</span>
        </li>
        <li>
          <ul className="flex">
            <Link to={'/'} className="text-white p-2 cursor-pointer hover:text-primary">
              Home
            </Link>
            <Link to={'/user/register'} className="text-white p-2 cursor-pointer hover:text-primary">
              Register
            </Link>
            <Link to={'/user/login'} className="text-white p-2 cursor-pointer hover:text-primary">
              Login
            </Link>
            <Link to={'/docs/upload'} className="text-white p-2 cursor-pointer hover:text-primary">
              Upload Doc
            </Link>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
