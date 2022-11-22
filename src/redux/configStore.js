import { combineReducers, createStore, applyMiddleware } from "redux";
import MovieReducer from "./reducers/MovieReducer";
import { rootSaga } from "./sagas/rootSaga";
//  middleware saga
import createMiddleWareSaga from "redux-saga";

const rootReducer = combineReducers({
  MovieReducer,
});

const middleWareSaga = createMiddleWareSaga();

const store = createStore(rootReducer, applyMiddleware(middleWareSaga));

middleWareSaga.run(rootSaga);

export default store;
