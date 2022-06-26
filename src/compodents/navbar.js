import { Link } from "react-router-dom";
import logo from "../logo/logo.png";
import Dropdown from "./dropdown";
import "../index.css";
import "./navbar.css";

export default function Navbar() {
  return (
    <>
      <nav className="desktopnavbar">
        <Link className="navbarlink" to="/">
          <img src={logo} alt="logo" className="navbarlogo" />
        </Link>
        <ul className="navbaritems">
          <li className="navlist notdropdown">
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
            />
          </li>
          <li className="navlist notdropdown">
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
          <li className="navlist notdropdown">
            <Dropdown
              title="Get Involved"
              options={["Running Team", "Volunteer"]}
            />
          </li>
          <li className="navlist notdropdown">
            <Dropdown
              title="News & Events"
              options={["Events", "In The News", "Newsletters", "SMILE Blog"]}
            />
          </li>
          <li className="navlist notdropdown">
            <Link className="navbarlink" to={"resources"}>
              Resources
            </Link>
          </li>
          <li className="navlist notdropdown">
            <Dropdown
              title="Support"
              options={["Join the Coffee Club", "Donate"]}
              bold={true}
            />
          </li>
          <li className="notdropdown">
            <a href="https://www.instagram.com/smilemassorg/">
              <img
                src="https://img.icons8.com/small/32/547c94/instagram-new.png"
                className="sociallink"
              />
            </a>
          </li>
          <li className="notdropdown">
            <a href="https://twitter.com/smilemassorg">
              <img
                src="https://img.icons8.com/small/32/547c94/twitter.png"
                className="sociallink"
              />
            </a>
          </li>
          <li className="notdropdown">
            <a href="https://www.facebook.com/SmileMass">
              <img
                src="https://img.icons8.com/small/32/547c94/facebook-new.png"
                className="sociallink"
              />
            </a>
          </li>
          <li className="notdropdown">
            <a href="https://www.youtube.com/channel/UCUkqQwyr2Fg0aytVZ9q6zqA">
              <img
                src="https://img.icons8.com/small/32/547c94/youtube-play.png"
                className="sociallink"
              />
            </a>
          </li>
        </ul>
      </nav>
      <nav className="mobilenavbar">
        <Link className="navbarlink" to="/">
          <img src={logo} alt="logo" className="navbarlogo" />
        </Link>
        <img
          className="mobilehamburger"
          src="https://img.icons8.com/small/128/547c94/menu.png"
          alt="mobile navbar button"
        />
        {/*}
        <ul className="navbaritems">
          <li className="notdropdown">
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
            />
          </li>
          <li className="notdropdown">
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
          <li className="notdropdown">
            <Dropdown
              title="Get Involved"
              options={["Running Team", "Volunteer"]}
            />
          </li>
          <li className="notdropdown">
            <Dropdown
              title="News & Events"
              options={["Events", "In The News", "Newsletters", "SMILE Blog"]}
            />
          </li>
          <li className="notdropdown">
            <Link className="navbarlink" to={"resources"}>
              Resources
            </Link>
          </li>
          <li className="notdropdown">
            <Dropdown
              title="Support"
              options={["Join the Coffee Club", "Donate"]}
              bold={true}
            />
          </li>
        </ul>
          */}
      </nav>
    </>
  );
}
