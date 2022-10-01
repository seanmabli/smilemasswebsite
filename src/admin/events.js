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

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import "./tiptap.css";

import { useNavigate, useParams } from "react-router";
import { set } from "date-fns";

export function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(Date.now());
  const [imageUpload, setImageUpload] = useState({ name: "No file chosen" });
  const [realImageUpload, setRealImageUpload] = useState(null);
  const [inEditor, setInEditor] = useState(false);
  const [hoverEditor, setHoverEditor] = useState(false);

  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDate, setEditingDate] = useState(Date.now());
  const [editingImage, setEditingImage] = useState({ name: "No file chosen" });
  const [editingRealImage, setEditingRealImage] = useState(null);
  const [inEditingEditor, setInEditingEditor] = useState(false);
  const [hoverEditingEditor, setHoverEditingEditor] = useState(false);

  useEffect(() => {
    const getEvents = async () => {
      const data = await getDocs(collection(db, "events"));
      setEvents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getEvents();
  }, []);

  events.sort(function (first, second) {
    return first.date - second.date;
  });

  let navigate = useNavigate();

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
          setEvents([
            ...events,
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

  const [openDeletingEvent, setOpenDeletingEvent] = useState(false);
  const [deletingEvent, setDeletingEvent] = useState({});
  const [confirm, setConfirm] = useState("");

  function deleteEvent() {
    deleteObject(ref(storage, deletingEvent.imageurl));
    const upload = async () => {
      await deleteDoc(doc(db, "events", deletingEvent.id));
      setOpenDeletingEvent(false);
      setEvents(events.filter((r) => r.id !== deletingEvent.id));
    };
    upload();
  }

  function updateEvent() {
    const html = editingEditor.getHTML().replace("<p></p>", "<br/>");
    if (editingRealImage === null) {
      const upload = async () => {
        await updateDoc(doc(db, "events", editingId), {
          title: editingTitle,
          description: html,
          date: new Date(date),
        });
      };
      upload();
      setEditing(false);
      setEvents(
        events.map((r) => {
          if (r.id === editingId) {
            return {
              title: editingTitle,
              description: html,
              date: Timestamp.fromDate(editingDate),
              imageurl: r.imageurl,
              imagename: r.imagename,
              id: r.id,
            };
          } else {
            return r;
          }
        })
      );
    } else {
      deleteObject(
        ref(storage, events.filter((r) => r.id !== editingId)[0])
      ).then(() => {
        const imageRef = ref(
          storage,
          `events/${Math.round(Math.random() * 10000000000).toString()}`
        );

        uploadBytes(imageRef, editingRealImage).then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              const upload = async () => {
                await updateDoc(doc(db, "events", editingId), {
                  title: editingTitle,
                  description: html,
                  date: new Date(editingDate),
                  imageurl: url,
                  imagename: editingRealImage.name,
                });
              };
              upload();
              setEditing(false);
              setEvents(
                events.map((r) => {
                  if (r.id === editingId) {
                    return {
                      title: editingTitle,
                      description: html,
                      date: Timestamp.fromDate(editingDate),
                      imageurl: url,
                      imagename: editingRealImage.name,
                    };
                  } else {
                    return r;
                  }
                })
              );
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });
    }
  }

  console.log(events);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: "<p>Description</p>",
  });

  const editingEditor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: "",
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
        {events.map((event) => {
          if (editing && event.id === editingId) {
            return (
              <div>
                <br />
                <Divider />
                <br />
                <div className="formtwo">
                  <ColoredTextField
                    label="Title"
                    variant="outlined"
                    size="small"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
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
                    value={editingDate}
                    onChange={(e) => setEditingDate(e)}
                  />
                </LocalizationProvider>
                <br />
                <Tooltip title="Bold">
                  <IconButton
                    onClick={() =>
                      editingEditor.chain().focus().toggleBold().run()
                    }
                    sx={{ margin: "5px 5px 5px 0", color: "#547c94" }}
                  >
                    <FormatBoldRoundedIcon
                      className={
                        editingEditor.isActive("bold")
                          ? "isActive"
                          : "isNotActive"
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Italic">
                  <IconButton
                    onClick={() =>
                      editingEditor.chain().focus().toggleItalic().run()
                    }
                    sx={{ margin: "5px 5px 5px 0", color: "#547c94" }}
                  >
                    <FormatItalicRoundedIcon
                      className={
                        editingEditor.isActive("italic")
                          ? "isActive"
                          : "isNotActive"
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Strikethrough">
                  <IconButton
                    onClick={() =>
                      editingEditor.chain().focus().toggleStrike().run()
                    }
                    sx={{ margin: "5px 0 5px 0", color: "#547c94" }}
                  >
                    <StrikethroughSRoundedIcon
                      className={
                        editingEditor.isActive("strike")
                          ? "isActive"
                          : "isNotActive"
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Clear Formatting">
                  <IconButton
                    onClick={() =>
                      editingEditor.chain().focus().clearNodes().run()
                    }
                    sx={{ margin: "5px 0 5px 0", color: "#547c94" }}
                  >
                    <FormatClearRoundedIcon className="isNotActive" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Bulleted List">
                  <IconButton
                    onClick={() =>
                      editingEditor.chain().focus().toggleBulletList().run()
                    }
                    sx={{ margin: "5px 0 5px 0", color: "#547c94" }}
                  >
                    <FormatListBulletedRoundedIcon
                      className={
                        editingEditor.isActive("bulletList")
                          ? "isActive"
                          : "isNotActive"
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Numbered List">
                  <IconButton
                    onClick={() =>
                      editingEditor.chain().focus().toggleOrderedList().run()
                    }
                    sx={{ margin: "5px 0 5px 0", color: "#547c94" }}
                  >
                    <FormatListNumberedRoundedIcon
                      className={
                        editingEditor.isActive("orderedList")
                          ? "isActive"
                          : "isNotActive"
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Block Quote">
                  <IconButton
                    onClick={() =>
                      editingEditor.chain().focus().toggleBlockquote().run()
                    }
                    sx={{ margin: "5px 0 5px 0", color: "#547c94" }}
                  >
                    <FormatQuoteRoundedIcon
                      className={
                        editingEditor.isActive("blockquote")
                          ? "isActive"
                          : "isNotActive"
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
                      className={
                        editingEditor.isActive("link")
                          ? "isActive"
                          : "isNotActive"
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Link Off">
                  <IconButton
                    onClick={setLink}
                    disabled={!editingEditor.isActive("link")}
                  >
                    <LinkOffRoundedIcon className="isNotActive" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Undo">
                  <IconButton
                    onClick={() => editingEditor.chain().focus().undo().run()}
                  >
                    <UndoRoundedIcon className="isNotActive" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Redo">
                  <IconButton
                    onClick={() => editingEditor.chain().focus().redo().run()}
                  >
                    <RedoRoundedIcon className="isNotActive" />
                  </IconButton>
                </Tooltip>
                <ClickAwayListener
                  onClickAway={() => setInEditingEditor(false)}
                >
                  <TittapCard
                    variant="outlined"
                    onMouseEnter={() => setHoverEditingEditor(true)}
                    onMouseLeave={() => setHoverEditingEditor(false)}
                    onMouseDownCapture={() => setInEditingEditor(true)}
                    sx={[
                      hoverEditingEditor
                        ? { borderWidth: "1px", borderColor: "#547c94" }
                        : {
                            borderWidth: "1px",
                            borderColor: "rgba(0, 0, 0, 0.23)",
                          },
                      inEditingEditor
                        ? { borderWidth: "2px", borderColor: "#547c94" }
                        : {},
                    ]}
                  >
                    <EditorContent editor={editingEditor} />
                  </TittapCard>
                </ClickAwayListener>
                <br />
                <Image image={editingImage} />
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
                        setEditingImage({
                          fromurl: URL.createObjectURL(event.target.files[0]),
                          name: event.target.files[0].name,
                        });
                        setEditingRealImage(event.target.files[0]);
                      }}
                      hidden
                    />
                  </Button>
                  <p>&nbsp;&nbsp;{editingImage.name}</p>
                </div>
                <br />
                <div style={{ display: "flex" }}>
                  <Button
                    variant="outlined"
                    style={{ color: "#547c94", borderColor: "#547c94" }}
                    onClick={updateEvent}
                  >
                    Update Event
                  </Button>
                  <Button
                    variant="outlined"
                    style={{
                      color: "#547c94",
                      borderColor: "#547c94",
                      marginLeft: "10px",
                    }}
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            );
          } else {
            return (
              <div>
                <br />
                <Divider />
                <br />
                <div style={{ position: "relative", display: "flex" }}>
                  <div
                    style={{
                      color: "#547c94",
                      position: "absolute",
                      top: "0px",
                      right: "0px",
                    }}
                  >
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => {
                          setEditing(true);
                          setEditingId(event.id);
                          setEditingTitle(event.title);
                          setEditingDate(event.date.toDate());
                          console.log(event.imagename);
                          setEditingImage({
                            fromurl: event.imageurl,
                            name: event.imagename,
                          });
                          editingEditor.commands.setContent(event.description);
                        }}
                      >
                        <EditRoundedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => {
                          setOpenDeletingEvent(true);
                          setDeletingEvent(event);
                        }}
                      >
                        <DeleteRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
                <div className="eventcontainer">
                  <div>
                    <img
                      src={event.imageurl}
                      alt={event.title}
                      className="eventthumbnail"
                    />
                  </div>
                  <div>
                    <h2 style={{ color: "black" }}>{event.title}</h2>
                    <br />
                    <p style={{ color: "black" }}>
                      {event.date
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
                      dangerouslySetInnerHTML={{ __html: event.description }}
                    />
                  </div>
                </div>
              </div>
            );
          }
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
        <Dialog
          open={openDeletingEvent}
          onClose={() => setOpenDeletingEvent(false)}
        >
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This action cannot be undone. This will permanently delete{" "}
              <span className="bold" style={{ color: "#000" }}>
                {deletingEvent.title}
              </span>
              .
            </DialogContentText>
            <br />
            <DialogContentText fontSize={"14px"}>
              Please type{" "}
              <span className="bold" style={{ color: "#000" }}>
                {deletingEvent.title}
              </span>{" "}
              to confirm.
            </DialogContentText>
            <ColoredTextField
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
            <Button
              onClick={() => setOpenDeletingEvent(false)}
              variant="outlined"
              style={{ color: "#547c94", borderColor: "#547c94" }}
            >
              Cancel
            </Button>
            <Button
              disabled={confirm !== deletingEvent.title}
              onClick={deleteEvent}
              variant="outlined"
              color="error"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
