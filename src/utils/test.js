import React from 'react';
import { render } from '@testing-library/react';

import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from '@reach/router';

import { createStore } from 'redux';
import reducer from './../redux/reducers/index';
import { Provider } from 'react-redux';

export function renderRouteRedux(
  ui,
  {
    route = '/',
    history = createHistory(createMemorySource(route)),
    initialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <LocationProvider history={history}>{children}</LocationProvider>
      </Provider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export function renderRedux(
  ui,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export function renderReduxWithRouter(
  ui,
  {
    route = '/',
    history = createHistory(createMemorySource(route)),
    initialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) {
  return {
    ...render(
      <Provider store={store}>
        <LocationProvider history={history}>{ui}</LocationProvider>
      </Provider>
    ),
    history,
  };
}
