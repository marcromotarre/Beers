import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Calendar from './Calendar';
import months from '../../data/months';

const CalendarMonthYearViewContainer = styled.div`
  display: flex;
  wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  label {
    font-family: 'HelveticaNeue-Bold';
    color: '#000';
  }
`;

const Month = styled.label`
  font-size: 14px;
`;
const Year = styled.label`
  font-size: 17px;
`;

const CalendarMonthYearView = ({ month, year }) => {
  return (
    <Calendar width={100}>
      <CalendarMonthYearViewContainer data-testid="calendar-month-year-view-container">
        {month && <Month>{months[month - 1].toUpperCase()}</Month>}
        {year && <Year>{year}</Year>}
      </CalendarMonthYearViewContainer>
    </Calendar>
  );
};

CalendarMonthYearView.propTypes = {
  month: PropTypes.number,
  year: PropTypes.number,
};

CalendarMonthYearView.defaultProps = {};

export default CalendarMonthYearView;
