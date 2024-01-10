import { Item, EditingActionTypes, EditingState } from "../interfaces/types";
import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from "./actions";

const initialState: EditingState = {
  items: [],
};

export const editingReducer = (state = initialState, action: EditingActionTypes): EditingState => {
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
    default:
      return state;
  }
};

export default editingReducer;
