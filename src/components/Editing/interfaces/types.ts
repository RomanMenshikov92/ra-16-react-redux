import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from "../redux/actions";

export interface Item {
  id: number;
  name: string;
  price: string;
}

export interface EditingState {
  items: Item[];
}

export interface RootState {
  editing: EditingState;
}

export interface AddItemAction {
  type: typeof ADD_ITEM;
  payload: Item;
  [key: string]: any;
}

export interface UpdateItemAction {
  type: typeof UPDATE_ITEM;
  payload: Item;
  [key: string]: any;
}

export interface DeleteItemAction {
  type: typeof DELETE_ITEM;
  payload: number;
  [key: string]: any;
}

export type EditingActionTypes = AddItemAction | UpdateItemAction | DeleteItemAction;
