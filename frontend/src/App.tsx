import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StageProvider } from "./app-context/stage-context";
import Home from "./pages/Home";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import { RecordContextLayout } from "./app-context/record-context";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html {
    --orange: #FFB37B;
    --lightorange: #FFD9BD;
    --darkgrey: #676767;
    --grey: #A0A0A0;
    --lightgrey: #ECECEC;
    --white: #FFFFFF;
  }
`

function App() {
  return (
    <BrowserRouter>
    <GlobalStyles />
      <StageProvider>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<RecordContextLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </StageProvider>
    </BrowserRouter>
  );
}

export default App;
