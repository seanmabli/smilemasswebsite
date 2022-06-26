import { Link } from "react-router-dom";
import logo from "../logo/logo.png";
import Dropdown from "./dropdown";
import "../index.css";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link className="titleandimage navbarlink" to="/">
        <img src={logo} alt="logo" className="navbarlogo" />
      </Link>
      <img
        className="mobilenavbaritems"
        src="https://img.icons8.com/small/128/000000/menu.png"
        alt="mobile navbar button"
      />
      <ul className="navbaritems">
        <li className="notdropdown">
          <Dropdown
            title="About Us"
            options={[
              "Our Programs",
              "Join Greenwood",
              "Waiting List",
              "Our Staff",
              "Employment",
              "Hours & Directions",
            ]}
          />
        </li>
        <li className="notdropdown">
          <Dropdown title="News" options={["Club Photos", "Club Calendar"]} />
        </li>
        <li className="notdropdown">
          <Dropdown
            title="Members"
            options={[
              "Member Directory",
              "Fitness Program",
              "Membership Meeting Information",
              "Work Assessment",
              "House Rules",
              "Bylaws",
            ]}
          />
        </li>
        <li className="notdropdown">
          <Dropdown title="Swim" options={["Swim Lessons", "Swim Team"]} />
        </li>
        <li className="notdropdown">
          <Dropdown
            title="Tennis"
            options={[
              "Tennis Lessons",
              "Tennis Team",
              "Tennis Calendar",
              "Tennis News",
            ]}
          />
        </li>
        <li className="notdropdown">
          <Dropdown
            title="Social"
            options={[
              "Social Program",
              "Social Calendar",
              "Babysitter & Pet Sitter",
            ]}
          />
        </li>
        <li className="notdropdown">
          <Link className="navbarlink" to={"contactus"}>
            Contact us
          </Link>
        </li>
        <li className="notdropdown">
          <Link className="navbarlink" to={"account"}>
            Account
          </Link>
        </li>
      </ul>
    </nav>
  );
}
