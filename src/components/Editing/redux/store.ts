import { combineReducers, compose, legacy_createStore, Store } from "redux";
import { editingReducer } from "./reducer";
import { RootState } from "../interfaces/types";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: () => any;
  }
}

const ReactReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

function configureStoreEditing(): Store<RootState> {
  return legacy_createStore(
    combineReducers({
      editing: editingReducer,
    }),
    undefined,
    compose(ReactReduxDevTools)
  );
}

export default configureStoreEditing;
