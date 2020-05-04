import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import BeerSVG from '../svg/beer.svg';
import LeftSvg from '../svg/left.svg';
import RightSvg from '../svg/right.svg';
import DotsSvg from '../svg/dots.svg';

import { generatePageNumbers, getNumPages } from '../utils/pagination';

export const PaginationContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    background: none;
    border: none;
    :focus {
      outline: 0;
    }

    position: relative;
    label {
      font-family: 'HelveticaNeue-Thin';
      color: #d8d8d8;
      font-size: 30px;
      user-select: none;
    }
    .selected {
      color: #ffd15b;
    }
  }
`;

const BeerIcon = styled(BeerSVG)`
  position: absolute;
`;

const Pagination = ({
  numberTotalElements,
  numberElementsPerPage,
  defaultPageNumber,
  onClickPage,
}) => {
  const [actualPage, setActualPage] = useState(defaultPageNumber);
  const numPages = getNumPages({
    totalElements: numberTotalElements,
    elementsPerPage: numberElementsPerPage,
  });

  useEffect(() => {
    onClickPage(actualPage);
  }, [actualPage]);

  if (actualPage > numPages) {
    setActualPage(numPages);
  }

  const { pages, first, last } = generatePageNumbers({
    actualPage,
    maxNumShowedPages: 7,
    numPages,
  });

  const handleOnClickPage = (event) => {
    setActualPage(parseInt(event.currentTarget.id));
  };

  const handleOnClickNext = () => {
    setActualPage(actualPage + 1);
  };

  const handleOnClickPrevious = () => {
    setActualPage(actualPage - 1);
  };

  return (
    <PaginationContainer data-testid="pagination-container">
      <button disabled={actualPage === 1} onClick={handleOnClickPrevious}>
        {actualPage !== 1 && <LeftSvg width={16.43} />}
      </button>
      {first && (
        <>
          <button id={first} onClick={handleOnClickPage}>
            <label>{first}</label>
          </button>
          <div>
            <DotsSvg width={14} />
          </div>
        </>
      )}
      {pages.map((page) => (
        <button id={page} onClick={handleOnClickPage} key={page}>
          {page === actualPage && <BeerIcon height="60"></BeerIcon>}
          <label className={page === actualPage ? 'selected' : ''}>
            {page}
          </label>
        </button>
      ))}
      {last && (
        <>
          <div>
            <DotsSvg width={14} />
          </div>
          <button id={last} onClick={handleOnClickPage}>
            <label>{last}</label>
          </button>
        </>
      )}
      <button disabled={actualPage === numPages} onClick={handleOnClickNext}>
        {actualPage !== numPages && <RightSvg width={16.43} />}
      </button>
    </PaginationContainer>
  );
};

Pagination.propTypes = {
  numberTotalElements: PropTypes.number.isRequired,
  numberElementsPerPage: PropTypes.number,
  defaultPageNumber: PropTypes.number,
  onClickPage: PropTypes.func,
};

Pagination.defaultProps = {
  numberElementsPerPage: 5,
  defaultPageNumber: 1,
  onClickPage: () => {},
};

export default Pagination;
