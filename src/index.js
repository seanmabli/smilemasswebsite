import * as React from "react";
import ReactDOM from "react-dom/client";
import "./firebase/firebase";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/navbar";

import Accomplishments from "./pages/accomplishments";
import BeachHouse from "./pages/beachhouse";
import ClubSmileMass from "./pages/clubsmilemass";
import CommunityWithinACommunity from "./pages/communitywithinacommunity";
import Contact from "./pages/contact";
import Donate from "./pages/donate";
import EquipmentLoanerProgram from "./pages/equipmentloanerprogram";
import Events from "./pages/events";
import FAQ from "./pages/faq";
import Home from "./pages/home";
import InTheNews from "./pages/inthenews";
import JoinTheCoffeeClub from "./pages/jointhecoffeeclub";
import LocalBeachWheelchairLocations from "./pages/localbeachwheelchairlocations";
import NewsLetters from "./pages/newsletters";
import OurMission from "./pages/ourmission";
import Resources from "./pages/resources";
import RunningTeam from "./pages/runningteam";
import SmileBlog from "./pages/smileblog";
import Testimonials from "./pages/testimonials";
import TheStaff from "./pages/thestaff";
import Volunteer from "./pages/volunteer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <React.Fragment>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/accomplishments" element={<Accomplishments />} />

          <Route path="/beachhouse" element={<BeachHouse />} />
          <Route
            path="initiative/beach-house"
            element={<Navigate to="/beachhouse" />}
          />

          <Route path="/clubsmilemass" element={<ClubSmileMass />} />
          <Route
            path="/initiative/monthly-program-club-smile-mass"
            element={<Navigate to="/clubsmilemass" />}
          />

          <Route
            path="/communitywithinacommunity"
            element={<CommunityWithinACommunity />}
          />

          <Route path="/contact" element={<Contact />} />

          <Route path="/donate" element={<Donate />} />

          <Route
            path="/equipmentloanerprogram"
            element={<EquipmentLoanerProgram />}
          />

          <Route path="/events" element={<Events />} />

          <Route path="/faq" element={<FAQ />} />
          <Route path="/f-a-q" element={<Navigate to="/faq" />} />

          <Route path="/home" element={<Home />} />

          <Route path="/inthenews" element={<InTheNews />} />

          <Route path="/jointhecoffeeclub" element={<JoinTheCoffeeClub />} />

          <Route
            path="/localbeachwheelchairlocations"
            element={<LocalBeachWheelchairLocations />}
          />
          <Route
            path="/initiative/beach-wheelchairs/"
            element={<Navigate to="/localbeachwheelchairlocations" />}
          />

          <Route path="/newsletters" element={<NewsLetters />} />

          <Route path="/ourmission" element={<OurMission />} />
          <Route path="/our-mission" element={<Navigate to="/ourmission" />} />

          <Route path="/resources" element={<Resources />} />

          <Route path="/runningteam" element={<RunningTeam />} />

          <Route path="/smileblog" element={<SmileBlog />} />

          <Route path="/testimonials" element={<Testimonials />} />

          <Route path="/thestaff" element={<TheStaff />} />
          <Route path="/our-team" element={<Navigate to="/thestaff" />} />

          <Route path="/volunteer" element={<Volunteer />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  </>
);
