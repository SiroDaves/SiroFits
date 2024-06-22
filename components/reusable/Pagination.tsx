import { PaginationDots, generatePagination } from "@/lib/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { FC } from "react";

interface PaginationComponentProps {
  currentPage?: number;
  totalPages?: number;
  onPaginationChange?: (page: number) => void;
}

export const Pagination: FC<PaginationComponentProps> = ({
  currentPage = 0,
  totalPages = 0,
  onPaginationChange,
}) => {
  const pages = generatePagination({
    currentPage,
    totalPages,
  });
  if (pages.length <= 1) {
    return null;
  }

  const onClickNext = () => {
    if (currentPage < totalPages) {
      onPaginationChange?.(currentPage + 1);
    }
  };
  const onClickPrevious = () => {
    if (currentPage > 1) {
      onPaginationChange?.(currentPage - 1);
    }
  };
  const onClickPage = (page: number) => {
    if (page !== currentPage) {
      onPaginationChange?.(page);
    }
  };
  return (
    <div className="px-2 py-1 flex items-center justify-between sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <span
          className={`relative inline-flex items-center px-4 py-2 border 
          border-gray-300 text-sm font-medium rounded-md text-gray-700
          bg-white hover:bg-gray-50
           ${currentPage > 1 ? "cursor-pointer" : "cursor-not-allowed"}`}
          onClick={onClickPrevious}
        >
          Previous
        </span>
        <span
          className={`ml-3 relative inline-flex items-center px-4 py-2 
          border border-gray-300 text-sm font-medium rounded-md 
          text-gray-700 bg-white hover:bg-gray-50
          ${
            currentPage < totalPages ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          onClick={onClickNext}
        >
          Next
        </span>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <span
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md 
              border border-gray-300 bg-white text-sm font-medium text-gray-500
               hover:bg-gray-50 ${
                 currentPage > 1 ? "cursor-pointer" : "cursor-not-allowed"
               }`}
              onClick={onClickPrevious}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            {pages.map((page, i) => {
              if (page === PaginationDots.MoveLeft) {
                return (
                  <span
                    key={i}
                    className="cursor-pointer relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                  >
                    ...
                  </span>
                );
              }
              if (page === PaginationDots.MoveRight) {
                return (
                  <span
                    key={i}
                    className="cursor-pointer relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                  >
                    ...
                  </span>
                );
              }
              return (
                <span
                  key={i}
                  className={`relative inline-flex items-center px-4 py-2 border 
                  text-sm font-medium ${
                    page !== currentPage
                      ? "cursor-pointer bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      : "cursor-not-allowed z-10 bg-indigo-50 border-tandaPurple text-tandaPurple2"
                  }`}
                  onClick={() => onClickPage(Number(page))}
                >
                  {page}
                </span>
              );
            })}
            <span
              className={`relative inline-flex items-center px-2 py-2 
              rounded-r-md border border-gray-300 bg-white text-sm 
              font-medium text-gray-500 hover:bg-gray-50
              ${
                currentPage < totalPages
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
              }`}
              onClick={onClickNext}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          </nav>
        </div>
      </div>
    </div>
  );
};
