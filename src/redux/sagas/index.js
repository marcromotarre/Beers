import { all } from "redux-saga/effects";
import fetchFromUrl from "./fetch";

export default function* rootSaga() {
  yield all([fetchFromUrl()]);
}
