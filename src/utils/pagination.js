export const getNumPages = ({ totalElements, elementsPerPage }) => {
  return Math.ceil(totalElements / elementsPerPage);
};

export const generatePageNumbers = ({
  actualPage,
  numPages,
  maxNumShowedPages,
}) => {
  const pagesPerSide = Math.floor(maxNumShowedPages / 2);
  const arrayPages = new Array(numPages)
    .fill()
    .map((number, index) => index + 1);

  if (numPages <= maxNumShowedPages) return { pages: arrayPages };
  if (actualPage - pagesPerSide <= 1) {
    return {
      last: numPages,
      pages: arrayPages.filter((page) => page < maxNumShowedPages - 1),
    };
  }
  if (actualPage + pagesPerSide >= numPages) {
    return {
      first: 1,
      pages: arrayPages.filter(
        (page) => page > numPages - (maxNumShowedPages - 2)
      ),
    };
  }

  return {
    first: 1,
    pages: arrayPages.filter(
      (page) =>
        page < actualPage + (pagesPerSide - 1) &&
        page > actualPage - (pagesPerSide - 1)
    ),
    last: numPages,
  };
};
