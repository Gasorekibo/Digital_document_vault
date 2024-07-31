import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import { useSelector, useDispatch } from 'react-redux';
import { dateFormat } from '../utils/dateFormat';
import {
  fetchAllDocumentAction,
  deleteDocumentAction,
} from '../redux/slices/documentSlice';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import Spinner from '../utils/spinner';
import { useNavigate } from 'react-router-dom';
import '../utils/i18n';
import { useTranslation } from 'react-i18next';

export default function Homepage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [categorySelected, setCategorySelected] = useState(null);
  const store = useSelector((store) => store.docs);
  const user = useSelector((store) => store?.user);
  const { auth } = user;
  const { docLists, loading } = store;

  useEffect(() => {
    if (auth) {
      dispatch(fetchAllDocumentAction());
    } else {
      navigate('/user/login');
    }
  }, []);
  async function handleDelete(id) {
    const data = await dispatch(deleteDocumentAction(id));
    const { payload } = data;
    if (payload) {
      dispatch(fetchAllDocumentAction());
    } else {
      alert('Failed to delete document');
    }
  }

  let itemsTobeRendered = docLists;
  if (categorySelected)
    itemsTobeRendered = docLists.filter(
      (doc) => doc.category === categorySelected
    );
  const allCategory = [...new Set(docLists?.map((ele) => ele?.category))];
  function handleFilterByCategory(category) {
    setCategorySelected(category);
  }

  function handleDownload(url) {
    fetch(url)
      .then((resp) => resp.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(new Blob([blob]));
        const filename = url.split('/').pop();
        const a = document.createElement('a');
        a.href = blobUrl;
        a.setAttribute('download', filename);
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  }
  return (
    <>
      <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 sticky top-0">
        {loading ? (
          <h1 className="text-xl text-primary">{t('Loading ...')}</h1>
        ) : (
          allCategory?.map((category) => (
            <p
              onClick={() => handleFilterByCategory(category)}
              className="inline-flex items-center px-3 py-2 text-sm text-white cursor-pointer hover:text-primary"
            >
              {t(category)}
            </p>
          ))
        )}
      </div>
      <div className="grid grid-cols-5 gap-4 max-w-full overflow-clip  pr-3 mt-6">
        <Navigation />
        <div className="col-span-4">
          <div className="flex flex-col max-w-full">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                        >
                          {t('User')}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                        >
                          {t('Category')}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                        >
                          {t('document Info')}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                        >
                          {t('Updated At')}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                        >
                          {t('Edit')}
                        </th>
                      </tr>
                    </thead>
                    {loading ? (
                      <Spinner />
                    ) : (
                      itemsTobeRendered?.map((document) => (
                        <tbody key={document._id}>
                          <tr className="bg-gray-50 mb-1">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={document?.file}
                                    alt="category profile"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {document?.user?.firstname}{' '}
                                    {document?.user?.lastname}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {document?.user?.email}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {document.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-sm"
                                    src={document.file}
                                    alt="category profile"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    <span className="font-semibold opacity-70">
                                      {t('Name')}
                                    </span>
                                    : {document.filename}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {t('Uploaded')} <br />
                                    {dateFormat(document.createdAt)}
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleDownload(document.file)}
                                  className="relative -top-4 p-1 rounded-lg text-red-400 text-sm"
                                >
                                  {t("Download")}
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {dateFormat(document.updatedAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <p className="flex gap-1">
                                <span
                                  onClick={() => handleDelete(document?._id)}
                                  className="text-red-400 font-bold cursor-pointer"
                                >
                                  <FaTrash />
                                </span>{' '}
                                <span className="text-primary font-bold cursor-pointer">
                                  <FaEdit />
                                </span>
                              </p>
                            </td>
                            <td className="px- py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"></td>
                          </tr>
                        </tbody>
                      ))
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}
