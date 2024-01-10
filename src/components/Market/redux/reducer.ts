import { ProductActionTypes, MarketState } from "../interfaces/types";
import { ADD_PRODUCT } from "./actions";

const initialState: MarketState = {
  products: [],
};

export const marketReducer = (state = initialState, action: ProductActionTypes): MarketState => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    default:
      return state;
  }
};

export default marketReducer;
