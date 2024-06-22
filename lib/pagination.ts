interface Pagination {
  currentPage: number;
  neighbouringPages?: number;
  totalPages: number;
}

export enum PaginationDots {
  MoveLeft = "MOVE_LEFT",
  MoveRight = "MOVE_RIGHT",
}

const getRange = (start: number, end: number, step = 1) => {
  let counter = start;
  const range = [];

  while (counter <= end) {
    range.push(counter);
    counter += step;
  }
  return range;
};

// pagination only shows 7 items
export const generatePagination = ({
  currentPage,
  totalPages,
  neighbouringPages = 2,
}: Pagination) => {
  const paginationItems = neighbouringPages * 2 + 3;
  const paginationItemsWithDots = paginationItems + 2;

  if (totalPages > paginationItemsWithDots) {
    const paginationStart = Math.max(2, currentPage - neighbouringPages);
    const paginationEnd = Math.min(
      totalPages - 1,
      currentPage + neighbouringPages
    );
    let pages: Array<string | number> = getRange(
      paginationStart,
      paginationEnd
    );
    const hasHiddenPagesToTheLeft = paginationStart > 2;
    const hasHiddenPagesToTheRight = totalPages - paginationEnd > 1;
    const totalHiddenPages = paginationItems - (pages.length + 1);

    switch (true) {
      case hasHiddenPagesToTheLeft && !hasHiddenPagesToTheRight:
        const extraPages = getRange(
          paginationStart - totalHiddenPages,
          paginationStart - 1
        );
        pages = [PaginationDots.MoveLeft, ...extraPages, ...pages];
        break;
      case !hasHiddenPagesToTheLeft && hasHiddenPagesToTheRight: {
        const extraPages = getRange(
          paginationEnd + 1,
          paginationEnd + totalHiddenPages
        );
        pages = [...pages, ...extraPages, PaginationDots.MoveRight];
        break;
      }
      case hasHiddenPagesToTheLeft && hasHiddenPagesToTheRight:
      default: {
        pages = [PaginationDots.MoveLeft, ...pages, PaginationDots.MoveRight];
        break;
      }
    }
    return [1, ...pages, totalPages];
  }
  return getRange(1, totalPages);
};
