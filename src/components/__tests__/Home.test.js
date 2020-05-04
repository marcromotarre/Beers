import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import Home from '../Home';
import { renderRedux } from '../../utils/test';

import beers from '../../fixtures/beers';

/** this component should render:
 *  -  a list of beers:
 *          or
 *  - label in casse the list is empty
 *
 */

const initialState = {
  beersReducer: { pending: false, error: false, beers },
};

describe('Home Component Snapshots', () => {
  it('Home Snapshots', () => {
    expect(
      renderRedux(<Home />, {
        initialState,
      }).baseElement
    ).toMatchSnapshot();
  });
});

describe('Home Component tests', () => {
  it('should render calendar', () => {
    const { getByTestId } = renderRedux(<Home />, {
      initialState,
    });

    expect(getByTestId('calendar-month-year-view-2007-9')).toBeTruthy();
    expect(getByTestId('calendar-month-year-view-2015-11')).toBeTruthy();
    expect(getByTestId('beers-list-container').children.length).toBeTruthy();
  });

  it('should render beers list', () => {
    const { getByTestId } = renderRedux(<Home />, {
      initialState,
    });
    expect(getByTestId('beers-list-container').children.length).toBe(3);
  });

  it('should render pagination list', () => {
    const { getByTestId } = renderRedux(<Home />, {
      initialState,
    });
    const pagination = getByTestId('pagination-container');
    expect(pagination.children.length).toBe(4);
  });
});
