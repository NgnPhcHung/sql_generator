import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    themeLight: false
  },
  reducers: {
    toggleTheme (state) {
      state.themeLight = !state.themeLight
    }
  }
});

export const appSliceAction = appSlice.actions;
export default appSlice;
