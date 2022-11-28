import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Divider, MobileStepper, Button } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material/";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Footer } from "../components/footer";
import "./testimonials.css";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(collection(db, "testimonials"));
      setTestimonials(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  testimonials.sort(function (first, second) {
    return first.index - second.index;
  });

  function ImageAndTestimonial(props) {
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = props.imageurls.length;

    if (props.imageurls.length > 1) {
      return (
        <div className="multiImage">
          <div style={{ width: "100%", margin: "0px" }}>
            <AutoPlaySwipeableViews
              index={activeStep}
              onChangeIndex={(index) => setActiveStep(index)}
              style={{ display: "flex", alignItems: "center" }}
              enableMouseEvents
            >
              {props.imageurls.map((step, index) => (
                <>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <img
                      style={{
                        width: "100%",
                      }}
                      src={step}
                      alt="testimonials"
                    />
                  ) : null}
                </>
              ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
              steps={maxSteps}
              position="static"
              variant="text"
              activeStep={activeStep}
              sx={{
                width: "100%",
                padding: "8px 0 0 0",
              }}
              nextButton={
                <Button
                  size="small"
                  onClick={() =>
                    setActiveStep((prevActiveStep) => prevActiveStep + 1)
                  }
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
                  onClick={() =>
                    setActiveStep((prevActiveStep) => prevActiveStep - 1)
                  }
                  disabled={activeStep === 0}
                  sx={{ color: "#547c94" }}
                >
                  <KeyboardArrowLeft />
                  Back
                </Button>
              }
            />
          </div>
          <p style={{ whiteSpace: "pre-wrap" }}>{props.content}</p>
        </div>
      );
    } else if (props.imageurls.length === 1) {
      return (
        <div className="singleImage">
          <img
            src={props.imageurls[0]}
            alt="testimonial"
            style={{ width: "100%" }}
          />
          <p style={{ whiteSpace: "pre-wrap" }}>{props.content}</p>
        </div>
      );
    } else {
      return <p style={{ whiteSpace: "pre-wrap" }}>{props.content}</p>;
    }
  }

  return (
    <div className="page">
      <h1>Testimonials</h1>
      {testimonials.map((testimonial) => {
        return (
          <>
            <br />
            <Divider />
            <br />
            <ImageAndTestimonial
              imageurls={testimonial.imageurls}
              content={testimonial.content}
            />
          </>
        );
      })}
      
    </div>
  );
}
