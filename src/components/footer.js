import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Divider } from "@mui/material";

import footerlogo from "../images/footerlogo.webp";
import "./footer.css";

export function Footer() {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const getResponses = async () => {
      const data = await getDocs(collection(db, "sponsors"));
      setResponses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getResponses();
  }, []);

  responses.sort(function (first, second) {
    return first.name.localeCompare(second.name);
  });

  return (
    <>
      <br />
      <Divider />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h2>Our Sponsors</h2>
      </div>
      <br />
      <div className="sponsorscontainer">
        {responses.map((response) => {
          return (
            <div className="sponsor">
              <a href={response.url}>
                <img
                  src={response.imageurl}
                  alt={response.name}
                  className="sponsorimage"
                />
              </a>
            </div>
          );
        })}
      </div>
      <br />
      <Divider />
      <br />
      <div className="footeradditionalcontainer">
        <img src={footerlogo} rel="preload" alt="footerlogo" className="footerlogo" />
        <div className="footercontact">
          <h2>Contact Us</h2>
          <p>617-967-7755</p>
          <p>info@smilemass.org</p>
        </div>
        <div className="footersocial">
          <h2>Connect with us</h2>
          <div style={{ display: "flex" }}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.facebook.com/SMILEMass"
            >
              <img
                src="https://img.icons8.com/color/45/facebook--v1..webp"
                alt="facebook"
              />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.instagram.com/smilemassorg/"
            >
              <img
                src="https://img.icons8.com/color/45/instagram-new--v1..webp"
                alt="instagram"
              />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/smilemassorg"
            >
              <img
                src="https://img.icons8.com/color/45/twitter--v1..webp"
                alt="twitter"
              />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/company/smile-mass/"
            >
              <img
                src="https://img.icons8.com/color/45/linkedin--v1..webp"
                alt="linkedin"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
