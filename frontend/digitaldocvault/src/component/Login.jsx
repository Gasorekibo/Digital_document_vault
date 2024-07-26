import React, { useEffect } from 'react';
import Navigation from './Navigation';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { loginUserActionType } from '../redux/slices/userSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((store) => store?.user);
  const { userAuth, loading } = store;
  const formSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email Is Required'),
    password: Yup.string().required('Password is Required'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      dispatch(loginUserActionType(values));
      navigate('/');
    },
  });
  useEffect(() => {
    if (userAuth) {
      navigate(`/`);
    }
  }, []);
  return (
    <div className="grid grid-cols-5 mt-6">
      <Navigation />
      <div className="container mx-auto p-5 w-2/6 shadow-md bg-white rounded-md mt-6 col-span-4 h-2/4">
        <h1 className="text-3xl font-bold text-center">
          <span className="text-primary">Log</span>in
        </h1>
        <form onSubmit={formik.handleSubmit}>
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
              value={formik.values.email}
              onChange={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
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
              value={formik.values.password}
              onChange={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-btnhover"
          >
            {loading ? 'Loading ..' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
