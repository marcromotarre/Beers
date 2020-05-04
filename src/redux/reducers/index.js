import { combineReducers } from 'redux';
import beersReducer from './beers';
import filtersReducer from './filters';

export default combineReducers({
  beersReducer,
  filtersReducer,
});
