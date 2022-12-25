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

export function AdminSponsors() {
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [imageUpload, setImageUpload] = useState({ name: "No file chosen" });
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [editingName, setEditingName] = useState("");
  const [editingUrl, setEditingUrl] = useState("");
  const [editingImageUpload, setEditingImageUpload] = useState({
    name: "No file chosen",
  });

  useEffect(() => {
    const getResponses = async () => {
      const data = await getDocs(collection(db, "sponsors"));
      setResponses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getResponses();
  }, []);

  responses.sort(function (first, second) {
    return first.name.localeCompare(second.name);
  });

  function addSponsor() {
    if (imageUpload.name === "No file chosen") return;

    const imageRef = ref(
      storage,
      `sponsors/${Math.round(Math.random() * 10000000000).toString()}`
    );

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((imageurl) => {
        const upload = async () => {
          await addDoc(collection(db, "sponsors"), {
            name: name,
            url: url,
            imagename: imageUpload.name,
            imageurl: imageurl,
          });
        };
        upload().then(() => {
          setResponses([
            ...responses,
            { name: name, url: url, imagename: imageUpload.name, imageurl: imageurl },
          ]);
          setName("");
          setUrl("");
          setImageUpload({ name: "No file chosen" });}
        );
      });
    });
  }

  const [openDeletingResponse, setOpenDeletingResponse] = useState(false);
  const [deletingResponse, setDeletingResponse] = useState({});

  function deleteSponsor() {
    deleteObject(ref(storage, deletingResponse.imageurl))
      .then(() => {
        const upload = async () => {
          await deleteDoc(doc(db, "sponsors", deletingResponse.id));
          setOpenDeletingResponse(false);
          setResponses(responses.filter((r) => r.id !== deletingResponse.id));
        };
        upload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateSponsor() {
    if (editingImageUpload.type !== undefined) {
      const imageRef = ref(
        storage,
        `sponsors/${Math.round(Math.random() * 10000000000).toString()}`
      );

      uploadBytes(imageRef, editingImageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((imageurl) => {
          const upload = async () => {
            await updateDoc(doc(db, "sponsors", editingId), {
              name: editingName,
              url: editingUrl,
              imagename: editingImageUpload.name,
              imageurl: imageurl,
            });
            setResponses(
              responses.map((r) => {
                if (r.id === editingId) {
                  deleteObject(ref(storage, r.imageurl))
                    .then(() => {
                      return {
                        name: editingName,
                        url: editingUrl,
                        imagename: { name: editingImageUpload.name },
                        imageurl: imageurl,
                        id: editingId,
                      };
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                } else {
                  return r;
                }
              })
            );
            setEditing(false);
            setEditingName("");
            setEditingUrl("");
            setEditingImageUpload({ name: "No file chosen" });
          };
          upload();
        });
      });
    } else {
      const upload = async () => {
        await updateDoc(doc(db, "sponsors", editingId), {
          name: editingName,
          url: editingUrl,
        });
        setResponses(
          responses.map((r) => {
            if (r.id === editingId) {
              return {
                name: editingName,
                url: editingUrl,
                imagename: r.imagename,
                imageurl: r.imageurl,
                id: editingId,
              };
            } else {
              return r;
            }
          })
        );
        setEditing(false);
        setEditingName("");
        setEditingUrl("");
        setEditingImageUpload({ name: "No file chosen" });
      };
      upload();
    }
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
        <span style={{ color: "gray" }}>/</span> Sponsors
      </h1>
      <br />
      <Divider />
      <br />
      {responses.map((response) => {
        if (editing && response.id === editingId) {
          return (
            <>
              <div style={{ display: "flex" }}>
                <ColoredTextField
                  label="Name"
                  placeholder={editingName}
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  size="small"
                />
                <ColoredTextField
                  label="URL"
                  placeholder={editingUrl}
                  value={editingUrl}
                  onChange={(e) => setEditingUrl(e.target.value)}
                  style={{ marginLeft: "10px" }}
                  size="small"
                />
                <div
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  <Button
                    variant="outlined"
                    component="label"
                    style={{
                      color: "#547c94",
                      borderColor: "#547c94",
                      height: "40px",
                    }}
                  >
                    Upload Thumbnail
                    <input
                      type="file"
                      onChange={(event) => {
                        setEditingImageUpload(event.target.files[0]);
                      }}
                      hidden
                    />
                  </Button>
                  <p style={{ marginTop: "5px" }}>{editingImageUpload.name}</p>
                </div>
                <Button
                  onClick={updateSponsor}
                  style={{
                    color: "#547c94",
                    borderColor: "#547c94",
                    marginLeft: "10px",
                    height: "40px",
                  }}
                  variant="outlined"
                >
                  Update
                </Button>
              </div>
              <br />
              <Divider />
              <br />
            </>
          );
        } else {
          return (
            <>
              <div
                key={response.id}
                style={{ position: "relative", display: "flex" }}
              >
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
                        setEditingId(response.id);
                        setEditingName(response.name);
                        setEditingUrl(response.url);
                        setEditingImageUpload({
                          name: response.imagename,
                        });
                      }}
                    >
                      <EditRoundedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => {
                        setOpenDeletingResponse(true);
                        setDeletingResponse(response);
                      }}
                    >
                      <DeleteRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <div>
                  <h2>{response.name}</h2>
                  <a href={response.url}>{response.url}</a>
                </div>
                <img
                  src={response.imageurl}
                  alt="sponsor"
                  style={{ height: "50px", marginLeft: "10px" }}
                />
              </div>
              <br />
              <Divider />
              <br />
            </>
          );
        }
      })}
      <div style={{ display: "flex" }}>
        <ColoredTextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          size="small"
        />
        <ColoredTextField
          label="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ marginLeft: "10px" }}
          size="small"
        />
        <div
          style={{
            marginLeft: "10px",
          }}
        >
          <Button
            variant="outlined"
            component="label"
            style={{
              color: "#547c94",
              borderColor: "#547c94",
              height: "40px",
            }}
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
          <p style={{ marginTop: "5px" }}>{imageUpload.name}</p>
        </div>
        <Button
          onClick={addSponsor}
          style={{
            color: "#547c94",
            borderColor: "#547c94",
            marginLeft: "10px",
            height: "40px",
          }}
          variant="outlined"
        >
          Add
        </Button>
      </div>
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
          <Button onClick={deleteSponsor} variant="outlined" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
