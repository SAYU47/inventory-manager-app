import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Machine } from "../types";
import { uuid } from "../utils/uuid";

const LOCAL_STORAGE_KEY = "mm_items_tabs_v1";

const loadInitialState = (): Machine[] => {
  try {
    const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    console.error("Failed to load items from localStorage:", error);
    return [];
  }
};

const itemsSlice = createSlice({
  name: "items",
  initialState: loadInitialState(),
  reducers: {
    addItem: (state, action: PayloadAction<{ typeId: string }>) => {
      const newItem: Machine = {
        id: uuid(),
        typeId: action.payload.typeId,
        values: {},
      };
      state.push(newItem);
    },
    
    updateValue: (
      state,
      action: PayloadAction<{ id: string; fieldId: string; value: string }>
    ) => {
      const { id, fieldId, value } = action.payload;
      const item = state.find(item => item.id === id);
      
      if (item) {
        item.values[fieldId] = value;
      }
    },
    
    removeItem: (state, action: PayloadAction<string>) => {
      return state.filter(item => item.id !== action.payload);
    },
  },
});

export const { addItem, updateValue, removeItem } = itemsSlice.actions;
export default itemsSlice.reducer;