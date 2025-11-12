import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./components/App";
import HomePage from "./pages/HomePage";
import TypePage from "./pages/TypePage";
import ManageTypesPage from "./pages/ManageTypesPage";
import "./store/persistence";
import { store } from "./store/store";
const theme = createTheme({ palette: { mode: "light" } });
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/type/:id" element={<TypePage />} />
              <Route path="/manage" element={<ManageTypesPage />} />
            </Routes>
          </App>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
