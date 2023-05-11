import Fuse from "fuse.js";
import { create } from "zustand";

import bugs from "../lib/apiData/bugs.json";
import clothing from "../lib/apiData/clothing.json";
import fish from "../lib/apiData/fish.json";
import furniture from "../lib/apiData/furniture.json";
import recipes from "../lib/apiData/recipes.json";
import villagers from "../lib/apiData/villagers.json";

const useStore = create((set, get) => ({
  acquiredItems: [],
  allItems: [],
  fuse: null,

  itemName: "",
  inputPrompt: "Add something!",

  setAcquiredItems: (items) => set({ acquiredItems: items }),
  setItemName: (item) => set({ itemName: item }),
  setInputPrompt: (prompt) => set({ inputPrompt: prompt }),

  // add items to acquiredItems array in localStorage
  addAcquiredItem: (item) => {
    const acquiredItem = {
      ...item,
      isAcquired: true,
      acquireDate: new Date().toLocaleDateString(),
    };
    const storedItems = JSON.parse(localStorage.getItem("acquiredItems")) || [];
    const newStoredItems = [...storedItems, acquiredItem];
    localStorage.setItem("acquiredItems", JSON.stringify(newStoredItems));
    set({ acquiredItems: newStoredItems });
  },

  // load items from acquiredItems array in localStorage
  loadAcquiredItems: () => {
    const storedItems = localStorage.getItem("acquiredItems");
    if (storedItems) {
      set({ acquiredItems: JSON.parse(storedItems) });
    }
  },

  // prepare items for search
  loadAllItems: () => {
    const allItems = [
      ...bugs,
      ...fish,
      ...furniture,
      ...villagers,
      ...recipes,
      ...clothing,
    ];

    // create fuse object for searching items
    const options = {
      includeScore: true,
      keys: ["name"],
    };
    const fuse = new Fuse(allItems, options);
    set({ allItems, fuse });
  },

  // function to search for items using fuse.js
  searchItems: (searchTerm) => {
    const fuse = get().fuse;
    const results = fuse.search(searchTerm);
    return results.map(({ item }) => item);
  },
}));

export default useStore;
