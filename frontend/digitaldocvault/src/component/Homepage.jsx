import React from 'react';
import Navigation from './Navigation';
import image from '../../public/image.jpg';
export default function Homepage() {
  
  return (
    <>
      <div className="grid grid-cols-5 gap-4 max-w-full overflow-clip pr-3 mt-6">
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
                          User
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                        >
                          document Info
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                        >
                          CreateAt
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                        >
                          Edit
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-gray-50 mb-1">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={image}
                                alt="category profile"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                Gasore Mugwaneza
                              </div>
                              <div className="text-sm text-gray-500">
                                gasore@gmail.com
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Education
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-sm"
                                src={image}
                                alt="category profile"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                S6 Report
                              </div>
                              <div className="text-sm text-gray-500">
                                Uploaded At:8839383
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          43234
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-red-400 font-bold cursor-pointer">
                            Yes
                          </span>{' '}
                          /{' '}
                          <span className="text-primary font-bold cursor-pointer">
                            No
                          </span>
                        </td>
                        <td className="px- py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
