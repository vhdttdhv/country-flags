import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    text: {
      primary: "var(--text)",
    },
  },
  typography: {
    allVariants: {
      background: "var(--element)",
      fontSize: "0.9em",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
