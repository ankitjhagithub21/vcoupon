
import React from 'react';

const Pagination = ({ currentPage, total, perPage, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center p-2 z-40 w-full left-0 bg-white">
      <nav className="flex justify-center">
        <ul className="flex space-x-2 items-center">
          {pageNumbers.map((number) => (
            <li key={number} className="cursor-pointer">
              <button
                onClick={() => paginate(number)}
                className={`${currentPage === number
                  ? 'bg-[var(--red)] text-white'
                  : 'bg-gray-200 text-gray-700'
                  } px-3 py-1 rounded-lg`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
