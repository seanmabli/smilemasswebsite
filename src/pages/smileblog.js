import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { SMILEBlogCardActionArea } from "../components/mui";

export default function SMILEBlog() {
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

  console.log(posts);

  return (
    <div className="page">
      <h1>SMILE Blog</h1>
      <br />
      {posts.map((post) => {
        return (
          <>
            <SMILEBlogCardActionArea>
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
                <spam className="bold">Joanna Buoniconti</spam>
              </p>
              <br />
              <p style={{ whiteSpace: "pre-line", color: "black" }}>
                {post.post.split(" ").slice(0, 50).join(" ")}...
              </p>
            </SMILEBlogCardActionArea>
          </>
        );
      })}
    </div>
  );
}
