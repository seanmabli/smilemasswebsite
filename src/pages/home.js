import beachhouse from "../images/homesplash/beachhouse.webp";
import communityinacommunity from "../images/homesplash/communityinacommunity.webp";
import equiptment from "../images/homesplash/equiptment.webp";
import jones from "../images/homesplash/jones.webp";
import music from "../images/homesplash/music.webp";
import pool from "../images/homesplash/pool.webp";
import races from "../images/homesplash/races.webp";
import races2 from "../images/homesplash/races2.webp";
import wheelchair from "../images/homesplash/wheelchair.webp";

import "./home.css";

import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Card, styled } from "@mui/material";

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

export const HomeCard = styled(Card)({
  border: "1px solid rgba(0, 0, 0, 0.23)",
  borderRadius: "5px",
  boxShadow: "none",
  maxWidth: "410px",
  padding: "10px",
  margin: "10px",
  ["@media (max-width:600px)"]: {
    width: "100%",
  },
});

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
      <div style={{ display: "flex" }}>
        <HomeCard style={{ marginLeft: "0px" }}>
          <h1 style={{ color: "#04a3d3" }}>Mission</h1>
          <p
            style={{
              textAlign: "justify",
              textJustify: "inter-word",
            }}
          >
            Small Miracles in Life Exist (SMILE Mass) is a 501 C3 non-profit
            organization dedicated to helping families raising children or
            adults with disabilities enjoy happy, healthy memories through
            vacation and recreation experiences.
          </p>
        </HomeCard>
        <HomeCard>
          <h1 style={{ color: "#7bc354" }}>Vision</h1>
          <p
            style={{
              textAlign: "justify",
              textJustify: "inter-word",
            }}
          >
            The future of SMILE Mass is about creating an inclusive community
            based in Metrowest with a state-of-the-art recreational facility
            dedicated to those with disabilities with access to outdoor
            recreation space and indoor meeting and enrichment programs.
          </p>
        </HomeCard>
        <HomeCard style={{ marginRight: "0px" }}>
          <h1 style={{ color: "#04848b" }}>Promise</h1>
          <p
            style={{
              textAlign: "justify",
              textJustify: "inter-word",
            }}
          >
            Movement matters to all of us. For people with medical, physical and
            intellectual disabilities movement can often be challenging, yet the
            benefit is the same. A moving body is a healthy body and we need to
            move to stimulate the frontal lobe so we can stimulate
            communication, happiness, personality, behavior just to name a few
            of the benefits of a moving body. Welcome to Club SMILE Mass.
          </p>
        </HomeCard>
      </div>
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
