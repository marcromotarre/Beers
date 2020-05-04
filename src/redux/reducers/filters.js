import { setBrewedFrom, setBrewedTo, setBrewedFromTo } from '../constants';

export const initialState = {
  brewedTo: {
    month: 0,
    year: 0,
  },
  brewedFrom: {
    month: 0,
    year: 0,
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case setBrewedFrom:
      return {
        ...state,
        brewedFrom: action.brewedFrom,
      };
    case setBrewedTo:
      return {
        ...state,
        brewedTo: action.brewedTo,
      };
    case setBrewedFromTo:
      return {
        ...state,
        brewedFrom: action.brewed.from,
        brewedTo: action.brewed.to,
      };
    default:
      return {
        ...state,
      };
  }
}
