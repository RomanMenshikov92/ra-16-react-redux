import { ADD_PRODUCT } from "../redux/actions";

export interface Product {
  id: number;
  name: string;
  image: string;
  newPrice: string;
  oldPrice: string;
  discount: boolean;
  discountValue: string;
}

export interface MarketState {
  products: Product[];
}

export interface RootState {
  marketing: MarketState;
}

export interface AddItemAction {
  type: typeof ADD_PRODUCT;
  payload: Product;
  [key: string]: any;
}

export type ProductActionTypes = AddItemAction;
