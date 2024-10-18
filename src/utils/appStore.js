import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
const appStore = configureStore({
  reducer: { user },
});

export default appStore;
