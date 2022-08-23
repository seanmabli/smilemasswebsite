import { useState } from "react";
import { useNavigate, Link, Routes, Route, Navigate } from "react-router-dom";
import logo from "../images/logo.jpg";
import Dropdown from "./dropdown";
import { NavButton } from "../components/mui";
import "../index.css";
import "./navbar.css";

import { AccessiblePlaygrounds } from "../pages/accessibleplaygrounds";
import Accomplishments from "../pages/accomplishments";
import BeachHouse from "../pages/beachhouse";
import ClubSmileMass from "../pages/clubsmilemass";
import { CommunityRaceSponsors } from "../pages/communityracesponsors";
import CommunityWithinACommunity from "../pages/communitywithinacommunity";
import Contact from "../pages/contact";
import { CorporateSponsorships } from "../pages/corporatesponsorships";
import Donate from "../pages/donate";
import EquipmentLoanerProgram from "../pages/equipmentloanerprogram";
import Events from "../pages/events";
import FAQ from "../pages/faq";
import Home from "../pages/home";
import InTheNews from "../pages/inthenews";
import JoinTheCoffeeClub from "../pages/jointhecoffeeclub";
import BeachWheelchairLocations from "../pages/beachwheelchairlocations";
import LotteDiomede from "../pages/lottediomede";
import NewsLetters from "../pages/newsletters";
import Resources from "../pages/resources";
import RunningTeam from "../pages/runningteam";
import { SmileBlog, SmileBlogPost } from "../pages/smileblog";
import SusanBrown from "../pages/susanbrown";
import Testimonials from "../pages/testimonials";
import OurTeam from "../pages/ourteam";
import OurMission from "../pages/ourmission";
import Volunteer from "../pages/volunteer";

import Login from "../admin/login";
import Dashboard from "../admin/dashboard";
import AdminContact from "../admin/contact";
import { AdminSmileBlog, AdminSmileBlogEditor } from "../admin/smileblog";
import { AdminNewsletters, AdminNewslettersEditor } from "../admin/newsletters";
import AdminVollunteer from "../admin/volunteer";
import { AdminInTheNews, AdminInTheNewsEditor } from "../admin/inthenews";
import AdminEquiptmentLoanerProgram from "../admin/equipmentloanerprogram";
import AdminBeachWheelchairLocations from "../admin/beachwheelchairlocations";
import { AdminSponsors } from "../admin/sponsors";
import { AdminTestimonials } from "../admin/testimonials";
import { AdminEvents } from "../admin/events";
import { AdminFAQ } from "../admin/faq";

import { AuthProvider, AuthRoute, AuthSkipLogin } from "../firebase/auth";

function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen && window.innerWidth > 1000) {
    setIsOpen(true);
  }

  const toggle = () => setIsOpen(!isOpen);

  let navigate = useNavigate();

  const onOptionClicked = (value) => () => {
    setIsOpen(false); // why not work???
    navigate(value);
  };

  if (isOpen) {
    return (
      <>
        <img
          className="hamburger"
          src="https://img.icons8.com/small/32/547c94/delete-sign.png"
          alt="mobile navbar button"
          onClick={toggle}
        />
        <ul className="navbarcontent">
          <li className="item">
            <Dropdown
              title="About"
              options={[
                "Our Mission",
                "Our Team",
                "Testimonials",
                "Accomplishments",
                "FAQ",
                "Contact",
              ]}
              direction="left"
            />
          </li>
          <li className="item">
            <Dropdown
              title="Our Programs"
              options={[
                "Club SMILE Mass",
                "Beach Wheelchair Locations",
                "Beach House",
                "Community within a Community",
                "Equipment Loaner Program",
                "Accessible Playgrounds",
              ]}
              direction="left"
            />
          </li>
          <li className="item">
            <Dropdown
              title="Get Involved"
              options={["Running Team", "Volunteer"]}
              dropdownStyle={{ color: "#547c94" }}
              direction="left"
            />
          </li>
          <li className="item">
            <Dropdown
              title="News & Events"
              options={["Events", "In The News", "Newsletters", "SMILE Blog"]}
              direction="left"
            />
          </li>
          <li className="item">
            <NavButton variant="text" onClick={onOptionClicked("resources")}>
              Resources
            </NavButton>
          </li>
          <li className="item">
            <Dropdown
              title="Support"
              options={[
                "Donate",
                "Join the Coffee Club",
                "Corporate Sponsorships",
                "Community / Race Sponsors",
              ]}
              buttonStyle={{ backgroundColor: "#547c94", color: "#ffffff" }}
              direction="right"
            />
          </li>
        </ul>
      </>
    );
  } else {
    return (
      <>
        <img
          className="hamburger"
          src="https://img.icons8.com/small/32/547c94/menu.png"
          alt="mobile navbar button"
          onClick={toggle}
        />
        <PageContent />
      </>
    );
  }
}

function PageContent() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/accessibleplaygrounds"
          element={<AccessiblePlaygrounds />}
        />

        <Route path="/accomplishments" element={<Accomplishments />} />

        <Route path="/admin" element={<AuthSkipLogin page={<Login />} />} />
        <Route
          path="/admin/contact"
          element={<AuthRoute page={<AdminContact />} />}
        />
        <Route
          path="/admin/dashboard"
          element={<AuthRoute page={<Dashboard />} />}
        />
        <Route
          path="/admin/events"
          element={<AuthRoute page={<AdminEvents />} />}
        />
        <Route path="/admin/faq" element={<AuthRoute page={<AdminFAQ />} />} />
        <Route
          path="/admin/smileblog"
          element={<AuthRoute page={<AdminSmileBlog />} />}
        />

        <Route
          path="/admin/smileblog/:id"
          element={<AuthRoute page={<AdminSmileBlogEditor />} />}
        />

        <Route
          path="/admin/newsletters"
          element={<AuthRoute page={<AdminNewsletters />} />}
        />
        <Route
          path="/admin/newsletters/:id"
          element={<AuthRoute page={<AdminNewslettersEditor />} />}
        />

        <Route
          path="/admin/volunteer"
          element={<AuthRoute page={<AdminVollunteer />} />}
        />

        <Route
          path="/admin/inthenews"
          element={<AuthRoute page={<AdminInTheNews />} />}
        />
        <Route
          path="/admin/inthenews/:id"
          element={<AuthRoute page={<AdminInTheNewsEditor />} />}
        />

        <Route
          path="/admin/equiptmentloanerprogram"
          element={<AuthRoute page={<AdminEquiptmentLoanerProgram />} />}
        />

        <Route
          path="/admin/beachwheelchairlocations"
          element={<AuthRoute page={<AdminBeachWheelchairLocations />} />}
        />

        <Route
          path="/admin/sponsors"
          element={<AuthRoute page={<AdminSponsors />} />}
        />

        <Route
          path="/admin/testimonials"
          element={<AuthRoute page={<AdminTestimonials />} />}
        />

        <Route path="/admin/*" element={<Navigate to="/admin" />} />

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
          path="/communityracesponsors"
          element={<CommunityRaceSponsors />}
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

        <Route
          path="/corporatesponsorships"
          element={<CorporateSponsorships />}
        />

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
        <Route path="/in-the-news" element={<Navigate to="/inthenews" />} />

        <Route path="/jointhecoffeeclub" element={<JoinTheCoffeeClub />} />
        <Route
          path="/initiative/coffee-club"
          element={<Navigate to="/jointhecoffeeclub" />}
        />

        <Route
          path="/beachwheelchairlocations"
          element={<BeachWheelchairLocations />}
        />
        <Route
          path="/initiative/beach-wheelchairs/"
          element={<Navigate to="/localbeachwheelchairlocations" />}
        />

        <Route path="/lottediomede" element={<LotteDiomede />} />

        <Route path="/newsletters" element={<NewsLetters />} />

        <Route path="/ourmission" element={<OurMission />} />
        <Route path="/our-mission" element={<Navigate to="/ourmission" />} />

        <Route path="/resources" element={<Resources />} />

        <Route path="/runningteam" element={<RunningTeam />} />
        <Route
          path="/smile-mass-running-team"
          element={<Navigate to="/runningteam" />}
        />

        <Route path="/smileblog" element={<SmileBlog />} />
        <Route path="/smileblog/:id" element={<SmileBlogPost />} />
        <Route paht="/smile-blog" element={<Navigate to="/smileblog" />} />

        <Route path="/susanbrown" element={<SusanBrown />} />

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
  );
}

export default function Navbar() {
  if (window.innerWidth > 1000) {
    return (
      <>
        <nav className="navbar">
          <Link className="link" to="/">
            <img
              src={logo}
              rel="preload"
              as="image"
              alt="logo"
              className="logo"
            />
          </Link>
          <MobileNavbar />
        </nav>
        <PageContent />
      </>
    );
  } else {
    return (
      <nav className="navbar">
        <Link className="link" to="/">
          <img
            src={logo}
            rel="preload"
            as="image"
            alt="logo"
            className="logo"
          />
        </Link>
        <MobileNavbar />
      </nav>
    );
  }
}
