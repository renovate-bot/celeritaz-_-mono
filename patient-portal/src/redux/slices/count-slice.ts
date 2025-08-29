import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  count: number;
} = {
  count: 0
};

export const countSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementCount: (state) => {
      state.count += 1;
    },
    updateCount: (state, action: PayloadAction<number>) => {
      return { ...state, count: action.payload };
    },
    // If you need to reset the facility to null with an action, you can do that as well
    clearCount: () => {
      return initialState;
    }
  }
});

// Action creators are generated for each case reducer function
export const { updateCount, clearCount, incrementCount } = countSlice.actions;

export default countSlice.reducer;
