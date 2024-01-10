import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, FILTER_ITEM } from "../redux/actions";

export interface Item {
  id: number;
  name: string;
  price: string;
}

export interface FilterState {
  items: Item[];
  filter: string;
}

export interface RootState {
  filtering: FilterState;
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

export interface FilterItemAction {
  type: typeof FILTER_ITEM;
  payload: string;
  [key: string]: any;
}

export type FilterActionTypes = AddItemAction | UpdateItemAction | DeleteItemAction | FilterItemAction;
