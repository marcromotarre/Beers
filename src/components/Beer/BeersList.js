import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Beer from './Beer';

const BeersListContainer = styled.section`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;

  > label {
    font-family: 'HelveticaNeue-Thin';
    font-size: 30px;
    color: red;
  }
`;

const BeersList = ({ beers }) => {
  return (
    <BeersListContainer data-testid={'beers-list-container'}>
      {beers.length > 0 &&
        beers.map((beer) => <Beer key={beer.id} {...beer} />)}
      {(!beers || beers.length === 0) && <label>No beers found</label>}
    </BeersListContainer>
  );
};

BeersList.propTypes = {
  beers: PropTypes.array,
};

BeersList.defaultProps = {
  beers: [],
};

export default BeersList;
