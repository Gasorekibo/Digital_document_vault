import React, { useEffect } from 'react';
import Navigation from './Navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uploadDocumentAction } from '../redux/slices/documentSlice';
import '../utils/i18n';
import { useTranslation } from 'react-i18next';

//Form schema
const formSchema = Yup.object({
  filename: Yup.string().required('File name is required'),
  category: Yup.string().required('Category is required'),
  image: Yup.mixed().required('Image is required'),
});

function UploadDoc() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  //select store data
  const docs = useSelector((state) => state?.docs);
  const { isCreated, docLists, loading } = docs;
  const allCategory = [...new Set(docLists?.map((ele) => ele?.category))];

  const user = useSelector((state) => state?.user);
  const { auth } = user;
  //formik
  const formik = useFormik({
    initialValues: {
      filename: '',
      category: '',
      image: null,
    },
    onSubmit: async (values) => {
      const data = await dispatch(
        uploadDocumentAction({
          filename: values.filename,
          category: values.category,
          image: values.image,
        })
      );
      console.log(data);
    },
    validationSchema: formSchema,
  });
  useEffect(() => {
    if (!auth) {
      navigate(`/user/login`);
    }
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
              {t('File Name')}
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
                <div className="text-red-600">{t(formik.errors.filename)}</div>
              ) : null}
            </div>
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              {t('Select Category')}
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
              {allCategory?.map((category, idx) => (
                <option key={idx} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category ? (
              <div className="text-red-600">{t(formik.errors.category)}</div>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium mt-3 mb-2 text-gray-700"
            >
              {t('Select image to upload')}
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
              <div className="text-red-600">{t(formik.errors.image)}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-btnhover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Loading ...' : 'Upload'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadDoc;
