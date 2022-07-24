import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../images/logo.png";
import Dropdown from "./dropdown";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import "../index.css";
import "./navbar.css";

const NavButton = styled(Button)({
  color: "#547c94",
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  lineHeight: 1.5,
  backgroundColor: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
});

function MobileNavbarOpened() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen && window.innerWidth > 1000) {
    setIsOpen(true);
  }

  const toggle = () => setIsOpen(!isOpen);
  
  let navigate = useNavigate();

  const onOptionClicked = (value) => () => {
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
                "Sudbury Accesible Playgrounds",
                "FAQ",
                "Contact",
              ]}
            />
          </li>
          <li className="item">
            <Dropdown
              title="Our Programs"
              options={[
                "Club SMILE Mass",
                "Local Beach Wheelchair Locations",
                "Beach House",
                "Community within a Community",
                "Equipment Loaner Program",
              ]}
            />
          </li>
          <li className="item">
            <Dropdown
              title="Get Involved"
              options={["Running Team", "Volunteer"]}
              dropdownStyle={{ color: "#547c94" }}
            />
          </li>
          <li className="item">
            <Dropdown
              title="News & Events"
              options={["Events", "In The News", "Newsletters", "SMILE Blog"]}
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
              options={["Join the Coffee Club", "Donate"]}
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
    <nav className="navbar">
      <Link className="link" to="/">
        <img src={logo} rel="preload" as="image" alt="logo" className="logo" />
      </Link>
      <MobileNavbarOpened />
    </nav>
  );
}
