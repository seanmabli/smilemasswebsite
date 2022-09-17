import { useState, useEffect, useCallback } from "react";
import {
  ColoredTextField,
  TittapCard,
  SMILEBlogCardActionArea,
} from "../components/mui";
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
  Divider,
} from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";

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
  Timestamp,
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

import "./tiptap.css";

import { useNavigate, useParams } from "react-router";

export function AdminEvents() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(Date.now());
  const [imageUpload, setImageUpload] = useState({ name: "No file chosen" });
  const [realImageUpload, setRealImageUpload] = useState(null);
  const [inEditor, setInEditor] = useState(false);
  const [hoverEditor, setHoverEditor] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "events"));
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  posts.sort(function (first, second) {
    return first.date - second.date;
  });

  let navigate = useNavigate();

  console.log(posts);

  function addEvent() {
    if (realImageUpload.name === null) return;

    const imageRef = ref(
      storage,
      `events/${Math.round(Math.random() * 10000000000).toString()}`
    );

    uploadBytes(imageRef, realImageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const html = editor.getHTML().replace("<p></p>", "<br/>");
        const upload = async () => {
          await addDoc(collection(db, "events"), {
            title: title,
            description: html,
            date: new Date(date),
            imageurl: url,
            imagename: realImageUpload.name,
          });
          setPosts([
            ...posts,
            {
              title: title,
              description: html,
              date: Timestamp.fromDate(date),
              imageurl: url,
              imagename: realImageUpload.name,
            },
          ]);
        };
        upload();
        setTitle("");
        setDate(Date.now());
        editor.commands.setContent("<p>Description</p>");
        setImageUpload({ name: "No file chosen" });
        setRealImageUpload(null);
      });
    });
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: "<p>Description</p>",
  });

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

  function Image(props) {
    if (props.image.fromurl !== undefined) {
      return <img src={props.image.fromurl} style={{ width: "400px" }} />;
    }
  }

  if (imageUpload.name !== undefined) {
    return (
      <div className="page">
        <h1>
          <span
            onClick={() => navigate("/admin/dashboard")}
            style={{ cursor: "pointer" }}
          >
            Admin
          </span>{" "}
          <span style={{ color: "gray" }}>/</span> Events
        </h1>
        {posts.map((post) => {
          return (
            <div>
              <br />
              <Divider />
              <br />
              <img
                src={post.imageurl}
                alt={post.title}
                style={{ height: "100px" }}
              />
              <br />
              <h2 style={{ color: "black" }}>{post.title}</h2>
              <br />
              <p style={{ color: "black" }}>
                {post.date
                  .toDate()
                  .toDateString()
                  .split(" ")
                  .slice(1)
                  .join(" ")}
                &nbsp;&nbsp;
              </p>
              <br />
              <div
                style={{ color: "black" }}
                dangerouslySetInnerHTML={{ __html: post.description }}
              />
            </div>
          );
        })}
        <br />
        <Divider />
        <br />
        <div className="formtwo">
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            renderInput={(props) => (
              <ColoredTextField
                {...props}
                size="small"
                sx={{ margin: "20px 0 0 0" }}
                required
              />
            )}
            label="Date"
            value={date}
            onChange={(e) => setDate(e)}
          />
        </LocalizationProvider>
        <br />
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
              className={editor.isActive("italic") ? "isActive" : "isNotActive"}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Strikethrough">
          <IconButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            sx={{ margin: "5px 0 5px 0", color: "#547c94" }}
          >
            <StrikethroughSRoundedIcon
              className={editor.isActive("strike") ? "isActive" : "isNotActive"}
            />
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
        <br />
        <Image image={imageUpload} />
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
                setImageUpload({
                  fromurl: URL.createObjectURL(event.target.files[0]),
                  name: event.target.files[0].name,
                });
                setRealImageUpload(event.target.files[0]);
              }}
              hidden
            />
          </Button>
          <p>&nbsp;&nbsp;{imageUpload.name}</p>
        </div>
        <br />
        <Button
          variant="outlined"
          onClick={addEvent}
          style={{ color: "#547c94", borderColor: "#547c94" }}
        >
          Add Event
        </Button>
      </div>
    );
  }
}
