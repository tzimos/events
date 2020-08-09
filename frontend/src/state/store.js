import rootReducer from "./reducers/index";
import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import {sagas} from "./sagas";

export const sagasMiddleware = createSagaMiddleware();

const composeMiddlewares = applyMiddleware(sagasMiddleware);

const composeEnhancers = ((process.env.NODE_ENV !== "production") && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(composeMiddlewares)
);
sagasMiddleware.run(sagas);
