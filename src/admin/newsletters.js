import { useState, useEffect } from "react";
import { ColoredTextField } from "../components/mui";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
  IconButton,
  ClickAwayListener,
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
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";

import { TwitterPicker } from "react-color";

import React, { useCallback } from "react";

import FormatBoldRoundedIcon from "@mui/icons-material/FormatBoldRounded";
import FormatItalicRoundedIcon from "@mui/icons-material/FormatItalicRounded";
import StrikethroughSRoundedIcon from "@mui/icons-material/StrikethroughSRounded";
import FormatColorTextRoundedIcon from "@mui/icons-material/FormatColorTextRounded";
import FormatAlignLeftRoundedIcon from "@mui/icons-material/FormatAlignLeftRounded";
import FormatAlignCenterRoundedIcon from "@mui/icons-material/FormatAlignCenterRounded";
import FormatAlignRightRoundedIcon from "@mui/icons-material/FormatAlignRightRounded";
import FormatAlignJustifyRoundedIcon from "@mui/icons-material/FormatAlignJustifyRounded";
import FormatClearRoundedIcon from "@mui/icons-material/FormatClearRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import InsertLinkRoundedIcon from "@mui/icons-material/InsertLinkRounded";
import LinkOffRoundedIcon from "@mui/icons-material/LinkOffRounded";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import RedoRoundedIcon from "@mui/icons-material/RedoRounded";

import { TittapCard } from "../components/mui";
import { useNavigate } from "react-router";
import { SMILEBlogCardActionArea } from "../components/mui";
import { useParams } from "react-router";

export function AdminNewsletters() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "newsletter"));
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
        <span style={{ color: "gray" }}>/</span> Newsletters
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

export function AdminNewslettersEditor() {
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState(Date.now());
  const [success, setSuccess] = useState(false);
  const [imageUpload, setImageUpload] = useState({ name: "No file chosen" });
  const [initialState, setInitialState] = useState(false);
  const [newPost, setNewPost] = useState(true);
  const [inEditor, setInEditor] = useState(false);
  const [hoverEditor, setHoverEditor] = useState(false);
  const [openColor, setOpenColor] = useState(false);

  const { id } = useParams();

  const newsletterRef = collection(db, "newsletter");
  const q = query(newsletterRef, where("url", "==", id));

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
        `newsletter/${Math.round(Math.random() * 10000000000).toString()}`
      );

      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const upload = async () => {
            await addDoc(collection(db, "newsletter"), {
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
        await updateDoc(doc(db, "newsletter", post[0].id), {
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
          await deleteDoc(doc(db, "newsletter", post[0].id));
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
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Color.configure({
        types: ["textStyle"],
      }),
      TextStyle,
    ],
    content: "<p>Post</p>",
  });

  if (post !== null && !initialState) {
    if (post.length === 0 && id !== "new") {
      navigate("/admin/newsletters");
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

  console.log(openColor);

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
            onClick={() => navigate("/admin/newsletter")}
            style={{ cursor: "pointer" }}
          >
            Newsletter
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
            onClick={() => navigate("/admin/newsletter")}
            style={{ cursor: "pointer" }}
          >
            Newsletter
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
            onClick={() => navigate("/admin/newsletter")}
            style={{ cursor: "pointer" }}
          >
            Newsletter
          </span>{" "}
          <span style={{ color: "gray" }}>/</span> Editor
        </h1>
        <br />
        <p>Post Deleted</p>
      </div>
    );
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
            onClick={() => navigate("/admin/newsletter")}
            style={{ cursor: "pointer" }}
          >
            Newsletter
          </span>{" "}
          <span style={{ color: "gray" }}>/</span> Editor
        </h1>
        <br />
        <div style={{ maxWidth: "800px" }}>
          <ColoredTextField
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
        <div style={{ display: "inline-flex" }}>
          <Tooltip title="Bold">
            <IconButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              sx={{ margin: "5px 5px 5px 0", color: "#547c94" }}
            >
              <FormatBoldRoundedIcon
                className={editor.isActive("bold") ? "isActive" : "isNotActive"}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Italic">
            <IconButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              sx={{ margin: "5px 5px 5px 0", color: "#547c94" }}
            >
              <FormatItalicRoundedIcon
                className={
                  editor.isActive("italic") ? "isActive" : "isNotActive"
                }
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Strikethrough">
            <IconButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              sx={{ margin: "5px 0 5px 0", color: "#547c94" }}
            >
              <StrikethroughSRoundedIcon
                className={
                  editor.isActive("strike") ? "isActive" : "isNotActive"
                }
              />
            </IconButton>
          </Tooltip>
          <div>
            <Tooltip title="Text color">
              <IconButton
                component="label"
                sx={{
                  margin: "5px 5px 5px 0",
                  color: editor.getAttributes("textStyle").color,
                }}
                onClick={() => setOpenColor(!openColor)}
              >
                <FormatColorTextRoundedIcon />
              </IconButton>
            </Tooltip>
            <div
              style={
                openColor
                  ? {
                      display: "block",
                      paddingTop: "10px",
                      perspective: "1px",
                      zIndex: "1000",
                    }
                  : { display: "none" }
              }
            >
              <TwitterPicker
                color={editor.getAttributes("textStyle").color}
                onChange={(event) =>
                  editor.chain().focus().setColor(event.hex).run()
                }
                colors={[
                  "#000000",
                  "#547c94",
                  "#04a3d3",
                  "#0975a2",
                  "#7bc354",
                  "#04848b",
                ]}
              />
            </div>
          </div>
          <Tooltip title="Left align">
            <IconButton
              onClick={() =>
                editor.chain().focus().setParagraphAlign("left").run()
              }
              className={
                editor.isActive("alignLeft") ? "isActive" : "isNotActive"
              }
              sx={{ margin: "5px 5px 5px 0", color: "#547c94" }}
            >
              <FormatAlignLeftRoundedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Center align">
            <IconButton
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={
                editor.isActive({ textAlign: "center" })
                  ? "isActive"
                  : "isNotActive"
              }
              sx={{ margin: "5px 5px 5px 0", color: "#547c94" }}
            >
              <FormatAlignCenterRoundedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Right align">
            <IconButton
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={
                editor.isActive({ textAlign: "right" })
                  ? "isActive"
                  : "isNotActive"
              }
              sx={{ margin: "5px 0 5px 0", color: "#547c94" }}
            >
              <FormatAlignRightRoundedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Justify">
            <IconButton
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
              className={
                editor.isActive({ textAlign: "justify" })
                  ? "isActive"
                  : "isNotActive"
              }
              sx={{ margin: "5px 5px 5px 0", color: "#547c94" }}
            >
              <FormatAlignJustifyRoundedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Clear Formatting">
            <IconButton
              onClick={() => editor.chain().focus().clearNodes().run()}
              sx={{ margin: "5px 0 5px 0", color: "#547c94" }}
            >
              <FormatClearRoundedIcon className="isNotActive" />
            </IconButton>
          </Tooltip>
          <Button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={
              editor.isActive("paragraph") ? "isActive" : "isNotActive"
            }
            sx={{ margin: "5px 0 5px 0", color: "#547c94" }}
          >
            paragraph
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().setHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 })
                ? "isActive"
                : "isNotActive"
            }
            sx={{ margin: "5px 0 5px 0", color: "#547c94" }}
          >
            title
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().setHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 })
                ? "isActive"
                : "isNotActive"
            }
            sx={{ margin: "5px 0 5px 0", color: "#547c94" }}
          >
            subtitle
          </Button>
          <Tooltip title="Bulleted List">
            <IconButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              sx={{ margin: "5px 0 5px 0", color: "#547c94" }}
            >
              <FormatListBulletedRoundedIcon
                className={
                  editor.isActive("bulletList") ? "isActive" : "isNotActive"
                }
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Numbered List">
            <IconButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              sx={{ margin: "5px 0 5px 0", color: "#547c94" }}
            >
              <FormatListNumberedRoundedIcon
                className={
                  editor.isActive("orderedList") ? "isActive" : "isNotActive"
                }
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Block Quote">
            <IconButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              sx={{ margin: "5px 0 5px 0", color: "#547c94" }}
            >
              <FormatQuoteRoundedIcon
                className={
                  editor.isActive("blockquote") ? "isActive" : "isNotActive"
                }
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Horizontal Rule">
            <IconButton
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              sx={{ margin: "5px 0 5px 0", color: "#547c94" }}
            >
              <HorizontalRuleRoundedIcon className="isNotActive" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Insert Link">
            <IconButton
              onClick={setLink}
              sx={{ margin: "5px 0 5px 0", color: "#547c94" }}
            >
              <InsertLinkRoundedIcon
                className={editor.isActive("link") ? "isActive" : "isNotActive"}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Link Off">
            <IconButton onClick={setLink} disabled={!editor.isActive("link")}>
              <LinkOffRoundedIcon className="isNotActive" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Undo">
            <IconButton onClick={() => editor.chain().focus().undo().run()}>
              <UndoRoundedIcon className="isNotActive" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Redo">
            <IconButton onClick={() => editor.chain().focus().redo().run()}>
              <RedoRoundedIcon className="isNotActive" />
            </IconButton>
          </Tooltip>
        </div>
        <ClickAwayListener onClickAway={() => setInEditor(false)}>
          <TittapCard
            variant="outlined"
            onMouseEnter={() => setHoverEditor(true)}
            onMouseLeave={() => setHoverEditor(false)}
            onMouseDownCapture={() => setInEditor(true)}
            sx={[
              hoverEditor
                ? { borderWidth: "1px", borderColor: "#547c94" }
                : { borderWidth: "1px", borderColor: "rgba(0, 0, 0, 0.23)" },
              inEditor ? { borderWidth: "2px", borderColor: "#547c94" } : {},
            ]}
          >
            <EditorContent editor={editor} />
          </TittapCard>
        </ClickAwayListener>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => (
              <ColoredTextField {...props} size="small" />
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
