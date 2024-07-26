import React from 'react';

function UploadDoc() {
  return (
    <div className="mt-8 sm:mx-auto w-2/6">
      <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10 lg:w-[80%] lg:mx-auto shadow-md rounded-md my-20">
        <form onSubmit={() => {}} className="space-y-6">
          <div>
            <label
              htmlFor="filename"
              className="block text-sm font-medium text-gray-700"
            >
              File name
            </label>
            <div className="mt-1">
              <input
                onChange={() => {}}
                onBlur={() => {}}
                id="filename"
                name="filename"
                type=""
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Select Category
          </label>
          <select
            id="category"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="1">Document Category</option>
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
            <option value="3">Category 3</option>
          </select>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mt-3 mb-2 text-gray-700"
            >
              Select image to upload
            </label>
            <input
              type="file"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
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
