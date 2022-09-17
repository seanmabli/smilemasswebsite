import { useState, useEffect } from "react";
import { Footer } from "../components/footer";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Divider } from "@mui/material";

import "./events.css";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const data = await getDocs(collection(db, "events"));
      setEvents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getEvents();
  }, []);

  return (
    <div className="page">
      <h1>Events</h1>
      {events.map((event) => {
        return (
          <div>
            <br />
            <Divider />
            <br />
            <div className="eventcontainer">
              <div>
                <img
                  src={event.imageurl}
                  alt={event.title}
                  className="eventthumbnail"
                />
              </div>
              <div>
                <h2 style={{ color: "black" }}>{event.title}</h2>
                <br />
                <p style={{ color: "black" }}>
                  {event.date
                    .toDate()
                    .toDateString()
                    .split(" ")
                    .slice(1)
                    .join(" ")}
                  &nbsp;&nbsp;
                </p>
                <br />
                <div
                  style={{ color: "black" }}
                  dangerouslySetInnerHTML={{ __html: event.description }}
                />
              </div>
            </div>
          </div>
        );
      })}
      <Footer />
    </div>
  );
}
