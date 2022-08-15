import { useState, useEffect, useReducer } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import { useNavigate } from "react-router";
import {
  Button,
  Divider,
  Tooltip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { ColoredTextField } from "../components/mui";

export function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([{ name: "No file chosen" }]);
  const [error, setError] = useState(false);
  const [noImage, setNoImage] = useState(false);

  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [editingContent, setEditingContent] = useState("");
  const [editingError, setEditingError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getTestimonials = async () => {
      const data = await getDocs(collection(db, "testimonials"));
      setTestimonials(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTestimonials();
  }, []);

  testimonials.sort(function (first, second) {
    return first.index - second.index;
  });

  const [downloadURLs, setDownloadURLs] = useState([]);

  function addTestimonial() {
    if (content === "") {
      setError(true);
      return;
    } else {
      setError(false);
      if (images[0].type === undefined) {
        setNoImage(true);
        return;
      } else {
        const uploadImages = async () => {
          Array.from(images).forEach(async (image) => {
            if (image.name !== "No file chosen") {
              const imageRef = ref(
                storage,
                `testimonials/${Math.round(
                  Math.random() * 10000000000
                ).toString()}`
              );
              uploadBytes(imageRef, image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                  setDownloadURLs((prev) => [...prev, url]);
                });
              });
            }
          });
        };

        uploadImages();
      }
    }
  }

  const [openDeletingResponse, setOpenDeletingResponse] = useState(false);
  const [deletingResponse, setDeletingResponse] = useState({});

  function deleteTestimonial() {
    const upload = async () => {
      await deleteDoc(doc(db, "testimonials", deletingResponse.id));
      setOpenDeletingResponse(false);
      setTestimonials(testimonials.filter((r) => r.id !== deletingResponse.id));
    };
    upload();
  }

  function updateTestimonial() {
    if (editingContent === "") {
      setEditingError(true);
      return;
    } else {
      setEditingError(false);

      const upload = async () => {
        await updateDoc(doc(db, "testimonials", editingId), {
          content: editingContent,
        });

        setTestimonials(
          testimonials.map((r) => {
            if (r.id === editingId) {
              return { ...r, content: editingContent };
            }
            return r;
          })
        );

        setEditing(false);
        setEditingContent("");
        setEditingId("");
        setEditingError(false);
      };
      upload();
    }
  }

  const [imageNames, setImageNames] = useState(["No file chosen"]);
  function getImageNames(images) {
    setImageNames([]);
    for (let i = 0; i < images.length; i++) {
      setImageNames((prev) => [...prev, images[i].name]);
    }
  }

  if (downloadURLs.length === images.length || noImage) {
    console.log("uploading");
    const uploadDoc = async () => {
      const id = await addDoc(collection(db, "testimonials"), {
        content: content,
        index: testimonials.length,
        imageurls: downloadURLs,
        imagenames: imageNames,
      }).id;
      testimonials.push({
        content,
        id,
        index: testimonials.length,
        images: downloadURLs,
      });
      setContent("");
      setImages([{ name: "No file chosen" }]);
      setImageNames(["No file chosen"]);
      setDownloadURLs([]);
      setNoImage(false);
    };
    uploadDoc();
  }

  return (
    <div className="page">
      <h1>
        <span
          onClick={() => navigate("/admin/dashboard")}
          style={{ cursor: "pointer" }}
        >
          Admin
        </span>{" "}
        <span style={{ color: "gray" }}>/</span> Testimonials
      </h1>
      {testimonials.map((testimonial) => {
        if (editing && editingId === testimonial.id) {
          return (
            <div key={testimonial.id}>
              <br />
              <Divider />
              <br />
              <ColoredTextField
                label="Testimonial"
                variant="outlined"
                size="small"
                placeholder={editingContent}
                value={editingContent}
                error={editingError}
                helperText={editingError ? "Please enter a testimonial" : ""}
                onChange={(e) => setEditingContent(e.target.value)}
                fullWidth
                required
                multiline
              />
              <div style={{ display: "flex" }}>
                <Button
                  onClick={updateTestimonial}
                  style={{
                    color: "#547c94",
                    borderColor: "#547c94",
                    marginTop: "20px",
                    height: "40px",
                  }}
                  variant="outlined"
                >
                  Update
                </Button>
                <Button
                  onClick={() => setEditing(false)}
                  style={{
                    color: "#547c94",
                    borderColor: "#547c94",
                    marginTop: "20px",
                    marginLeft: "20px",
                    height: "40px",
                  }}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </div>
            </div>
          );
        } else {
          return (
            <div key={testimonial.id}>
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
                        setEditingId(testimonial.id);
                        setEditingContent(testimonial.content);
                      }}
                    >
                      <EditRoundedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => {
                        setOpenDeletingResponse(true);
                        setDeletingResponse(testimonial);
                      }}
                    >
                      <DeleteRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <p style={{ whiteSpace: "pre-wrap" }}>{testimonial.content}</p>
                {testimonial.imageurls.map((image) => {
                  return (
                    <img
                      src={image}
                      alt="testimonial"
                      style={{ width: "100px", height: "auto" }}
                    />
                  );
                })}
              </div>
            </div>
          );
        }
      })}
      <br />
      <Divider />
      <br />
      <ColoredTextField
        label="Testimonial"
        variant="outlined"
        size="small"
        value={content}
        error={error}
        helperText={error ? "Please enter a testimonial" : ""}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        required
        multiline
        minRows={4}
      />
      <div style={{ display: "flex", marginTop: "20px" }}>
        <Button
          variant="outlined"
          component="label"
          style={{ color: "#547c94", borderColor: "#547c94", height: "40px" }}
        >
          Upload Images
          <input
            type="file"
            onChange={(event) => {
              setImages(event.target.files);
              getImageNames(event.target.files);
            }}
            hidden
            multiple
          />
        </Button>
        <p>&nbsp;&nbsp;{imageNames.join(", ")}</p>
      </div>
      <Button
        onClick={addTestimonial}
        style={{
          color: "#547c94",
          borderColor: "#547c94",
          marginTop: "20px",
          height: "40px",
        }}
        variant="outlined"
      >
        Submit
      </Button>
      <Dialog
        open={openDeletingResponse}
        onClose={() => setOpenDeletingResponse(false)}
      >
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. This will permanently delete this
            sponsor.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeletingResponse(false)}
            variant="outlined"
            style={{ color: "#547c94", borderColor: "#547c94" }}
          >
            Cancel
          </Button>
          <Button onClick={deleteTestimonial} variant="outlined" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
