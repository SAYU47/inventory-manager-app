import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppShell from "./components/AppShell";
import Home from "./views/Home";
import TypePage from "./views/TypePage";
import ManageTypes from "./views/ManageTypes";
import "./store/persistence";
import { store } from "./store/store";
const theme = createTheme({ palette: { mode: "light" } });
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AppShell>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/type/:id" element={<TypePage />} />
              <Route path="/manage" element={<ManageTypes />} />
            </Routes>
          </AppShell>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
