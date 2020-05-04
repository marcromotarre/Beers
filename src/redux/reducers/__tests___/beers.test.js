import reducer from '../beers';
import * as types from './../../constants';
import beers from '../../../fixtures/beers';

describe('beers reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      pending: false,
      error: null,
      beers: [],
    });
  });

  it('fetchPendingBeers', () => {
    expect(
      reducer(undefined, {
        type: types.fetchPendingBeers,
      })
    ).toEqual({
      pending: true,
      error: null,
      beers: [],
    });
  });

  it('fetchSucceededBeers', () => {
    expect(
      reducer(undefined, {
        type: types.fetchSucceededBeers,
        data: beers,
      })
    ).toEqual({
      pending: false,
      error: null,
      beers: beers,
    });
  });

  it('fetchFailedBeers', () => {
    expect(
      reducer(undefined, {
        type: types.fetchFailedBeers,
        data: beers,
      })
    ).toEqual({
      pending: false,
      error: true,
      beers: [],
    });
  });
});
