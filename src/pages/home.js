import beachhouse from "../images/homesplash/beachhouse.webp";
import communityinacommunity from "../images/homesplash/communityinacommunity.webp";
import equiptment from "../images/homesplash/equiptment.webp";
import jones from "../images/homesplash/jones.webp";
import music from "../images/homesplash/music.webp";
import pool from "../images/homesplash/pool.webp";
import races from "../images/homesplash/races.webp";
import races2 from "../images/homesplash/races2.webp";
import wheelchair from "../images/homesplash/wheelchair.webp";
import { Footer } from "../components/footer";
import "./home.css";

import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  { imgPath: beachhouse },
  { imgPath: communityinacommunity },
  { imgPath: equiptment },
  { imgPath: jones },
  { imgPath: music },
  { imgPath: pool },
  { imgPath: races },
  { imgPath: races2 },
  { imgPath: wheelchair },
];

export default function Home() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="page">
      <p className="missiontext">
        Dedicated to helping families raising children or adults with
        disabilities enjoy happy, healthy memories through vacation and
        recreation experiences.
      </p>
      <br />
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={(step) => setActiveStep(step)}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {Math.abs(activeStep - index) <= 2 ? (
              <div className="missioncontainer">
                <img
                  src={step.imgPath}
                  alt={step.label}
                  className="missionimage"
                />
                <p className="missiontext"></p>
              </div>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <br />

      <p>We are a 501 C3 non-profit organization.</p>
      <h2>Our Mission</h2>
      <br />
      <p>
        <span className="bold">Mission:</span> Small Miracles in Life Exist
        (SMILE Mass) is a 501 C3 non-profit organization dedicated to helping
        families raising children or adults with disabilities enjoy happy,
        healthy memories through vacation and recreation experiences. ​
      </p>
      <br />
      <p>
        <span className="bold">Vision:</span> The future of SMILE Mass is about
        creating an inclusive community based in Metrowest with a
        state-of-the-art recreational facility dedicated to those with
        disabilities with access to outdoor recreation space and indoor meeting
        and enrichment programs.
      </p>
      <br />
      <p>
        <span className="bold">Promise:</span> Movement matters to all of us.
        For people with medical, physical and intellectual disabilities movement
        can often be challenging, yet the benefit is the same. A moving body is
        a healthy body and we need to move to stimulate the frontal lobe so we
        can stimulate communication, happiness, personality, behavior just to
        name a few of the benefits of a moving body. Welcome to Club SMILE Mass.
      </p>

      <Footer />
    </div>
  );
}

/*

      <p>
        SMILE Mass strives to become the leading resource for handicap
        accessibility in vacation and recreation experiences. Please help us see
        our vision through. Read letters from some of our supporters right here.
      </p>

      */
