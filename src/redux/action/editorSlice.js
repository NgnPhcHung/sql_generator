import { createSlice } from "@reduxjs/toolkit";

const editorSlice = createSlice({
  name: "editor",
  initialState: {
    tableList: [],
    foreignList: [],
    editorFileContent: ''
  },
  reducers: {
    editTableList(state, action) {
      const newEdit = action.payload;
      state.tableList = newEdit;
    },
    editForeign(state, action){
      const newForeign = action.payload
      state.foreignList = newForeign
    },
    setEditorContent(state, action) {
      const contentData = action.payload
      state.editorFileContent = contentData
    }
  },
});

export const editorAction = editorSlice.actions;
export default editorSlice;
