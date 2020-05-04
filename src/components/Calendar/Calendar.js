import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CalendarSVG from '../../svg/Calendar.svg';

const CalendarContainer = styled.section`
  position: relative;

  .actions {
    position: absolute;
    left: 0;
    top: 90%;
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;
const CalendarIcon = styled(CalendarSVG)``;
const CalendarInfo = styled.div`
  margin-top: ${(props) => props.marginTop};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CALENDAR_INFO_ASPECT_RATIO = 1.46;
const TOP_CALENDAR_ASPECT_RATIO = 2.36;

const Calendar = ({ children, width }) => {
  return (
    <CalendarContainer>
      <CalendarInfo
        marginTop={`${width / TOP_CALENDAR_ASPECT_RATIO}px`}
        width={`${width}px`}
        height={`${width / CALENDAR_INFO_ASPECT_RATIO}px`}
      >
        {children}
      </CalendarInfo>
      <CalendarIcon width={width} />
    </CalendarContainer>
  );
};

Calendar.propTypes = {
  width: PropTypes.number.isRequired,
};

Calendar.defaultProps = {};

export default Calendar;
