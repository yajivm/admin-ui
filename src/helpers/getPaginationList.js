import config from "../config";

const { DOTS } = config;

const getPaginationList = ({
  totalDataCount,
  tabelSize,
  currentPage,
}) => {
  const siblingCount = 1;
  const totalPageCount = Math.ceil(totalDataCount / tabelSize);
  const totalPageNumbers = siblingCount + 5;
  
  const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, ind) => ind + start);
  };
  
  if (totalPageNumbers >= totalPageCount) {
    return range(1, totalPageCount);
  }

  const firstPageIndex = 1;
  const lastPageIndex = totalPageCount;

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(
    currentPage + siblingCount,
    totalPageCount
  );

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    let leftItemCount = 3 + 2 * siblingCount;
    let leftRange = range(1, leftItemCount);

    return [...leftRange, DOTS, totalPageCount];
  }
  
  if (shouldShowLeftDots && !shouldShowRightDots) {
    let rightItemCount = 3 + 2 * siblingCount;
    let rightRange = range(
      totalPageCount - rightItemCount + 1,
      totalPageCount
    );
    return [firstPageIndex, DOTS, ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    let middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }

};

export default getPaginationList;
