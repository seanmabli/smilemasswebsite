import lottediomede from "../images/lottediomede.jpg";
import susanbrown from "../images/susanbrown.jpg";
import { useNavigate } from "react-router-dom";
import { ReadMyStoryButton } from "../components/mui";
import "./ourteam.css";

export default function OurTeam() {
  let navigate = useNavigate();

  const onOptionClicked = (value) => () => {
    navigate(value);
  };

  return (
    <div className="page">
      <h1>Our Team</h1>
      <br />
      <p>
        SMILE Mass was created in 2009 by Lotte Diomede and Susan Brown. The two
        women had worked closely together on the SMILE Sudbury Playground
        Project. Lotte was the Chairperson of SMILE Sudbury and Susan was on the
        fundraising committee. They were so happy with the results of the SMILE
        Sudbury Playgroup Project that they decided to continue to work together
        to continue improving the lives of disabled persons and the people
        around them.
      </p>
      <div style={{ maxWidth: "1250px" }}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div className="card">
            <img
              src={lottediomede}
              alt="Lotte Diomede"
              style={{ width: "100%" }}
            />
            <div className="container">
              <h2>Lotte Diomede</h2>
              <p>Co-Founder & President</p>
              <br />
              <p>
                I feel like raising Nicholas has made me a better person. I look
                at the world in a differnt way. Today, I feel I have a moral
                obligation to not only make the world better for my son but to
                also make the world accessible for all mankind despite their
                abilities.
              </p>
              <br />
              <p>617-967-7755</p>
              <p>lotte@smilemass.org</p>
              <br />
              <ReadMyStoryButton onClick={onOptionClicked("/lottediomede")}>
                Read My Story
              </ReadMyStoryButton>
            </div>
          </div>
          <div className="card">
            <img src={susanbrown} alt="Susan Brown" style={{ width: "100%" }} />
            <div class="container">
              <h2 className="bold">Susan Brown</h2>
              <p>Co-Founder & Vice President</p>
              <br />
              <p>
                Being a mom of a child with special needs has motivated me to
                work towards acceptance and accessibility for all. Everyone
                deserves the opportunity to go to the beach, go for a bike ride,
                and do everything that the average family takes for granted. We
                have an obligation to leave the world a little bit better than
                how we found it.
              </p>
              <br />
              <p>978-460-7410</p>
              <p>susan@smilemass.org</p>
              <br />
              <ReadMyStoryButton onClick={onOptionClicked("/susanbrown")}>
                Read My Story
              </ReadMyStoryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
