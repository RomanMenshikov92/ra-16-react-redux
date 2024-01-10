import { Product, AddItemAction } from "../interfaces/types";

export const ADD_PRODUCT = "ADD_PRODUCT";

export const addProduct = (product: Product): AddItemAction => ({
  type: ADD_PRODUCT,
  payload: product,
});
