import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleFirstPage = () => onPageChange(1);
  const handleLastPage = () => onPageChange(totalPages);

  const handlePreviousPage = () => handlePageChange(currentPage - 1);
  const handleNextPage = () => handlePageChange(currentPage + 1);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="flex items-center justify-end mt-4 gap-x-2">
      <select
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        className="mr-4 px-4 py-2 border appearance-none rounded-md">
        {[10, 20, 30, 40, 50]?.map((num, i) => (
          <option key={i} value={num}>
            {num} items per page
          </option>
        ))}
      </select>

      <button
        onClick={handleFirstPage}
        disabled={currentPage === 1}
        className="text-neutral-700 rounded-md">
        <ChevronsLeft />
      </button>
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="text-neutral-700 rounded-md">
        <ChevronLeft />
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => handlePageChange(number)}
          className={`px-4 py-2 ${
            number === currentPage ? "text-primary-700" : "text-neutral-700"
          } rounded-md`}>
          {number}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="text-neutral-700 rounded-md">
        <ChevronRight />
      </button>
      <button
        onClick={handleLastPage}
        disabled={currentPage === totalPages}
        className="text-neutral-700 rounded-md">
        <ChevronsRight />
      </button>
    </div>
  );
};

export default Pagination;
