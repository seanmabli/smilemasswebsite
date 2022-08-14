import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Divider } from "@mui/material";

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
      <p>Special Thanks To Our Sponsors:</p>
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
    </>
  );
}
