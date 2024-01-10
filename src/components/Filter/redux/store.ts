import { combineReducers, compose, legacy_createStore, Store } from "redux";
import { filterReducer } from "./reducer";
import { RootState } from "../interfaces/types";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: () => any;
  }
}

const ReactReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

function configureStoreFilter(): Store<RootState> {
  return legacy_createStore(
    combineReducers({
      filtering: filterReducer,
    }),
    undefined,
    compose(ReactReduxDevTools)
  );
}

export default configureStoreFilter;
