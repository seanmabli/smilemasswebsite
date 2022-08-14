import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { SMILEBlogCardActionArea } from "../components/mui";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import "./smileblog.css";
import { Footer } from "../components/footer";

export function SmileBlog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "smileblog"));
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  posts.sort(function (first, second) {
    return second.published - first.published;
  });

  let navigate = useNavigate();

  return (
    <div className="page">
      <h1>SMILE Blog</h1>
      <br />
      {posts.map((post) => {
        if (post.published.toDate() < new Date()) {
          return (
            <SMILEBlogCardActionArea onClick={() => navigate(post.url)}>
              <img
                src={post.imageurl}
                alt="Post Thumbnail"
                className="postthumbnail"
              />
              <div>
                <h2 style={{ color: "black" }}>{post.title}</h2>
                <br />
                <p style={{ color: "black" }}>
                  {post.published
                    .toDate()
                    .toDateString()
                    .split(" ")
                    .slice(1)
                    .join(" ")}
                  &nbsp;&nbsp;
                  <span className="bold">Joanna Buoniconti</span>
                </p>
                <br />
                <p style={{ whiteSpace: "pre-line", color: "black" }}>
                  {post.post
                    .replace(/<[^>]+>/g, "")
                    .split(" ")
                    .slice(0, 50)
                    .join(" ")}
                  ...
                </p>
              </div>
            </SMILEBlogCardActionArea>
          );
        } else {
          return;
        }
      })}
      <Footer />
    </div>
  );
}

export function SmileBlogPost() {
  const { id } = useParams();

  const smileblogRef = collection(db, "smileblog");
  const q = query(smileblogRef, where("url", "==", id));

  const [post, setPost] = useState(null);

  onSnapshot(q, (snapshot) => {
    const data = [];
    snapshot.docs.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    setPost(data);
  });

  let navigate = useNavigate();

  if (post !== null) {
    return (
      <div className="page">
        {post.map((post) => {
          return (
            <>
              <h1>
                <span
                  onClick={() => navigate("/smileblog")}
                  style={{ cursor: "pointer" }}
                >
                  SMILE Blog
                </span>{" "}
                <span style={{ color: "gray" }}>/</span> {post.title}
              </h1>
              <p>
                {post.published
                  .toDate()
                  .toDateString()
                  .split(" ")
                  .slice(1)
                  .join(" ")}
                &nbsp;&nbsp;
                <span className="bold">Joanna Buoniconti</span>
              </p>
              <br />
              <div dangerouslySetInnerHTML={{ __html: post.post }} />
            </>
          );
        })}
        <Footer />
      </div>
    );
  }
}
