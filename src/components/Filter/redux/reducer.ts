import { Item, FilterActionTypes, FilterState } from "../interfaces/types";
import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, FILTER_ITEM } from "./actions";

const initialState: FilterState = {
  items: [],
  filter: "",
};

export const filterReducer = (state = initialState, action: FilterActionTypes): FilterState => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item: Item) => (item.id === action.payload.id ? action.payload : item)),
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item: Item) => item.id !== action.payload),
      };
    case FILTER_ITEM:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
