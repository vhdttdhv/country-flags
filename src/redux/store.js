import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import filterReducer from "./filterSlice";
import jsonReducer from "./jsonSlice";
import searchReducer from "./searchSlice";
export default configureStore({
  reducer: {
    theme: themeReducer,
    filter: filterReducer,
    json: jsonReducer,
    search: searchReducer,
  },
});
