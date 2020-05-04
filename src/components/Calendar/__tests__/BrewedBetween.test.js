import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';

import BrewedBetween from '../BrewedBetween';
import beers from '../../../fixtures/beers';
import { renderRedux } from '../../../utils/test';

/** this component should:
 *  render:
 *      - Calendar from & Calendar to (view and selected versions)
 *
 *  actions:
 *      - swipe from view and selected calendar version
 *      - dispatch setBrewedFrom when from selection calendar is closed
 *      - dispatch setBrewedTo when to selection calendar is closed
 *
 */

const initialState = {
  beersReducer: { pending: false, error: false, beers },
  filtersReducer: {
    brewedFrom: { month: 3, year: 2013 },
    brewedTo: { month: 5, year: 2017 },
  },
};

describe('BrewedBetween Component Snapshots', () => {
  it('BrewedBetween Snapshots', () => {
    expect(
      renderRedux(<BrewedBetween />, {
        initialState,
      }).baseElement
    ).toMatchSnapshot();
  });
});

describe('BrewedBetween', () => {
  it('BrewedBetween Component should render all information', () => {
    const { queryByTestId, getByTestId } = renderRedux(<BrewedBetween />, {
      initialState,
    });

    const brewedBetweenContainer = getByTestId('brewed-between-container');
    expect(brewedBetweenContainer.children.length).toBe(1);
    const brewedBetweenInfo = brewedBetweenContainer.children[0];
    expect(brewedBetweenInfo.children.length).toBe(3);

    expect(queryByTestId('calendar-month-year-view-2013-3')).toBeTruthy();
    expect(queryByTestId('calendar-month-year-view-2017-5')).toBeTruthy();
  });

  it('should change View Calendar to selection Calendar when click on it', () => {
    const { queryByTestId } = renderRedux(<BrewedBetween />, {
      initialState,
    });
    expect(queryByTestId('calendar-month-year-view-2013-3')).toBeTruthy();
    fireEvent.click(queryByTestId('calendar-month-year-view-2013-3'));
    expect(queryByTestId('calendar-month-year-view-2013-3')).toBeFalsy();
  });

  it('should change month when click on calendar, select diferent month and close it', () => {
    const { queryByTestId, getByTestId } = renderRedux(<BrewedBetween />, {
      initialState,
    });
    fireEvent.click(queryByTestId('calendar-month-year-view-2013-3'));

    const calendarMonthYearSelectionContainer = getByTestId(
      'calendar-month-year-selection-container'
    );

    const months = calendarMonthYearSelectionContainer.children[0];
    const january = months.children[0];
    fireEvent.click(january);

    expect(queryByTestId('calendar-month-year-view-2013-3')).toBeFalsy();
    expect(queryByTestId('calendar-month-year-view-2013-1')).toBeFalsy();
    fireEvent.click(
      queryByTestId('calendar-month-year-selection-check-button')
    );
    expect(queryByTestId('calendar-month-year-view-2013-3')).toBeFalsy();
    expect(queryByTestId('calendar-month-year-view-2013-1')).toBeTruthy();
  });
});
