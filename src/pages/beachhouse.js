import image01 from "../images/beachhouse/544ShoreRdU3-01-w-600x400.webp";
import image02 from "../images/beachhouse/544ShoreRdU3-02-w.webp";
import image03 from "../images/beachhouse/544ShoreRdU3-03-w.webp";
import image04 from "../images/beachhouse/544ShoreRdU3-04-w.webp";
import image05 from "../images/beachhouse/544ShoreRdU3-05-w.webp";
import image06 from "../images/beachhouse/544ShoreRdU3-06-w.webp";
import image07 from "../images/beachhouse/544ShoreRdU3-07-w.webp";
import image08 from "../images/beachhouse/544ShoreRdU3-08-w.webp";
import image10 from "../images/beachhouse/544ShoreRdU3-10-w.webp";
import image11 from "../images/beachhouse/544ShoreRdU3-11-w.webp";
import image13 from "../images/beachhouse/544ShoreRdU3-13-w.webp";
import image14 from "../images/beachhouse/544ShoreRdU3-14-w.webp";
import image16 from "../images/beachhouse/544ShoreRdU3-16-w.webp";
import image17 from "../images/beachhouse/544ShoreRdU3-17-w.webp";
import image18 from "../images/beachhouse/544ShoreRdU3-18-w.webp";
import image19 from "../images/beachhouse/544ShoreRdU3-19-w.webp";
import image20 from "../images/beachhouse/544ShoreRdU3-20-w.webp";
import image21 from "../images/beachhouse/544ShoreRdU3-21-w.webp";
import image22 from "../images/beachhouse/544ShoreRdU3-22-w.webp";
import image23 from "../images/beachhouse/544ShoreRdU3-23-w.webp";
import image24 from "../images/beachhouse/544ShoreRdU3-24-w.webp";
import image25 from "../images/beachhouse/544ShoreRdU3-25-w.webp";
import image26 from "../images/beachhouse/544ShoreRdU3-26-w.webp";
import image27 from "../images/beachhouse/544ShoreRdU3-27-w.webp";
import image28 from "../images/beachhouse/544ShoreRdU3-28-w.webp";
import image29 from "../images/beachhouse/544ShoreRdU3-29-w.webp";

import "./beachhouse.css";

import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  { imgPath: image20 },
  { imgPath: image21 },
  { imgPath: image22 },
  { imgPath: image23 },
  { imgPath: image24 },
  { imgPath: image25 },
  { imgPath: image26 },
  { imgPath: image27 },
  { imgPath: image28 },
  { imgPath: image29 },
  { imgPath: image01 },
  { imgPath: image02 },
  { imgPath: image03 },
  { imgPath: image04 },
  { imgPath: image05 },
  { imgPath: image06 },
  { imgPath: image07 },
  { imgPath: image08 },
  { imgPath: image10 },
  { imgPath: image11 },
  { imgPath: image13 },
  { imgPath: image14 },
  { imgPath: image16 },
  { imgPath: image17 },
  { imgPath: image18 },
  { imgPath: image19 },
];

export default function BeachHouse() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  if (window.innerWidth < 600) {
    return (
      <div className="page">
        <h1>Beach House</h1>
        <div className="container">
          <Box sx={{ flexGrow: 1 }} className="image">
            <AutoPlaySwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {images.map((step, index) => (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Box
                      component="img"
                      sx={{
                        display: "block",
                        overflow: "hidden",
                        width: "90%",
                        margin: "20px",
                      }}
                      src={step.imgPath}
                      alt={step.label}
                    />
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
              steps={maxSteps}
              position="static"
              variant="text"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                  sx={{ color: "#547c94" }}
                >
                  Next
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  sx={{ color: "#547c94" }}
                >
                  <KeyboardArrowLeft />
                  Back
                </Button>
              }
            />
          </Box>
          <div className="info">
            <br />
            <p>
              The SMILE Mass Beach House is a fully handicapped accessible space,
              that is aesthetically pleasing and offers families equal
              opportunity, with minimum barriers. Everyone deserves to relax, have
              fun with friends and family, play outside and soak up the sun
              despite having a disability. That is what our home offers!
            </p>
            <br />
            <p>Location: Truro, MA on the beach</p>
            <br />
            <p>
              Want to spend an unforgettable week down the Cape with your family
              at a state-of-the-art accessible house? Contact us here for more
              information.
            </p>
            <br />
            <Button
              variant="outlined"
              href="https://www.vrbo.com/4982108ha/"
              target="_blank"
              style={{ color: "#547c94", borderColor: "#547c94" }}
            >
             Check Availablity
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="page">
        <h1>Beach House</h1>
        <div className="container">
          <div className="info">
            <br />
            <p>
              The SMILE Mass Beach House is a fully handicapped accessible space,
              that is aesthetically pleasing and offers families equal
              opportunity, with minimum barriers. Everyone deserves to relax, have
              fun with friends and family, play outside and soak up the sun
              despite having a disability. That is what our home offers!
            </p>
            <br />
            <p>Location: Truro, MA on the beach</p>
            <br />
            <p>
              Want to spend an unforgettable week down the Cape with your family
              at a state-of-the-art accessible house? Contact us here for more
              information.
            </p>
            <br />
            <Button
              variant="outlined"
              href="https://www.vrbo.com/4982108ha/"
              target="_blank"
              style={{ color: "#547c94", borderColor: "#547c94" }}
            >
             Check Availablity
            </Button>
          </div>
          <Box sx={{ flexGrow: 1 }} className="image">
            <AutoPlaySwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {images.map((step, index) => (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Box
                      component="img"
                      sx={{
                        display: "block",
                        overflow: "hidden",
                        width: "90%",
                        margin: "20px",
                      }}
                      src={step.imgPath}
                      alt={step.label}
                    />
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
              steps={maxSteps}
              position="static"
              variant="text"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                  sx={{ color: "#547c94" }}
                >
                  Next
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  sx={{ color: "#547c94" }}
                >
                  <KeyboardArrowLeft />
                  Back
                </Button>
              }
            />
          </Box>
        </div>
      </div>
    );
  }
}
