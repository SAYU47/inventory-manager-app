import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MachineType, Field } from "../types";
import { uuid } from "../utils/uuid";

const LOCAL_STORAGE_KEY = "mm_types_tabs_v1";

const DEFAULT_MACHINE_TYPES: MachineType[] = [
  {
    id: "t1",
    name: "Chainsaws",
    fields: [
      { id: "f1", name: "Model", type: "text" },
      { id: "f2", name: "Date build", type: "date" },
      { id: "f3", name: "Quantity", type: "number" },
    ],
    titleFieldId: "f1",
  },
  {
    id: "t2",
    name: "Bulldozers",
    fields: [
      { id: "b1", name: "Model", type: "text" },
      { id: "b2", name: "Power net", type: "number" },
      { id: "b3", name: "Operating weight", type: "number" },
    ],
    titleFieldId: "b1",
  },
];

const loadInitialState = (): MachineType[] => {
  try {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : DEFAULT_MACHINE_TYPES;
  } catch (error) {
    console.error("Failed to load machine types from localStorage:", error);
    return DEFAULT_MACHINE_TYPES;
  }
};

const typesSlice = createSlice({
  name: "types",
  initialState: loadInitialState,
  reducers: {
    addType: (state, action: PayloadAction<{ name: string }>) => {
      const newType: MachineType = {
        id: uuid(),
        name: action.payload.name,
        fields: [],
      };
      state.push(newType);
    },

    updateTypeName: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const type = state.find(type => type.id === action.payload.id);
      if (type) {
        type.name = action.payload.name;
      }
    },

    addField: (
      state,
      action: PayloadAction<{ typeId: string; field: Omit<Field, "id"> }>
    ) => {
      const { typeId, field } = action.payload;
      const type = state.find(type => type.id === typeId);
      
      if (type) {
        const newField: Field = {
          id: uuid(),
          ...field,
        };
        type.fields.push(newField);
      }
    },

    updateField: (
      state,
      action: PayloadAction<{ typeId: string; field: Field }>
    ) => {
      const { typeId, field } = action.payload;
      const type = state.find(type => type.id === typeId);
      
      if (!type) return;

      const fieldIndex = type.fields.findIndex(f => f.id === field.id);
      if (fieldIndex >= 0) {
        type.fields[fieldIndex] = field;
      }
    },

    setTitleField: (
      state,
      action: PayloadAction<{ typeId: string; fieldId?: string }>
    ) => {
      const { typeId, fieldId } = action.payload;
      const type = state.find(type => type.id === typeId);
      
      if (type) {
        type.titleFieldId = fieldId;
      }
    },

    removeType: (state, action: PayloadAction<string>) => {
      return state.filter(type => type.id !== action.payload);
    },
  },
});

export const {
  addType,
  updateTypeName,
  addField,
  updateField,
  setTitleField,
  removeType,
} = typesSlice.actions;

export default typesSlice.reducer;