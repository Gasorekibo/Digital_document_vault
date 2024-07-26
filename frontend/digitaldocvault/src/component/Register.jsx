import React,{useEffect} from 'react';
import Navigation from './Navigation';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerUserAction } from '../redux/slices/userSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((store) => store?.user);
  const { user, loading } = store;

  const formSchema = Yup.object({
    firstname: Yup.string().required('Firstname is Required'),
    lastname: Yup.string().required('Lastname is Required'),
    email: Yup.string().email('Invalid email').required('Email Is Required'),
    password: Yup.string().required('Password is Required'),
  });
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      dispatch(registerUserAction(values));
    },
  });
  useEffect(()=> {
    if (user) {
      navigate(`/`);
    }
  },[])
  return (
    <div className="grid grid-cols-5 mt-6">
      <Navigation />
      <form
        onSubmit={formik.handleSubmit}
        className="container mx-auto p-5 w-2/6 shadow-md bg-white rounded-md mt-6 col-span-4 h-2/3"
      >
        <h1 className="text-3xl font-bold text-center">
          <span className="text-primary">Reg</span>ister
        </h1>
        <div>
          <div className="my-4">
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700 "
            >
              First Name
            </label>
            <input
              type="firstname"
              name="firstname"
              id="firstname"
              value={formik.values.firstname}
              onChange={formik.handleChange('firstname')}
              onBlur={formik.handleBlur('firstname')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="my-4">
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700 "
            >
              Last Name
            </label>
            <input
              type="lastname"
              name="lastname"
              id="lastname"
              value={formik.values.lastname}
              onChange={formik.handleChange('lastname')}
              onBlur={formik.handleBlur('lastname')}
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
              value={formik.values.email}
              onChange={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
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
              value={formik.values.password}
              onChange={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-md"
          >
            {loading?"Loading...":"Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
