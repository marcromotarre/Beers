import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import CalendarMonthYearSelection from '../CalendarMonthYearSelection';

/** this component should:
 *  paint year and month info inside calendar
 *      - month its transformed in text with the month name (capital letters)
 *
 *  props:
 *      - month: number of the month
 *      - year: number of the year
 *
 */

const props = {
  defaultSelectedMonth: 3,
  defaultSelectedYear: 2018,
  months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  years: [2013, 2014, 2015, 2016, 2017, 2018, 2019],
  onClickCheck: jest.fn(),
};

describe('CalendarMonthYearSelection Component Snapshots', () => {
  it('CalendarMonthYearSelection Snapshots', () => {
    expect(
      renderer.create(<CalendarMonthYearSelection {...props} />)
    ).toMatchSnapshot();
  });
});

describe('CalendarMonthYearSelection all months and years between 2013 an 2019', () => {
  it('CalendarMonthYearSelection Component should render all information', () => {
    const { container, getByTestId } = render(
      <CalendarMonthYearSelection {...props} />
    );
    const calendar = container.children[0];
    expect(calendar.nodeName).toBe('SECTION');

    const calendarMonthYearSelectionContainer = getByTestId(
      'calendar-month-year-selection-container'
    );
    expect(calendarMonthYearSelectionContainer.children.length).toBe(2);

    const months = calendarMonthYearSelectionContainer.children[0];
    expect(months.nodeName).toBe('DIV');
    expect(months.children.length).toBe(12);

    const january = months.children[0];
    expect(january.nodeName).toBe('BUTTON');
    expect(january.getAttribute('id')).toBe(`${1}`);
    const januaryLabel = january.children[0];
    expect(januaryLabel.nodeName).toBe('LABEL');
    expect(januaryLabel.innerHTML).toBe('JAN');
    expect(januaryLabel.getAttribute('class')).toBe(``);

    const march = months.children[2];
    expect(march.nodeName).toBe('BUTTON');
    expect(march.getAttribute('id')).toBe(`${3}`);
    const marchLabel = march.children[0];
    expect(marchLabel.nodeName).toBe('LABEL');
    expect(marchLabel.innerHTML).toBe('MAR');
    expect(marchLabel.getAttribute('class')).toBe(`selected`);

    const years = calendarMonthYearSelectionContainer.children[1];
    expect(years.nodeName).toBe('DIV');
    expect(years.children.length).toBe(7);

    const year2013 = years.children[0];
    expect(year2013.nodeName).toBe('BUTTON');
    expect(year2013.getAttribute('id')).toBe(`${2013}`);
    const year2013Label = year2013.children[0];
    expect(year2013Label.nodeName).toBe('LABEL');
    expect(year2013Label.innerHTML).toBe('2013');
    expect(year2013Label.getAttribute('class')).toBe(``);

    const year2018 = years.children[5];
    expect(year2018.nodeName).toBe('BUTTON');
    expect(year2018.getAttribute('id')).toBe(`${2018}`);
    const year2018Label = year2018.children[0];
    expect(year2018Label.nodeName).toBe('LABEL');
    expect(year2018Label.innerHTML).toBe('2018');
    expect(year2018Label.getAttribute('class')).toBe(`selected`);

    const actions = getByTestId('actions');
    expect(actions.children.length).toBe(1);

    const checkButton = actions.children[0];
    expect(checkButton.nodeName).toBe('BUTTON');

    const checkIcon = checkButton.children[0];
    expect(checkIcon.nodeName).toBe('svg');
  });

  it('should change month selected when click a month', () => {
    const { getByTestId } = render(<CalendarMonthYearSelection {...props} />);

    const calendarMonthYearSelectionContainer = getByTestId(
      'calendar-month-year-selection-container'
    );
    const months = calendarMonthYearSelectionContainer.children[0];
    const january = months.children[0];
    const januaryLabel = january.children[0];
    const march = months.children[2];
    const marchLabel = march.children[0];

    expect(januaryLabel.getAttribute('class')).toBe(``);
    expect(marchLabel.getAttribute('class')).toBe(`selected`);
    fireEvent.click(january);
    expect(januaryLabel.getAttribute('class')).toBe(`selected`);
    expect(marchLabel.getAttribute('class')).toBe(``);
  });

  it('should change year selected when click a month', () => {
    const { getByTestId } = render(<CalendarMonthYearSelection {...props} />);

    const calendarMonthYearSelectionContainer = getByTestId(
      'calendar-month-year-selection-container'
    );
    const years = calendarMonthYearSelectionContainer.children[1];
    const year2013 = years.children[0];
    const year2013Label = year2013.children[0];
    const year2018 = years.children[5];
    const year2018Label = year2018.children[0];

    expect(year2013Label.getAttribute('class')).toBe(``);
    expect(year2018Label.getAttribute('class')).toBe(`selected`);
    fireEvent.click(year2013);
    expect(year2013Label.getAttribute('class')).toBe(`selected`);
    expect(year2018Label.getAttribute('class')).toBe(``);
  });

  it('should call onClickCheck props when click on check', () => {
    const { getByTestId } = render(<CalendarMonthYearSelection {...props} />);

    const actions = getByTestId('actions');
    const check = actions.children[0];

    expect(props.onClickCheck).toHaveBeenCalledTimes(0);
    fireEvent.click(check);
    expect(props.onClickCheck).toHaveBeenCalledTimes(1);
    expect(props.onClickCheck).toHaveBeenLastCalledWith({
      month: 3,
      year: 2018,
    });

    const calendarMonthYearSelectionContainer = getByTestId(
      'calendar-month-year-selection-container'
    );
    const months = calendarMonthYearSelectionContainer.children[0];
    const february = months.children[1];
    const years = calendarMonthYearSelectionContainer.children[1];
    const year2014 = years.children[1];
    fireEvent.click(year2014);
    fireEvent.click(february);

    expect(props.onClickCheck).toHaveBeenCalledTimes(1);
    fireEvent.click(check);
    expect(props.onClickCheck).toHaveBeenCalledTimes(2);
    expect(props.onClickCheck).toHaveBeenLastCalledWith({
      month: 2,
      year: 2014,
    });
  });
});
