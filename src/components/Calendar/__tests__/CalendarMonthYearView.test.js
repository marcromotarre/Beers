import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import CalendarMonthYearView from '../CalendarMonthYearView';

/** this component should:
 *  paint year and month info inside calendar
 *      - month its transformed in text with the month name (capital letters)
 *
 *  props:
 *      - month: number of the month
 *      - year: number of the year
 *
 */

describe('CalendarMonthYearView Component Snapshots', () => {
  it('CalendarMonthYearView Snapshots', () => {
    expect(
      renderer.create(<CalendarMonthYearView month={9} year={2017} />)
    ).toMatchSnapshot();

    expect(
      renderer.create(<CalendarMonthYearView month={9} />)
    ).toMatchSnapshot();

    expect(
      renderer.create(<CalendarMonthYearView year={2017} />)
    ).toMatchSnapshot();
  });
});

describe('CalendarMonthYearView width month and year', () => {
  it('CalendarMonthYearView Component should render all information', () => {
    const { container, getByTestId } = render(
      <CalendarMonthYearView month={9} year={2017} />
    );
    const calendar = container.children[0];
    expect(calendar.nodeName).toBe('SECTION');

    const calendarMonthYearViewContainer = getByTestId(
      'calendar-month-year-view-container'
    );
    expect(calendarMonthYearViewContainer.children.length).toBe(2);
    const monthLabel = calendarMonthYearViewContainer.children[0];
    expect(monthLabel.nodeName).toBe('LABEL');
    expect(monthLabel.innerHTML).toBe('SEPTEMBER');
    const yearLabel = calendarMonthYearViewContainer.children[1];
    expect(yearLabel.nodeName).toBe('LABEL');
    expect(yearLabel.innerHTML).toBe('2017');
  });
});

describe('CalendarMonthYearView only month', () => {
  it('CalendarMonthYearView Component should render all information', () => {
    const { debug, getByTestId } = render(<CalendarMonthYearView month={9} />);
    const calendarMonthYearViewContainer = getByTestId(
      'calendar-month-year-view-container'
    );
    expect(calendarMonthYearViewContainer.children.length).toBe(1);
    const monthLabel = calendarMonthYearViewContainer.children[0];
    expect(monthLabel.nodeName).toBe('LABEL');
    expect(monthLabel.innerHTML).toBe('SEPTEMBER');
  });
});

describe('CalendarMonthYearView only year', () => {
  it('CalendarMonthYearView Component should render all information', () => {
    const { debug, getByTestId } = render(
      <CalendarMonthYearView year={2017} />
    );
    const calendarMonthYearViewContainer = getByTestId(
      'calendar-month-year-view-container'
    );
    expect(calendarMonthYearViewContainer.children.length).toBe(1);
    const yearLabel = calendarMonthYearViewContainer.children[0];
    expect(yearLabel.nodeName).toBe('LABEL');
    expect(yearLabel.innerHTML).toBe('2017');
  });
});
