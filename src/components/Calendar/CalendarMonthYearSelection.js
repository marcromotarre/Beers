import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Calendar from './Calendar';
import CheckSVG from '../../svg/check.svg';
import monthsNames from '../../data/months';

import { getMonths } from '../../utils/filters';

const CalendarMonthYearSelectionContainer = styled.div`
  margin: 15% 0px 25%;
  height: 60%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: space-between;

  button {
    background: none;
    border: none;
    :focus {
      outline: 0;
    }
  }

  div {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  width: 200px;
  label {
    padding: 2px 7px;
    font-size: 9px;
    font-family: 'HelveticaNeue-Bold';
    color: '#000';
    opacity: 0.34;
  }
  .selected {
    opacity: 1;
  }
`;

const CalendarMonthYearSelection = ({
  defaultSelectedMonth,
  defaultSelectedYear,
  months,
  years,
  onClickCheck,
}) => {
  const [selectedMonth, setSelectedMonth] = useState(defaultSelectedMonth);
  const [selectedYear, setSelectedYear] = useState(defaultSelectedYear);

  const handleClickMonth = (event) => {
    setSelectedMonth(parseInt(event.currentTarget.id));
  };

  const handleClickYear = (event) => {
    setSelectedYear(parseInt(event.currentTarget.id));
  };

  const handleClickOk = () => {
    onClickCheck({ month: selectedMonth, year: selectedYear });
  };

  return (
    <Calendar width={200}>
      <CalendarMonthYearSelectionContainer data-testid="calendar-month-year-selection-container">
        <div>
          {months.map((month) => (
            <button id={month} key={month} onClick={handleClickMonth}>
              <label className={selectedMonth === month ? 'selected' : ''}>
                {monthsNames[month - 1].toUpperCase().substring(0, 3)}
              </label>
            </button>
          ))}
        </div>
        <div>
          {years.map((year) => (
            <button id={year} key={year} onClick={handleClickYear}>
              <label className={selectedYear === year ? 'selected' : ''}>
                {year}
              </label>
            </button>
          ))}
        </div>
      </CalendarMonthYearSelectionContainer>
      <div className="actions" data-testid="actions">
        <button
          data-testid={'calendar-month-year-selection-check-button'}
          onClick={handleClickOk}
        >
          <CheckSVG width={26} />
        </button>
      </div>
    </Calendar>
  );
};

CalendarMonthYearSelection.propTypes = {
  defaultSelectedMonth: PropTypes.number.isRequired,
  defaultSelectedYear: PropTypes.number.isRequired,
  months: PropTypes.arrayOf(PropTypes.number),
  years: PropTypes.arrayOf(PropTypes.number),
  onClickCheck: PropTypes.func,
};

CalendarMonthYearSelection.defaultProps = {
  months: getMonths(),
  years: [],
  onClickCheck: () => {},
};

export default CalendarMonthYearSelection;
