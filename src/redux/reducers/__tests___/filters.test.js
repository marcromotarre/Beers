import reducer from '../filters';
import * as types from './../../constants';

describe('beers reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      brewedTo: {
        month: 0,
        year: 0,
      },
      brewedFrom: {
        month: 0,
        year: 0,
      },
    });
  });

  it('setBrewedFrom', () => {
    expect(
      reducer(undefined, {
        type: types.setBrewedFrom,
        brewedFrom: { month: 2, year: 10 },
      })
    ).toEqual({
      brewedTo: {
        month: 0,
        year: 0,
      },
      brewedFrom: { month: 2, year: 10 },
    });
  });

  it('setBrewedTo', () => {
    expect(
      reducer(undefined, {
        type: types.setBrewedTo,
        brewedTo: { month: 5, year: 6 },
      })
    ).toEqual({
      brewedTo: { month: 5, year: 6 },
      brewedFrom: { month: 0, year: 0 },
    });
  });

  it('setBrewedFromTo', () => {
    expect(
      reducer(undefined, {
        type: types.setBrewedFromTo,
        brewed: {
          from: { month: 2, year: 10 },
          to: { month: 5, year: 6 },
        },
      })
    ).toEqual({
      brewedTo: { month: 5, year: 6 },
      brewedFrom: { month: 2, year: 10 },
    });
  });
});
