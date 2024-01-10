import { Item, AddItemAction, DeleteItemAction, UpdateItemAction, FilterItemAction } from "../interfaces/types";

export const ADD_ITEM = "ADD_ITEM";
export const UPDATE_ITEM = "UPDATE_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const FILTER_ITEM = "FILTER_ITEM";

export const addItem = (item: Item): AddItemAction => ({
  type: ADD_ITEM,
  payload: item,
});

export const updateItem = (item: Item): UpdateItemAction => ({
  type: UPDATE_ITEM,
  payload: item,
});

export const deleteItem = (itemId: number): DeleteItemAction => ({
  type: DELETE_ITEM,
  payload: itemId,
});

export const filterItem = (filter: string): FilterItemAction => ({
  type: FILTER_ITEM,
  payload: filter,
});
