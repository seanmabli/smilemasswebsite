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
import Resources from "./pages/resources";
import RunningTeam from "./pages/runningteam";
import SmileBlog from "./pages/smileblog";
import Testimonials from "./pages/testimonials";
import OurTeam from "./pages/ourteam";
import OurMission from "./pages/ourmission";
import Volunteer from "./pages/volunteer";

import AdminContact from "./admin/contact";

import { AuthProvider, PrivateRoute } from "./firebase/auth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <React.Fragment>
      <BrowserRouter>
      <div >
        <div className="site">
          <Navbar />
          <AuthProvider>
            <Routes>
              <Route path="/accomplishments" element={<Accomplishments />} />

              <Route exact path="/account" element={<PrivateRoute />} />

              <Route path="/admin/contact" element={<AdminContact />} />

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
              <Route
                path="/initiative/community-within-a-community"
                element={<Navigate to="/communitywithinacommunity" />}
              />

              <Route path="/contact" element={<Contact />} />

              <Route path="/donate" element={<Donate />} />
              <Route path="/support-us" element={<Navigate to="/donate" />} />

              <Route
                path="/equipmentloanerprogram"
                element={<EquipmentLoanerProgram />}
              />
              <Route
                path="/initiative/equipment-loaner-program"
                element={<Navigate to="/equipmentloanerprogram" />}
              />

              <Route path="/events" element={<Events />} />

              <Route path="/faq" element={<FAQ />} />
              <Route path="/f-a-q" element={<Navigate to="/faq" />} />

              <Route path="/" element={<Home />} />

              <Route path="/inthenews" element={<InTheNews />} />
              <Route
                path="/in-the-news"
                element={<Navigate to="/inthenews" />}
              />

              <Route
                path="/jointhecoffeeclub"
                element={<JoinTheCoffeeClub />}
              />
              <Route
                path="/initiative/coffee-club"
                element={<Navigate to="/jointhecoffeeclub" />}
              />

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
              <Route
                path="/our-mission"
                element={<Navigate to="/ourmission" />}
              />

              <Route path="/resources" element={<Resources />} />

              <Route path="/runningteam" element={<RunningTeam />} />
              <Route
                path="/smile-mass-running-team"
                element={<Navigate to="/runningteam" />}
              />

              <Route path="/smileblog" element={<SmileBlog />} />
              <Route
                paht="/smile-blog"
                element={<Navigate to="/smileblog" />}
              />

              <Route path="/testimonials" element={<Testimonials />} />

              <Route path="/ourteam" element={<OurTeam />} />
              <Route path="/our-team" element={<Navigate to="/ourteam" />} />

              <Route path="/volunteer" element={<Volunteer />} />
              <Route
                path="/learn-how-to-get-involved-with-smile-mass"
                element={<Navigate to="/volunteer" />}
              />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AuthProvider>
        </div>
        </div>
      </BrowserRouter>
    </React.Fragment>
  </>
);
