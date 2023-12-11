import { configureStore } from "@reduxjs/toolkit";
import testSlice from "./test/test.slice";

export const store = configureStore({
  reducer: {
    counter: testSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
