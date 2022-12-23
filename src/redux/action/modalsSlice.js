import { createSlice } from "@reduxjs/toolkit";

const modalsSlice = createSlice({
  name: "models",
  initialState: {
    modalDocOpen: false,
    modalPreviewOpen: false,
  },
  reducers: {
    toggleDocModel (state) {
      state.modalDocOpen = !state.modalDocOpen
    },
    togglePreviewModal (state) {
      state.modalPreviewOpen = !state.modalPreviewOpen
    },
    closePreviewModal (state){
      state.modalPreviewOpen = false
    }
  }
});

export const modalDocAction = modalsSlice.actions;
export default modalsSlice;
