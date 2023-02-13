import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const BasketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let copy = [...state.items];
      if (index !== -1) {
        copy.splice(index, 1);
      } else {
        alert("Item not found");
      }
      state.items = copy;
    },
    clearBasket: (state) => {
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket, clearBasket } =
  BasketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemsById = (state, id) =>
  state.basket.items.filter((item) => item.id === id);

export const selectBasketTotal = (state) =>
  state.basket.items.reduce((total, item) => (total += item.price), 0);

export default BasketSlice.reducer;
