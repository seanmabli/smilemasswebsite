import { useState } from "react";
import { ColoredTextFeild } from "../components/mui";
import { Button } from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";

import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firebase";

export default function AdminNewletters() {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [published, setPublished] = useState(Date.now());
  const [success, setSuccess] = useState(false);
  const [imageUpload, setImageUpload] = useState({ name: "No file chosen" });

  function Save() {
    if (imageUpload.name === "No file chosen") return;

    const imageRef = ref(
      storage,
      `newsletters/${Math.round(Math.random() * 10000000000).toString()}`
    );

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const upload = async () => {
          await addDoc(collection(db, "newsletters"), {
            title: title,
            post: post,
            published: published,
            url: title.replace(/\s/g, '').toLowerCase(),
            imageurl: url,
          });
          setSuccess(true);
        };
        upload();
      });
    });
  }

  if (success) {
    return (
      <div className="page">
        <h1>Admin - Newsletters</h1>
        <br />
        <p>
          Post Uploaded Sucessfully, this post will be published on{" "}
          {published}
        </p>
      </div>
    );
  } else if (imageUpload.name !== undefined) {
    return (
      <div className="page">
        <h1>Admin - Newsletters</h1>
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
        <div style={{ display: "flex" }}>
          <Button
            variant="outlined"
            component="label"
            style={{ color: "#547c94", borderColor: "#547c94" }}
          >
            Upload Thumbnail
            <input
              type="file"
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
              hidden
            />
          </Button>
          <p>&nbsp;&nbsp;{imageUpload.name}</p>
        </div>
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
