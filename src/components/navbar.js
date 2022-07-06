import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
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
          className="hamburger"
          src="https://img.icons8.com/small/32/547c94/delete-sign.png"
          alt="mobile navbar button"
          onClick={toggle}
        />
        <ul className="navbarcontent">
          <li className="item" style={{ color: "#547c94" }}>
            <Dropdown
              title="About"
              options={[
                "Our Mission",
                "Our Team",
                "Testimonials",
                "Accomplishments",
                "Sudbury Accesible Playgrounds",
                "FAQ",
                "Contact",
              ]}
              dropdownStyle={{ color: "#547c94" }}
            />
          </li>
          <li className="item" style={{ color: "#547c94" }}>
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
          <li className="item" style={{ color: "#547c94" }}>
            <Dropdown
              title="Get Involved"
              options={["Running Team", "Volunteer"]}
              dropdownStyle={{ color: "#547c94" }}
            />
          </li>
          <li className="item" style={{ color: "#547c94" }}>
            <Dropdown
              title="News & Events"
              options={["Events", "In The News", "Newsletters", "SMILE Blog"]}
              dropdownStyle={{ color: "#547c94" }}
            />
          </li>
          <li className="item" style={{ color: "#547c94" }}>
            <Link
              className="button link"
              to={"resources"}
              style={{ color: "#547c94" }}
            >
              Resources
            </Link>
          </li>
          <li className="item">
            <Dropdown
              title="Support"
              options={["Join the Coffee Club", "Donate"]}
              dropdownStyle={{ color: "#547c94" }}
              buttonStyle={{ backgroundColor: "#547c94", color: "#ffffff" }}
            />
          </li>
        </ul>
      </>
    );
  } else {
    return (
      <img
        className="hamburger"
        src="https://img.icons8.com/small/32/547c94/menu.png"
        alt="mobile navbar button"
        onClick={toggle}
      />
    );
  }
}

export default function Navbar() {
  return (
    <div style={{}}>
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
        <MobileNavbarOpened />
      </nav>
    </div>
  );
}
