import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Divider } from "@mui/material";

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import "./footer.css";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

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

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }

  function Testing() {
    const { height, width } = useWindowDimensions();

     return (
        <>
          {responses.map((response, index) => (
            <div style={{ display: "flex", justifyContent: "center" }}>
              {Math.abs(activeStep - index) <= 2 ? (
                <div className="sponsor">
                  <a href={response.url}>
                    <img
                      src={response.imageurl}
                      alt={response.name}
                      className="sponsorimage"
                    />
                  </a>
                </div>
              ) : null}
            </div>
          ))}
        </>
      );
  }

  return (
    <>
      <br />
      <Divider />
      <br />
      <p>Special Thanks To Our Sponsors:</p>
      <br />
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        <Testing />
      </AutoPlaySwipeableViews>
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
      <div>
        <div>
          <h2>Contact Us</h2>
          <p>617-967-7755</p>
          <p>info@smilemass.org</p>
        </div>
        <div>
          <h2>Connect with us</h2>
          <a href="https://www.facebook.com/SmileMass">Facebook</a>
          <br />
          <a href="https://www.instagram.com/smilemassorg/">Instagram</a>
          <br />
          <a href="https://twitter.com/smilemassorg">Twitter</a>
          <br />
          <a href="https://www.linkedin.com/company/smile-mass/">LinkedIn</a>
        </div>
      </div>
    </>
  );
}
