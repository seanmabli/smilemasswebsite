import { useNavigate, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

import "./ourteam.css";
import { Divider, Button } from "@mui/material";

export function OurTeam() {
  let navigate = useNavigate();

  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const getTeamMembers = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "ourteam"), where("visable", "==", true))
      );
      setTeamMembers(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
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
      {teamMembers.map((teamMember) => {
        return (
          <div style={{ display: "flex" }}>
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
            <div style={{ width: window.innerWidth - 350, margin: "10px" }}>
              <h2>{teamMember.name.split(" ")[0]}'s Story</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    teamMember.readmystory.split(" ").slice(0, 50).join(" ") +
                    "...",
                }}
              />
              <br />
              <Button
                size="small"
                variant="outlined"
                style={{ color: "#547c94", borderColor: "#547c94" }}
                onClick={() => {
                  navigate(teamMember.name.replace(/\s/g, "").toLowerCase());
                  window.scrollTo(0, 0);
                }}
              >
                Read More
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function OurTeamProfile() {
  const { id } = useParams();
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const getTeamMembers = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "ourteam"), where("visable", "==", true))
      );
      setTeamMembers(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setTeamMembers((teamMembers) =>
        teamMembers.filter(
          (teamMember) =>
            teamMember.name.replace(/\s/g, "").toLowerCase() === id
        )
      );
    };
    getTeamMembers();
  }, []);

  console.log(teamMembers, id);

  return (
    <div className="page">
      {teamMembers.map((teamMember) => {
        return (
          <div>
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
            <h2>{teamMember.name.split(" ")[0]}'s Story</h2>
            <br />
            <div
              dangerouslySetInnerHTML={{
                __html: teamMember.readmystory,
              }}
            />
            <br />
          </div>
        );
      })}
    </div>
  );
}
