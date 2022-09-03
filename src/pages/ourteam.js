import { useNavigate, Link } from "react-router-dom";
import { ReadMyStoryButton } from "../components/mui";
import { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Footer } from "../components/footer";
import "./ourteam.css";

export default function OurTeam() {
  let navigate = useNavigate();

  const [teamMembers, setTeamMembers] = useState([]);

  onSnapshot(
    query(collection(db, "ourteam"), where("visable", "==", true)),
    (snapshot) => {
      setTeamMembers(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    }
  );

  teamMembers.sort(function (first, second) {
    return first.index - second.index;
  });

  return (
    <div className="page">
      <h1>Our Team</h1>
      <br />
      <p>
        SMILE Mass was created in 2009 by Lotte Diomede and Susan Brown. The two
        women had worked closely together on the{" "}
        <Link to="/accessibleplaygrounds">
          SMILE Sudbury Playground Project
        </Link>
        . Lotte was the Chairperson of SMILE Sudbury and Susan was on the
        fundraising committee. They were so happy with the results of the SMILE
        Sudbury Playgroup Project that they decided to continue to work together
        to continue improving the lives of disabled persons and the people
        around them.
      </p>
      <div style={{ maxWidth: "1250px" }}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {teamMembers.map((teamMember) => {
            return (
              <div id={teamMember.id} className="ourteamcontainer">
                <img
                  src={teamMember.imageurl}
                  alt={teamMember.name}
                  className="ourteamimage"
                />
                <div className="ourteamtext">
                  <h2 style={{ color: "black" }}>{teamMember.name}</h2>
                  <p style={{ color: "black" }}>{teamMember.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
