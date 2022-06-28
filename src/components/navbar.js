import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../logo/logo.png";
import Dropdown from "./dropdown";
import "../index.css";
import "./navbar.css";

function MobileNavbarOpened() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen && window.innerWidth > 1000) {
    setIsOpen(true);
  }

  const toggle = () => setIsOpen(!isOpen);

  if (isOpen) {
    return (
      <>
        <img
          className="mobilehamburger"
          src="https://img.icons8.com/small/32/547c94/delete-sign.png"
          alt="mobile navbar button"
          onClick={toggle}
        />
        <ul className="navbaritems">
          <li className="navlist notdropdown" style={{ color: "#547c94" }}>
            <Dropdown
              title="About"
              options={[
                "Our Mission",
                "The Staff",
                "Testimonials",
                "Accomplishments",
                "Sudbury Accesible Playgrounds",
                "F. A. Q.",
                "Contact",
              ]}
              dropdownStyle={{ color: "#547c94" }}
            />
          </li>
          <li className="navlist notdropdown" style={{ color: "#547c94" }}>
            <Dropdown
              title="Our Programs"
              options={[
                "Club SMILE Mass",
                "Local Beach Wheelchair Locations",
                "Beach House",
                "Community within a Community",
                "Equipment Loaner Program",
              ]}
              dropdownStyle={{ color: "#547c94" }}
            />
          </li>
          <li className="navlist notdropdown" style={{ color: "#547c94" }}>
            <Dropdown
              title="Get Involved"
              options={["Running Team", "Volunteer"]}
              dropdownStyle={{ color: "#547c94" }}
            />
          </li>
          <li className="navlist notdropdown" style={{ color: "#547c94" }}>
            <Dropdown
              title="News & Events"
              options={["Events", "In The News", "Newsletters", "SMILE Blog"]}
              dropdownStyle={{ color: "#547c94" }}
            />
          </li>
          <li className="navlist notdropdown" style={{ color: "#547c94" }}>
            <Link
              className="navbarlink"
              to={"resources"}
              style={{ color: "#547c94" }}
            >
              Resources
            </Link>
          </li>
          <li
            className="navlist notdropdown"
            style={{ backgroundColor: "#547c94", color: "#ffffff" }}
          >
            <Dropdown
              title="Support"
              options={["Join the Coffee Club", "Donate"]}
              dropdownStyle={{ color: "#547c94" }}
            />
          </li>
        </ul>
      </>
    );
  } else {
    return (
      <img
        className="mobilehamburger"
        src="https://img.icons8.com/small/32/547c94/menu.png"
        alt="mobile navbar button"
        onClick={toggle}
      />
    );
  }
}

export default function Navbar() {
  return (
    <>
      <nav className="navbar">
        <Link className="navbarlink" to="/">
          <img src={logo} alt="logo" className="navbarlogo" />
        </Link>
        <MobileNavbarOpened />
      </nav>
    </>
  );
}
