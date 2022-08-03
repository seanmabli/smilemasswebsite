import { useState, useEffect } from "react";
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
  query,
  where,
  doc,
  onSnapshot,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../firebase/firebase";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import React, { useCallback } from "react";

import FormatBoldRoundedIcon from "@mui/icons-material/FormatBoldRounded";
import FormatItalicRoundedIcon from "@mui/icons-material/FormatItalicRounded";
import StrikethroughSRoundedIcon from "@mui/icons-material/StrikethroughSRounded";
import FormatClearRoundedIcon from "@mui/icons-material/FormatClearRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import InsertLinkRoundedIcon from "@mui/icons-material/InsertLinkRounded";
import LinkOffRoundedIcon from "@mui/icons-material/LinkOffRounded";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import RedoRoundedIcon from "@mui/icons-material/RedoRounded";

import "./smileblog.css";

import { TittapCard } from "../components/mui";
import { useNavigate } from "react-router";
import { SMILEBlogCardActionArea } from "../components/mui";
import { useParams } from "react-router";

export function AdminSmileBlog() {
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
      <h1>
        <span
          onClick={() => navigate("/admin/dashboard")}
          style={{ cursor: "pointer" }}
        >
          Admin
        </span>{" "}
        <span style={{ color: "gray" }}>/</span> Smile Blog
      </h1>
      <br />
      <SMILEBlogCardActionArea onClick={() => navigate("new")}>
        <h2 style={{ color: "black" }}>New Post</h2>
      </SMILEBlogCardActionArea>
      {posts.map((post) => {
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
      })}
    </div>
  );
}

export function AdminSmileBlogEditor() {
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState(Date.now());
  const [success, setSuccess] = useState(false);
  const [imageUpload, setImageUpload] = useState({ name: "No file chosen" });
  const [initialState, setInitialState] = useState(false);
  const [newPost, setNewPost] = useState(true);

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

  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function save() {
    const html = editor.getHTML().replace("<p></p>", "<br/>");
    if (newPost) {
      if (imageUpload.name === "No file chosen") return;

      const imageRef = ref(
        storage,
        `smileblog/${Math.round(Math.random() * 10000000000).toString()}`
      );

      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const upload = async () => {
            await addDoc(collection(db, "smileblog"), {
              title: title,
              post: html,
              published: new Date(published),
              url: title.replace(/\s/g, "").toLowerCase(),
              imageurl: url,
            });
            setSuccess("post");
          };
          upload();
        });
      });
    } else {
      const upload = async () => {
        await updateDoc(doc(db, "smileblog", post[0].id), {
          title: title,
          post: html,
          published: new Date(published),
          url: title.replace(/\s/g, "").toLowerCase(),
        });
        setSuccess("update");
      };
      upload();
    }
  }

  function deletePost() {
    deleteObject(ref(storage, post[0].imageurl))
      .then(() => {
        const upload = async () => {
          await deleteDoc(doc(db, "smileblog", post[0].id));
          setSuccess("delete");
        };
        upload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: "<p>Post</p>",
  });

  if (post !== null && !initialState) {
    if (post.length === 0) {
      navigate("/admin/smileblog");
    }
    if (id !== "new") {
      setTitle(post[0].title);
      setPublished(post[0].published.toDate());
      editor.commands.setContent(post[0].post);
      setNewPost(false);
    }
    setInitialState(true);
  }

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
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
            onClick={() => navigate("/admin/smileblog")}
            style={{ cursor: "pointer" }}
          >
            Smile Blog
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
            onClick={() => navigate("/admin/smileblog")}
            style={{ cursor: "pointer" }}
          >
            Smile Blog
          </span>{" "}
          <span style={{ color: "gray" }}>/</span> Editor
        </h1>
        <br />
        <p>Post Updated</p>
      </div>
    );
  } else if (success === "delete") {
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
          onClick={() => navigate("/admin/smileblog")}
          style={{ cursor: "pointer" }}
        >
          Smile Blog
        </span>{" "}
        <span style={{ color: "gray" }}>/</span> Editor
      </h1>
      <br />
      <p>Post Deleted</p>
    </div>;
  } else if (imageUpload.name !== undefined) {
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
            onClick={() => navigate("/admin/smileblog")}
            style={{ cursor: "pointer" }}
          >
            Smile Blog
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
        <FormatBoldRoundedIcon
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "isActive" : "isNotActive"}
        />
        <FormatItalicRoundedIcon
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "isActive" : "isNotActive"}
        />
        <StrikethroughSRoundedIcon
          onClick={() => editor.chain().focus().toggleStrikethrough().run()}
          className={
            editor.isActive("strikethrough") ? "isActive" : "isNotActive"
          }
        />
        <FormatClearRoundedIcon
          onClick={() => editor.chain().focus().clearNodes().run()}
          className="isNotActive"
        />
        <FormatListBulletedRoundedIcon
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "isActive" : "isNotActive"}
        />
        <FormatListNumberedRoundedIcon
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList") ? "isActive" : "isNotActive"
          }
        />
        <FormatQuoteRoundedIcon
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "isActive" : "isNotActive"}
        />
        <InsertLinkRoundedIcon
          onClick={setLink}
          className={editor.isActive("link") ? "isActive" : "isNotActive"}
        />
        <LinkOffRoundedIcon
          onClick={setLink}
          disabled={!editor.isActive("link")}
          className="isNotActive"
        />
        <UndoRoundedIcon
          onClick={() => editor.chain().focus().undo().run()}
          className="isNotActive"
        />
        <RedoRoundedIcon
          onClick={() => editor.chain().focus().redo().run()}
          className="isNotActive"
        />
        <TittapCard variant="outlined">
          <EditorContent editor={editor} />
        </TittapCard>
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
                setImageUpload(event.target.files[0]);
              }}
              hidden
            />
          </Button>
          <p>&nbsp;&nbsp;{imageUpload.name}</p>
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
            Delete Post
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
