import { put, call, takeEvery } from 'redux-saga/effects';
import { runSaga } from 'redux-saga';
import fetchFromUrl, { fetchData, a } from '../fetch';
import * as types from '../../constants';
import defaultBeers from '../../../fixtures/beers';
import * as api from '../../../utils/fetch';

const values = {
  url: 'https://api.punkapi.com/v2/beers',
  fetchSucceeded: 'FETCH_SUCCEED',
  fetchPending: 'FETCH_PENDING',
  fetchFailed: 'FETCH_FAILED',
};

describe('fetchFromUrl', () => {
  const genObject = fetchFromUrl(values);

  it('should call fetchData', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(types.fetchRequested, fetchData)
    );
  });

  it('should be done on next iteration', () => {
    expect(genObject.next().done).toBeTruthy();
  });
});

describe('fetchData', () => {
  it('should call api and dispatch success action', async () => {
    const dummyBeers = defaultBeers;
    const requestBeers = jest
      .spyOn(api, 'fetchData')
      .mockImplementation(() => Promise.resolve(dummyBeers));

    expect(requestBeers).toHaveBeenCalledTimes(0);

    const dispatched = [];
    await runSaga(
      {
        dispatch: (data) => {
          dispatched.push(data);
        },
      },
      fetchData,
      values
    );

    expect(requestBeers).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual({ type: values.fetchPending });
    expect(dispatched[1]).toEqual({
      type: values.fetchSucceeded,
      data: dummyBeers,
    });
    requestBeers.mockClear();
  });

  it('should call api and dispatch error action', async () => {
    const dummyBeers = defaultBeers;
    const requestBeers = jest
      .spyOn(api, 'fetchData')
      .mockImplementation(() => Promise.reject());

    expect(requestBeers).toHaveBeenCalledTimes(0);

    const dispatched = [];
    await runSaga(
      {
        dispatch: (data) => dispatched.push(data),
      },
      fetchData,
      values
    );

    expect(requestBeers).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual({ type: values.fetchPending });
    expect(dispatched[1]).toEqual({ type: values.fetchFailed });
  });
});
