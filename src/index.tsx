import "./index.scss";

import {CssBaseline, ThemeProvider} from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import App from "./App";
import {setupStore} from "./redux";
import {theme} from "./theme";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const store = setupStore();

root.render(
   <>
      <CssBaseline/>
      <ThemeProvider theme={theme}>
         <BrowserRouter>
            <Provider store={store}>
               <App/>
            </Provider>
         </BrowserRouter>
      </ThemeProvider>
   </>
);
