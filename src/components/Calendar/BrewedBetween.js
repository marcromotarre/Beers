import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import CalendarMonthYearSelection from './CalendarMonthYearSelection';
import CalendarMonthYearView from './CalendarMonthYearView';
import LeftArrowSVG from '../../svg/leftArrow.svg';
import { setBrewedFrom, setBrewedTo } from '../../redux/constants';
import { getYearsFromMinToMaxBrewed } from '../../utils/filters';

const BrewedBetweenContainer = styled.section`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 230px;
`;

const BrewedBetweenInfo = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BrewedBetweenSeparator = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 20px 0px 20px;
  label {
    align-self: center;
    justify-self: center;
    font-family: 'HelveticaNeue-Thin';
    color: '#000';
    font-size: 10px;
    margin: 5px 0px;
  }
`;

const BrewedBetween = () => {
  const dispatch = useDispatch();
  const { beers } = useSelector((state) => state.beersReducer);
  const { brewedFrom, brewedTo } = useSelector((state) => state.filtersReducer);
  const [fromEdition, setFromEdition] = useState(false);
  const [toEdition, setToEdition] = useState(false);

  const openToCalendar = () => setToEdition(true);
  const openFromCalendar = () => setFromEdition(true);

  const closeFromCalendar = ({ month, year }) => {
    dispatch({
      type: setBrewedFrom,
      brewedFrom: {
        month,
        year,
      },
    });
    setFromEdition(false);
  };
  const closeToCalendar = ({ month, year }) => {
    dispatch({
      type: setBrewedTo,
      brewedTo: {
        month,
        year,
      },
    });
    setToEdition(false);
  };

  const getCalendar = ({ edition, year, month, years, onClick, onClose }) => {
    return (
      <>
        {edition && (
          <CalendarMonthYearSelection
            defaultSelectedMonth={month}
            defaultSelectedYear={year}
            years={years}
            onClickCheck={onClose}
          />
        )}
        {!edition && (
          <button
            data-testid={`calendar-month-year-view-${year}-${month}`}
            onClick={onClick}
          >
            <CalendarMonthYearView year={year} month={month} />
          </button>
        )}
      </>
    );
  };

  const years = getYearsFromMinToMaxBrewed(beers);
  return (
    <BrewedBetweenContainer data-testid="brewed-between-container">
      <BrewedBetweenInfo>
        {getCalendar({
          edition: fromEdition,
          month: brewedFrom.month,
          year: brewedFrom.year,
          years: years,
          onClick: openFromCalendar,
          onClose: closeFromCalendar,
        })}
        <BrewedBetweenSeparator>
          <label>brewed</label>
          <LeftArrowSVG width={28} />
          <label>between</label>
        </BrewedBetweenSeparator>

        {getCalendar({
          edition: toEdition,
          month: brewedTo.month,
          year: brewedTo.year,
          years: years,
          onClick: openToCalendar,
          onClose: closeToCalendar,
        })}
      </BrewedBetweenInfo>
    </BrewedBetweenContainer>
  );
};

export default BrewedBetween;
