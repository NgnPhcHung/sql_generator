import { configureStore } from '@reduxjs/toolkit'
import appSlice from './action/appSlice'
import editorSlice from './action/editorSlice'
import modalsSlice from './action/modalsSlice'

const store = configureStore({
  reducer:{
    editor: editorSlice.reducer,
    modals: modalsSlice.reducer,
    app: appSlice.reducer,
  }
})

export default store