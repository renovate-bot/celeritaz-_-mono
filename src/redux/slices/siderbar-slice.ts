import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  isIconsOnly: boolean;
} = {
  isIconsOnly: true
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isIconsOnly = !state.isIconsOnly;
    }
  }
});

// Action creators are generated for each case reducer function
export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
