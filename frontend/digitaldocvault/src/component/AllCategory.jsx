import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Homepage from './Homepage';
function Categories() {
  const docs = useSelector((store) => store?.docs);
  const { docLists, loading } = docs;
  const allCategory = [...new Set(docLists?.map((ele) => ele?.category))];
  return (
    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <h5 class="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
          Filter By Category
        </h5>
      </a>
      {loading ? (
        <h1 className="text-2xl text-primary">Loading ...</h1>
      ) : (
        allCategory.map((category) => (
          <p
            onClick={() => console.log(category)}
            class="inline-flex items-center px-3 py-2 text-sm text-white cursor-pointer hover:text-primary"
          >
            {category}
            <svg
              class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
            <Homepage category={categorySelected} />
          </p>
        ))
      )}
    </div>
  );
}

export default Categories;
