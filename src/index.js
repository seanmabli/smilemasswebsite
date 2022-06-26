import * as React from "react";
import ReactDOM from "react-dom/client";
import "./firebase";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./compodents/navbar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <React.Fragment>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </React.Fragment>
  </>
);
