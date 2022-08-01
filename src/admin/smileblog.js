import { useState } from "react";
import { ColoredTextFeild } from "../components/mui";
import { TextField, Button } from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";

import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function AdminSmileBlog() {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [published, setPublished] = useState(Date.now());
  const [success, setSuccess] = useState(false);

  function Save() {
    const upload = async () => {
      await addDoc(collection(db, "smileblog"), {
        title: title,
        post: post,
        published: published,
      });
      setSuccess(true);
    };
    upload();
  }

  if (success) {
    return (
      <div className="page">
        <h1>Admin - Smile Blog</h1>
        <br />
        <p>
          Post Uploaded Sucessfully, this post will be published on{" "}
          {published.ToString()}
        </p>
      </div>
    );
  } else {
    return (
      <div className="page">
        <h1>Admin - Smile Blog</h1>
        <br />
        <div style={{ maxWidth: "800px" }}>
          <ColoredTextFeild
            label="Title"
            variant="outlined"
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />
        </div>
        <br />
        <ColoredTextFeild
          label="Post"
          variant="outlined"
          size="small"
          minRows={5}
          value={post}
          onChange={(e) => setPost(e.target.value)}
          multiline
          fullWidth
          required
        />
        <br />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => (
              <ColoredTextFeild {...props} size="small" />
            )}
            label="Publish Date Time"
            value={published}
            onChange={(e) => setPublished(e)}
            required
          />
        </LocalizationProvider>
        <br />
        <Button
          variant="outlined"
          onClick={Save}
          style={{ color: "#547c94", borderColor: "#547c94" }}
        >
          Save
        </Button>
      </div>
    );
  }
}
