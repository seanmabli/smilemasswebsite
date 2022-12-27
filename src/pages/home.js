import beachhouse from "../images/homesplash/beachhouse.webp";
import communityinacommunity from "../images/homesplash/communityinacommunity.webp";
import equiptment from "../images/homesplash/equiptment.webp";
import jones from "../images/homesplash/jones.webp";
import music from "../images/homesplash/music.webp";
import pool from "../images/homesplash/pool.webp";
import races from "../images/homesplash/races.webp";
import wheelchair from "../images/homesplash/wheelchair.webp";

import "./home.css";

import { useState, useEffect } from "react";
import { Card, styled, Button, Divider } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { NewsItemCardActionArea } from "../components/mui";
import { useNavigate } from "react-router";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import "./events.css";

export const HomeCard = styled(Card)({
  boxShadow: "none",
  maxWidth: "410px",
  padding: "10px",
  margin: "10px",
  ["@media (max-width:600px)"]: {
    width: "100%",
  },
});

export default function Home() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const getEvents = async () => {
      const data = await getDocs(collection(db, "events"));
      setEvents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getEvents();
  }, []);

  const [newsItems, setNewsItems] = useState([]);
  useEffect(() => {
    const getNewsItems = async () => {
      const data = await getDocs(collection(db, "inthenews"));
      setNewsItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getNewsItems();
  }, []);

  newsItems.sort(function (first, second) {
    return second.published["seconds"] - first.published["seconds"];
  });

  let navigate = useNavigate();

  return (
    <div className="page">
      <ImageList variant="quilted" cols={4} rowHeight={250}>
        {itemData.map((item) => {
          if (item.isText === true) {
            return (
              <ImageListItem
                key="text"
                cols={2}
                rows={1}
                className="missiontextcontainer"
              >
                <p className="missiontext">
                  Dedicated to helping families raising children or adults with
                  disabilities enjoy happy, healthy memories through vacation
                  and recreation experiences
                </p>
              </ImageListItem>
            );
          } else {
            return (
              <ImageListItem
                key={item.img}
                cols={item.cols || 1}
                rows={item.rows || 1}
              >
                <img
                  {...srcset(item.img, 121, item.rows, item.cols)}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            );
          }
        })}
      </ImageList>
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
        <Divider orientation="vertical" flexItem />
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
        <Divider orientation="vertical" flexItem />
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
      <br />
      <h1>Upcoming Events</h1>
      <br />
      {events.map((event) => {
        return (
          <div>
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
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => navigate("/events")}
                  style={{ color: "#547c94", borderColor: "#547c94" }}
                >
                  More Details
                </Button>
              </div>
            </div>
          </div>
        );
      })}
      <br />
      <h1>In The News</h1>
      <br />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {newsItems
          .slice(0, Math.floor((window.innerWidth - 20) / 310) * 2 - 1)
          .map((newsItem) => {
            return (
              <NewsItemCardActionArea className="newsitem" href={newsItem.url}>
                <img
                  src={newsItem.imageurl}
                  alt="News Logo"
                  className="newslogo"
                  style={{ maxHeight: "50px", maxWidth: "268px" }}
                />
                <br />
                <p>
                  {newsItem.published
                    .toDate()
                    .toDateString()
                    .split(" ")
                    .slice(1)
                    .join(" ")}
                </p>
                <p>{newsItem.title}</p>
              </NewsItemCardActionArea>
            );
          })}
        <NewsItemCardActionArea
          className="newsitem"
          onClick={() => navigate("inthenews")}
          style={{ borderWidth: "0" }}
        >
          <h2 style={{ color: "black" }}>View More</h2>
        </NewsItemCardActionArea>
      </div>
    </div>
  );
}

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const itemData = [
  { img: wheelchair, cols: 2, isText: false },
  { img: jones, isText: false },
  { img: equiptment, isText: false },
  { img: pool, isText: false },
  {
    isText: true,
    cols: 2,
  },
  { img: races, isText: false },
  {
    img: beachhouse,
    title: "Accessible Beach House",
    isText: false,
    cols: 2,
  },
  { img: music },
  { img: communityinacommunity, isText: false },
];