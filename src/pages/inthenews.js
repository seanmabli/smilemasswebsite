import "./inthenews.css";
import { NewsButton } from "../components/mui";
import { useState, useEffect } from "react";
import { db, storage } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

export default function InTheNews() {
  const [newsItems, setNewsItems] = useState([]);
  const [newsItemImages, setNewsItemImages] = useState([]);

  const storageRef = ref(storage, "inthenews");

  useEffect(() => {
    const getNewsItems = async () => {
      const data = await getDocs(collection(db, "inthenews"));
      setNewsItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      for (let i = 0; i < data.docs.length; i++) {
        const imageRef = ref(storageRef, data.docs[i].data().imageurl);
        const imageUrl = await getDownloadURL(imageRef);
        setNewsItemImages((newsItemImages) => [
          ...newsItemImages,
          { url: imageUrl, published: data.docs[i].data().published },
        ]);
      }
    };
    getNewsItems();
  }, []);

  newsItems.sort(function (first, second) {
    return second.published["seconds"] - first.published["seconds"];
  });

  newsItemImages.sort(function (first, second) {
    return second.published["seconds"] - first.published["seconds"];
  });

  const newsItemsImagesUrls = newsItemImages.map((newsItemImage) => {
    return newsItemImage.url;
  });

  console.log(newsItemsImagesUrls);

  return (
    <div className="page">
      <h1>In The News</h1>
      <br />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {newsItems.map((newsItem) => {
          return (
            <div className="newsitem">
              <img
                src={newsItemsImagesUrls[newsItems.indexOf(newsItem)]}
                alt="News Logo"
                className="newslogo"
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
              <a href={newsItem.url}>{newsItem.title}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
