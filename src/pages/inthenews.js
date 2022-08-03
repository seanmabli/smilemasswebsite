import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NewsItemCardActionArea } from "../components/mui";

export default function InTheNews() {
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

  return (
    <div className="page">
      <h1>In The News</h1>
      <br />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {newsItems.map((newsItem) => {
          return (
            <NewsItemCardActionArea className="newsitem" href={newsItem.url}>
              <img
                src={newsItem.imageurl}
                alt="News Logo"
                className="newslogo"
                style={{ height: "50px" }}
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
      </div>
    </div>
  );
}
