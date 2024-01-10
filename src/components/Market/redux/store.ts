import { combineReducers, compose, legacy_createStore, Store } from "redux";
import { marketReducer } from "./reducer";
import { RootState } from "../interfaces/types";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: () => any;
  }
}

const ReactReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

function configureStoreMarket(): Store<RootState> {
  return legacy_createStore(
    combineReducers({
      marketing: marketReducer,
    }),
    undefined,
    compose(ReactReduxDevTools)
  );
}

export default configureStoreMarket;
