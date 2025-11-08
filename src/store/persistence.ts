import debounce from "lodash.debounce";
import { store } from "./store";

const STORAGE_KEYS = {
  TYPES: "mm_types_tabs_v1",
  ITEMS: "mm_items_tabs_v1",
} as const;

const saveStateToStorage = () => {
  const currentState = store.getState();
  
  localStorage.setItem(STORAGE_KEYS.TYPES, JSON.stringify(currentState.types));
  localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(currentState.items));
};

const debouncedSave = debounce(saveStateToStorage, 500);


store.subscribe(() => {
  debouncedSave();
});


saveStateToStorage();