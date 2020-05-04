import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { shortText } from '../../utils/text';

const BeerContainer = styled.section`
  border: 1px solid #000;
  border-radius: 15px;
  width: 25%;

  display: grid;
  grid-template-columns: auto auto;
  font-family: 'HelveticaNeue-Thin';
  padding: 20px;

  label {
    font-family: 'HelveticaNeue-ThinItalic';
    font-size: 11px;
  }
`;

const BeerData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BeerText = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  h1 {
    color: #000000;
    font-size: 30px;
    padding: 5px 0px;
    0px;
  }
  h2 {
    color: #707070;
    font-size: 13px;
    padding: 5px 0px;
  }

  p {
  font-family: 'HelveticaNeue-Thin';
  font-size: 11px;
  }
`;

const BrewedDate = styled.div`
  justify-self: start;
  align-self: end;
  display: flex;

  label {
    font-family: 'HelveticaNeue-Bold';
    padding-right: 2px;
    font-size: 13px;
  }
  p {
    font-size: 13px;
    padding: 0;
    margin: 0;
  }
`;
const BeerImage = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  img {
    height: 300px;
    width: auto;
    object-fit: cover;
  }
`;

const Description = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: start;
  align-items: start;
`;

const Beer = ({ name, tagline, first_brewed, description, image_url }) => {
  return (
    <BeerContainer data-testid="beer-container">
      <BeerData>
        <BeerText>
          <h1>{name}</h1>
          <h2>{tagline}</h2>
          <p>{shortText(description, 460)}</p>
        </BeerText>
        <BrewedDate>
          <label>brewed:</label>
          <p>{first_brewed}</p>
        </BrewedDate>
      </BeerData>
      <BeerImage>
        <img src={image_url} />
      </BeerImage>
    </BeerContainer>
  );
};

Beer.propTypes = {
  name: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  first_brewed: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
};

Beer.defaultProps = {};

export default Beer;
