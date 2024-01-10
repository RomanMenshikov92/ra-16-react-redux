import { Item, AddItemAction, DeleteItemAction, UpdateItemAction } from "../interfaces/types";

export const ADD_ITEM = "ADD_ITEM";
export const UPDATE_ITEM = "UPDATE_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";

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
