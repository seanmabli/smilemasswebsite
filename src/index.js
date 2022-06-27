import * as React from "react";
import ReactDOM from "react-dom/client";
import "./firebase/firebase";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar, MobileNavbarOpened } from "./components/navbar";

import Home from "./pages/home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <React.Fragment>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  </>
);

window.addEventListener("resize", MobileNavbarOpened);