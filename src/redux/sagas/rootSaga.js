import { all } from "redux-saga/effects";
import * as MovieSaga from "./MovieSaga";

export function* rootSaga() {
  yield all([
    MovieSaga.ActionGetTvApi(),
    MovieSaga.ActionGetMovieApi(),
    MovieSaga.ActionGetGenreApi(),
    MovieSaga.ActionGetXWidthApi(),
    MovieSaga.ActionGetDetail(),
    MovieSaga.ActionGetVideo(),
    MovieSaga.ActionGetVideoByGenres(),
    MovieSaga.ActionGetListBySearchParams(),
    MovieSaga.ActionGetElseMovieType(),
  ]);
}
