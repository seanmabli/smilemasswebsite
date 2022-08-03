import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { NewsItemCardActionArea } from "../components/mui";

import { ColoredTextFeild } from "../components/mui";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../firebase/firebase";

export function AdminInTheNews() {
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
      <h1>
        <span
          onClick={() => navigate("/admin/dashboard")}
          style={{ cursor: "pointer" }}
        >
          Admin
        </span>{" "}
        <span style={{ color: "gray" }}>/</span> In The News
      </h1>
      <br />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <NewsItemCardActionArea
          className="newsitem"
          onClick={() => navigate("new")}
        >
          <h2 style={{ color: "black" }}>New News Item</h2>
        </NewsItemCardActionArea>
        {newsItems.map((newsItem) => {
          return (
            <NewsItemCardActionArea
              className="newsitem"
              onClick={() => navigate(newsItem.id)}
            >
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

export function AdminInTheNewsEditor() {
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState(Date.now());
  const [image, setImage] = useState({ name: "No file chosen" });
  const [url, setUrl] = useState("");

  const [initialState, setInitialState] = useState(false);
  const [newPost, setNewPost] = useState(true);
  const [success, setSuccess] = useState(false);

  let navigate = useNavigate();

  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      const data = await getDoc(doc(db, "inthenews", id));
      setPost(data.data());
    };
    getPost();
  }, []);

  if (post !== null && !initialState) {
    if (post === undefined && id !== "new") {
      navigate("/admin/inthenews");
    }
    if (id !== "new") {
      setTitle(post.title);
      setPublished(post.published.toDate());
      setUrl(post.url);
      setNewPost(false);
    }
    setInitialState(true);
  }

  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function save() {
    if (newPost) {
      if (image.name === "No file chosen") return;

      const imageRef = ref(
        storage,
        `inthenews/${Math.round(Math.random() * 10000000000).toString()}`
      );

      uploadBytes(imageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((imageurl) => {
          const upload = async () => {
            await addDoc(collection(db, "inthenews"), {
              title: title,
              published: new Date(published),
              url: url,
              imageurl: imageurl,
            });
            setSuccess("post");
          };
          upload();
        });
      });
    } else {
      const upload = async () => {
        await updateDoc(doc(db, "inthenews", id), {
          title: title,
          published: new Date(published),
          url: url,
        });
        setSuccess("update");
      };
      upload();
    }
  }

  function deletePost() {
    deleteObject(ref(storage, post.imageurl))
      .then(() => {
        const upload = async () => {
          await deleteDoc(doc(db, "inthenews", id));
          setSuccess("delete");
        };
        upload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (success === "post") {
    return (
      <div className="page">
        <h1>
          <span
            onClick={() => navigate("/admin/dashboard")}
            style={{ cursor: "pointer" }}
          >
            Admin
          </span>{" "}
          <span style={{ color: "gray" }}>/</span>{" "}
          <span
            onClick={() => navigate("/admin/inthenews")}
            style={{ cursor: "pointer" }}
          >
            In The News
          </span>{" "}
          <span style={{ color: "gray" }}>/</span> Editor
        </h1>
        <br />
        <p>
          Post Uploaded, this post will be published on{" "}
          {new Date(published).toDateString()}
        </p>
      </div>
    );
  } else if (success === "update") {
    return (
      <div className="page">
        <h1>
          <span
            onClick={() => navigate("/admin/dashboard")}
            style={{ cursor: "pointer" }}
          >
            Admin
          </span>{" "}
          <span style={{ color: "gray" }}>/</span>{" "}
          <span
            onClick={() => navigate("/admin/inthenews")}
            style={{ cursor: "pointer" }}
          >
            In The News
          </span>{" "}
          <span style={{ color: "gray" }}>/</span> Editor
        </h1>
        <br />
        <p>Post Updated</p>
      </div>
    );
  } else if (success === "delete") {
    return (
      <div className="page">
        <h1>
          <span
            onClick={() => navigate("/admin/dashboard")}
            style={{ cursor: "pointer" }}
          >
            Admin
          </span>{" "}
          <span style={{ color: "gray" }}>/</span>{" "}
          <span
            onClick={() => navigate("/admin/inthenews")}
            style={{ cursor: "pointer" }}
          >
            In The News
          </span>{" "}
          <span style={{ color: "gray" }}>/</span> Editor
        </h1>
        <br />
        <p>Post Deleted</p>
      </div>
    );
  } else if (image.name !== undefined) {
    return (
      <div className="page">
        <h1>
          <span
            onClick={() => navigate("/admin/dashboard")}
            style={{ cursor: "pointer" }}
          >
            Admin
          </span>{" "}
          <span style={{ color: "gray" }}>/</span>{" "}
          <span
            onClick={() => navigate("/admin/inthenews")}
            style={{ cursor: "pointer" }}
          >
            In The News
          </span>{" "}
          <span style={{ color: "gray" }}>/</span> Editor
        </h1>
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
        <div style={{ maxWidth: "800px" }}>
          <ColoredTextFeild
            label="Url"
            variant="outlined"
            size="small"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            fullWidth
            required
            multiline
          />
        </div>
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
        <div style={!newPost ? { display: "none" } : { display: "flex" }}>
          <Button
            variant="outlined"
            component="label"
            style={{ color: "#547c94", borderColor: "#547c94" }}
          >
            Upload Thumbnail
            <input
              type="file"
              onChange={(event) => {
                setImage(event.target.files[0]);
              }}
              hidden
            />
          </Button>
          <p>&nbsp;&nbsp;{image.name}</p>
          {/*
          <br />
          <img
            src={URL.createObjectURL(image)}
            alt="Uploaded Image"
            style={{ width: "300px", maxHeight: "600px", objectFit: "cover" }}
          />
            */}
        </div>
        <br />
        <div style={{ display: "flex" }}>
          <Button
            variant="outlined"
            onClick={save}
            style={{ color: "#547c94", borderColor: "#547c94" }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClickOpen}
            style={newPost ? { display: "none" } : { marginLeft: "10px" }}
          >
            Delete News Item
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                This action cannot be undone. This will permanently delete{" "}
                <span className="bold" style={{ color: "#000" }}>
                  {title}
                </span>
                .
              </DialogContentText>
              <br />
              <DialogContentText fontSize={"14px"}>
                Please type{" "}
                <span className="bold" style={{ color: "#000" }}>
                  {title}
                </span>{" "}
                to confirm.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                size="small"
                type="email"
                fullWidth
                variant="outlined"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="outlined">
                Cancel
              </Button>
              <Button
                disabled={confirm !== title}
                onClick={deletePost}
                variant="outlined"
                color="error"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}
