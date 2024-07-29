import React from 'react';
import Navigation from './Navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uploadDocumentAction } from '../redux/slices/documentSlice';

//Form schema
const formSchema = Yup.object({
  filename: Yup.string().required('File name is required'),
  category: Yup.string().required('Category is required'),
  image: Yup.mixed().required('Image is required'),
});

function UploadDoc() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //select store data
  const docs = useSelector((state) => state?.docs);
  console.log(docs)
  const { isCreated, loading, appErr, serverErr } = docs;
  const user = useSelector((state) => state?.user);
  const { auth } = user;

  //formik
  const formik = useFormik({
    initialValues: {
      filename: '',
      category: '',
      image: null,
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(
        uploadDocumentAction({
          filename: values.filename,
          category: values.category,
          image: values.image,
        })
      );
    },
    validationSchema: formSchema,
  });

  //redirect
  if (isCreated) navigate('/');

  return (
    <div className="mt-8 sm:mx-auto grid grid-cols-5">
      <Navigation />
      <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10 lg:w-[80%] lg:mx-auto shadow-md rounded-md col-start-3 col-span-2 h-2/4">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="filename"
              className="block text-sm font-medium text-gray-700"
            >
              File name
            </label>
            <div className="mt-1">
              <input
                value={formik.values.filename}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="filename"
                name="filename"
                type="text"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {formik.touched.filename && formik.errors.filename ? (
                <div className="text-red-600">{formik.errors.filename}</div>
              ) : null}
            </div>
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Select Category
            </label>
            <select
              id="category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Document Category</option>
              <option value="Category 1">Category 1</option>
              <option value="Category 2">Category 2</option>
              <option value="Category 3">Category 3</option>
            </select>
            {formik.touched.category && formik.errors.category ? (
              <div className="text-red-600">{formik.errors.category}</div>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium mt-3 mb-2 text-gray-700"
            >
              Select image to upload
            </label>
            <input
              id="image"
              name="image"
              type="file"
              onChange={(event) => {
                formik.setFieldValue('image', event.currentTarget.files[0]);
              }}
              onBlur={formik.handleBlur}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {formik.touched.image && formik.errors.image ? (
              <div className="text-red-600">{formik.errors.image}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-btnhover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadDoc;
