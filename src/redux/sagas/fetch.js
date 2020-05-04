import { call, put, takeEvery } from "redux-saga/effects";
import { fetchData as fetchDataUtils } from "../../utils/fetch";
import { fetchRequested } from "../constants";

export function* a() {
  yield put({ type: "FETCH_PENDING_BEERS" });
}

export function* fetchData({ url, fetchSucceeded, fetchPending, fetchFailed }) {
  try {
    yield put({ type: fetchPending });
    const data = yield call(fetchDataUtils, url);
    yield put({ type: fetchSucceeded, data });
  } catch (error) {
    yield put({ type: fetchFailed });
  }
}

export default function* fetchFromUrl() {
  yield takeEvery(fetchRequested, fetchData);
}
