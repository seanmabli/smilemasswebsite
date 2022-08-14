import { useNavigate } from "react-router-dom";
import { ReadMyStoryButton, OurTeamCard } from "../components/mui";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Footer } from "../components/footer";

export default function OurTeam() {
  let navigate = useNavigate();

  const [teamMembers, setTeamMembers] = useState([]);
  useEffect(() => {
    const getTeamMembers = async () => {
      const data = await getDocs(collection(db, "ourteam"));
      setTeamMembers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTeamMembers();
  }, []);

  teamMembers.sort(function (first, second) {
    return first.index - second.index;
  });

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
          {teamMembers.map((teamMember) => {
            return (
              <OurTeamCard>
                <img
                  src={teamMember.imageurl}
                  alt="Lotte Diomede"
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
                <div className="container">
                  <h2 style={{color: "black"}}>{teamMember.name}</h2>
                  <p style={{color: "black"}}>{teamMember.role}</p>
                  <br />
                  <p style={{color: "black"}}>{teamMember.phone}</p>
                  <p style={{color: "black"}}>{teamMember.email}</p>
                  <br />
                  <div
                    style={
                      teamMember.readmystory
                        ? { display: "flex" }
                        : { display: "none" }
                    }
                  >
                    <ReadMyStoryButton
                      onClick={() => navigate("/" + teamMember.name.replace(/\s/g, "").toLowerCase())}
                    >
                      Read My Story
                    </ReadMyStoryButton>
                  </div>
                </div>
              </OurTeamCard>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
