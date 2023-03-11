import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./Store/Store";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#000",
    },
  },
  overrides: {
    MuiInput: {
      input: {
        "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
          display: "none",
        },
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </StyledEngineProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
