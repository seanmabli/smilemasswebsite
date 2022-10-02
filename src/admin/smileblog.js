import { useState, useEffect, useCallback } from "react";
import {
  ColoredTextField,
  TittapCard,
  SMILEBlogCardActionArea,
} from "../components/mui";
import {
  Button,
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
  doc
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
  const [imageUpload, setImageUpload] = useState({ name: "No file chosen" });
  const [realImageUpload, setRealImageUpload] = useState(null);
  const [initialState, setInitialState] = useState(false);
  const [newPost, setNewPost] = useState(true);
  const [inEditor, setInEditor] = useState(false);
  const [hoverEditor, setHoverEditor] = useState(false);

  const { id } = useParams();

  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "smileblog"), where("url", "==", id))
      );
      setPost(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getPost();
  }, []);
  
  let navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function savePost() {
    const html = editor.getHTML().replace("<p></p>", "<br/>");
    if (newPost) {
      if (realImageUpload === null) return;

      const imageRef = ref(
        storage,
        `smileblog/${Math.round(Math.random() * 10000000000).toString()}`
      );

      uploadBytes(imageRef, realImageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const upload = async () => {
            await addDoc(collection(db, "smileblog"), {
              title: title,
              post: html,
              published: new Date(published),
              url: title.replace(/\s/g, "").toLowerCase(),
              imageurl: url,
              imagename: realImageUpload.name,
            });
            navigate("/admin/smileblog");
          };
          upload();
        });
      });
    } else {
      if (realImageUpload === null) {
        const upload = async () => {
          await updateDoc(doc(db, "smileblog", post[0].id), {
            title: title,
            post: html,
            published: new Date(published),
            url: title.replace(/\s/g, "").toLowerCase(),
          });
          navigate("/admin/smileblog");
        };
        upload();
      } else {
        deleteObject(ref(storage, post[0].imageurl)).then(() => {
          const imageRef = ref(
            storage,
            `smileblog/${Math.round(Math.random() * 10000000000).toString()}`
          );

          uploadBytes(imageRef, realImageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref)
              .then((url) => {
                const upload = async () => {
                  await updateDoc(doc(db, "smileblog", post[0].id), {
                    title: title,
                    post: html,
                    published: new Date(published),
                    url: title.replace(/\s/g, "").toLowerCase(),
                    imageurl: url,
                    imagename: realImageUpload.name,
                  });
                  navigate("/admin/smileblog");
                };
                upload();
              })
              .catch((error) => {
                console.log(error);
              });
          });
        });
      }
    }
  }

  function deletePost() {
    deleteObject(ref(storage, post[0].imageurl))
      .then(() => {
        const upload = async () => {
          await deleteDoc(doc(db, "smileblog", post[0].id));
          navigate("/admin/smileblog");
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
    if (post.length === 0 && id !== "new") {
      navigate("/admin/smileblog");
    }
    if (id !== "new") {
      setTitle(post[0].title);
      setPublished(post[0].published.toDate());
      editor.commands.setContent(post[0].post);
      setImageUpload({ fromurl: post[0].imageurl, name: post[0].imagename });
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
        <div style={{ display: "flex" }}>
          <Button
            variant="outlined"
            onClick={savePost}
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
                onClick={handleClose}
                variant="outlined"
                style={{ color: "#547c94", borderColor: "#547c94" }}
              >
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
