import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import * as types from '../redux/constants';
import Pagination from './Pagination';
import BeersList from './Beer/BeersList';
import BrewedBetween from './Calendar/BrewedBetween';
import {
  getMinBrewedDate,
  getMaxBrewedDate,
  getBeersByBrewedFromTo,
} from '../utils/filters';

const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 250px auto 100px;
  height: 100vh;

  > * {
    justify-self: center;
    align-self: center;
  }
`;

const getBeersByPage = (beers, page, numberElementsPerPage) => {
  return beers.filter(
    (beer, index) =>
      index >= (page - 1) * numberElementsPerPage &&
      index < page * numberElementsPerPage
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const { beers } = useSelector((state) => state.beersReducer);
  const { brewedFrom, brewedTo } = useSelector((state) => state.filtersReducer);

  const numberElementsPerPage = 3;
  const defaultPageNumber = 1;
  const [page, setPage] = useState(defaultPageNumber);

  useEffect(() => {
    dispatch({
      type: types.setBrewedFromTo,
      brewed: {
        from: getMinBrewedDate(beers),
        to: getMaxBrewedDate(beers),
      },
    });
  }, []);

  const filteredBeers = getBeersByBrewedFromTo({ beers, brewedFrom, brewedTo });
  const setPageNumber = (clickedPage) => {
    setPage(clickedPage);
  };

  return (
    <>
      <HomeContainer data-testid="home-container">
        <BrewedBetween />
        <BeersList
          beers={getBeersByPage(filteredBeers, page, numberElementsPerPage)}
        ></BeersList>
        {filteredBeers.length > 0 && (
          <Pagination
            numberTotalElements={filteredBeers.length}
            numberElementsPerPage={numberElementsPerPage}
            defaultPageNumber={defaultPageNumber}
            onClickPage={setPageNumber}
          />
        )}
      </HomeContainer>
    </>
  );
};

export default Home;
