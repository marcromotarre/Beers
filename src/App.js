import React, { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';

import Home from './components/Home';
import * as types from './redux/constants';
import DataManager from './components/DataManager';

const App = () => {
  const dispatch = useDispatch();
  dispatch({
    type: types.fetchRequested,
    url: 'https://api.punkapi.com/v2/beers',
    fetchSucceeded: types.fetchSucceededBeers,
    fetchPending: types.fetchPendingBeers,
    fetchFailed: types.fetchFailedBeers,
  });

  return (
    <DataManager>
      <Home />
    </DataManager>
  );
};

export default App;
