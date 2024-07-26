import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUserAction } from '../redux/slices/userSlice';
import '../utils/i18n';
import { useTranslation } from 'react-i18next';



function Navigation() {
  const { t } = useTranslation();
  const user = useSelector((store) => store?.user);
  const { auth } = user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUserAction());
    navigate('/user/login');
  };

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
              {t('Home')}
            </Link>
            <Link
              to={'/user/register'}
              className="text-white p-2 cursor-pointer hover:text-primary"
            >
             { t('Register')}
            </Link>
            <Link
              to={'/user/login'}
              className="text-white p-2 cursor-pointer hover:text-primary"
            >
              {t('Login')}
            </Link>
            <Link
              to={'/docs/upload'}
              className="text-white p-2 cursor-pointer hover:text-primary"
            >
              {t('Upload Doc')}
            </Link>
            {auth && (
              <button
                onClick={handleLogout}
                className="text-white px-1 py-1 cursor-pointer hover:text-primary text-2xl bg-red-400 rounded-md"
              >
                {t('Logout')}
              </button>
            )}
            {/* {auth && <Categories />} */}
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
