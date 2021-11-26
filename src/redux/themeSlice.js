import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: "dark",
  },
  reducers: {
    changeTheme: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      if (state.value === "light") {
        document.documentElement.style.setProperty(
          "--element",
          "hsl(209, 23%, 22%)"
        );
        document.documentElement.style.setProperty(
          "--background",
          "hsl(207, 26%, 17%)"
        );
        document.documentElement.style.setProperty(
          "--text",
          "hsl(0, 0%, 100%)"
        );

        state.value = "dark";
        document.cookie = "theme=dark;path=/;";
      } else {
        document.documentElement.style.setProperty(
          "--element",
          "hsl(0, 0%, 100%)"
        );
        document.documentElement.style.setProperty(
          "--background",
          "hsl(0, 0%, 98%)"
        );
        document.documentElement.style.setProperty(
          "--text",
          "hsl(200, 15%, 8%)"
        );

        state.value = "light";
        document.cookie = "theme=light; path=/;";
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
