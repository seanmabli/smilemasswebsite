import * as React from "react";
import ReactDOM from "react-dom/client";
import "./firebase/firebase";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar, MobileNavbarOpened } from "./components/navbar";

import Accomplishments from "./pages/accomplishments";
import BeachHouse from "./pages/beachhouse";
import ClubSmileMass from "./pages/clubsmilemass";
import CommunityWithinACommunity from "./pages/communitywithinacommunity";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <React.Fragment>
      <BrowserRouter>
        <Navbar />
        <Routes>
          
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  </>
);

window.addEventListener("resize", MobileNavbarOpened);