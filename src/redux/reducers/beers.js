import {
  fetchPendingBeers,
  fetchSucceededBeers,
  fetchFailedBeers,
} from '../constants';

export const initialState = {
  pending: false,
  error: null,
  beers: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case fetchPendingBeers:
      return {
        ...state,
        pending: true,
      };
    case fetchSucceededBeers:
      return {
        ...state,
        pending: false,
        beers: action.data,
      };
    case fetchFailedBeers:
      return {
        ...state,
        pending: false,
        error: true,
      };
    default:
      return {
        ...state,
      };
  }
}
