import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import axios from "axios";
import * as CONTANT from "../Constant/constant.js";

import { useHistory } from "react-router-dom";
import { fontSize } from "@mui/system";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storage } from ".//firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";
import { useDispatch } from "react-redux";
import {
  setTeamId,
  setAddress,
  setCaptainName,
  setEmail,
  setPhone,
  setTeamName,
} from "../redux/slices/teamSlice";
import { getStorage, deleteObject } from "firebase/storage";
import "../timeline.css";
import { Link } from "react-router-dom/cjs/react-router-dom.js";

// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";

function Profile() {
  const storagee = getStorage();
  const dispatch = useDispatch();
  const { localStorage } = window;
  const userEmail = useSelector((state) => state?.utilitySlice?.userEmail);

  const storedTeamId = localStorage.getItem("teamId");
  const reduxTeamId = useSelector((state) => state?.teamSlice?.teamId);
  const teamId = storedTeamId || reduxTeamId;
  console.log("teamId", teamId);

  const storedTeamName = localStorage.getItem("teamname");
  const reduxTeamName = useSelector((state) => state?.teamSlice?.teamname);
  const team = storedTeamName || reduxTeamName;
  console.log("team", team);

  //Dp
  const [dp_Url, setDpUrl] = useState(localStorage.getItem("dpUrl"));
  const [dpUpload, setDpUpload] = useState(null);
  const [url3, setUrl3] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setDpUrl(localStorage.getItem("dpUrl"));
      getAllStatus();
    }, 1000);
  }, [dp_Url]);

  const uploadDp = () => {
    if (dpUpload == null) return;
    // const dpRef = ref(storage, `teamdp/${dpUpload.name + v4()}`)
    const dpRef = ref(storage, `teamdp/${teamId}`);
    // const dpRef = ref(storage, `teamdp/${}`)
    uploadBytes(dpRef, dpUpload)
      .then(() => {
        getDownloadURL(dpRef)
          .then((url3) => {
            setDpUrl(url3);
            window.localStorage.setItem("dpUrl", url3);
            CONTANT.API.post("/team/dp", { _id: teamId, imgURL: url3 });
          })
          .catch((error) => {
            console.log(error.message, "error getting while uploading");
          });
        setDpUpload(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //Cover
  const [cover_Url, setCoverUrl] = useState(localStorage.getItem("coverUrl"));
  const [coverUpload, setCoverUpload] = useState(null);
  const [url2, setUrl2] = useState(null);
  useEffect(() => {
    getAllStatus();
  });
  useEffect(() => {
    setTimeout(() => {
      setCoverUrl(localStorage.getItem("coverUrl"));

      getAllStatus();
    }, 1000);
  }, [cover_Url]);

  const uploadCover = () => {
    if (coverUpload == null) return;
    const coverRef = ref(storage, `teamcover/${teamId}`);
    uploadBytes(coverRef, coverUpload)
      .then(() => {
        getDownloadURL(coverRef)
          .then((url2) => {
            setCoverUrl(url2);
            window.localStorage.setItem("coverUrl", url2);
          })
          .catch((error) => {
            console.log(error.message, "error getting while uploading");
          });
        setCoverUpload(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //Delete Cover
  const Deletecover = () => {
    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(storage, `teamcover/${teamId}`);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        window.localStorage.removeItem("coverUrl");
        setCoverUrl();
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  //Delete Dp
  const Deletedp = () => {
    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(storage, `teamdp/${teamId}`);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        window.localStorage.removeItem("dpUrl");
        setDpUrl();
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
    // window.location.reload(false);
  };

  //Status
  const [status, setStatus] = useState("");
  const [statusArray, setStatusArray] = useState([]);
  const getAllStatus = async () => {
    const response = await CONTANT.API.get(`/team/getStatus/${teamId}`);

    if (response?.data) {
      setStatusArray(response.data.statusArray.reverse());
    }
  };

  //Timeline

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [imagePath, setImagePath] = useState([]);
  const imageListRef = ref(storage, `teamtimeline/${teamId}`);

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(
      storage,
      `teamtimeline/${teamId}/${imageUpload.name + v4()}`
    );
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const list = [...imageList];
        list.unshift(url);
        setImageList(list);
        window.localStorage.setItem("imageList", list);
      });
    });
  };

  const deletePicture = async (e, index) => {
    e.preventDefault();

    const list = [...imageList];
    const paths = [...imagePath];
    const deletePath = paths[index];
    paths.splice(index, 1);
    setImagePath(paths);
    list.splice(index, 1);
    setImageList(list);

    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(storage, deletePath);
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        console.log("Deleted");
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
    window.localStorage.setItem("imageList", list);
  };

  const deleteStatus = (e, index) => {
    e.preventDefault();
    const list = [...statusArray];
    list.splice(index, 1);
    setStatusArray(list);
    const url = list[index];
    console.log(url);
    // let imageRef = storagee.refFromURL(url);
    // imageRef.delete();
    window.localStorage.setItem("statusArray", list);
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        let path = imagePath;
        path.push(item.fullPath);
        setImagePath([...path]);

        getDownloadURL(item).then((url) => {
          let AllURL = imageList;
          AllURL.push(url);
          setImageList([...AllURL]);
        });
      });
    });
  }, []);

  const logout = () => {
    const { localStorage } = window;
    localStorage.clear();
    dispatch(setTeamId(""));
    dispatch(setTeamName(""));
    dispatch(setCaptainName(""));
    dispatch(setEmail(""));
    dispatch(setPhone(""));
    dispatch(setAddress(""));
  };

  const addStatus = async () => {
    const list = [...statusArray];
    list.unshift(status);
    setStatusArray(list);
    window.localStorage.setItem("statusArray", list);
    const response = await CONTANT.API.post(`/team/setStatus/${teamId}`, {
      status,
    });
    setStatus("");
    console.log(response);
  };

  return (
    <>
      <div className="profile-page bg-light">
        <ToastContainer />

        {/* Header with navigation */}
        {/* <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
          <div className="container">
            <a className="navbar-brand fw-bold" href="#">
              TeamConnect
            </a>
            <button
              className="btn btn-outline-light ms-auto"
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        </nav> */}

        <div className="container mt-3">
          {/* Cover Photo Section */}
          <div className="position-relative mb-5">
            <div className="cover-photo-container rounded shadow">
              {cover_Url ? (
                <a href={cover_Url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={cover_Url}
                    className="cover-photo w-100"
                    alt="Cover"
                  />
                </a>
              ) : (
                <div className="cover-placeholder"></div>
              )}

              <div
                className="cover-photo-controls position-absolute bottom-0 end-0 m-3"
                style={{ zIndex: "99" }}
              >
                <input
                  type="file"
                  id="select-image2"
                  className="d-none"
                  onChange={(event) => {
                    setCoverUpload(event.target.files[0]);
                  }}
                />
                <label htmlFor="select-image2" className="me-2">
                  <span className="btn btn-light btn-sm">
                    <i className="bi bi-file-earmark me-1"></i> Select
                  </span>
                </label>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={uploadCover}
                >
                  <i className="bi bi-cloud-arrow-up-fill me-1"></i>
                </button>
                <button
                  className="btn btn-outline-danger"
                  title="Remove Cover"
                  onClick={Deletecover}
                >
                  <i className="bi bi-trash-fill me-1"></i>
                </button>
              </div>
            </div>

            {/* Profile Picture & Team Info */}
            <div className="profile-header">
              <div className="d-flex align-items-end">
                <div className="profile-picture-container position-relative">
                  {dp_Url ? (
                    <a href={dp_Url} target="_blank" rel="noopener noreferrer">
                      <img
                        src={dp_Url}
                        className="profile-picture rounded-circle border border-4 border-white"
                        alt="Profile"
                        style={{ cursor: "pointer" }}
                      />
                    </a>
                  ) : (
                    <div className="profile-picture-placeholder rounded-circle border border-4 border-white"></div>
                  )}
                  <div className="profile-picture-edit">
                    <input
                      type="file"
                      id="select-image"
                      className="d-none"
                      onChange={(event) => {
                        setDpUpload(event.target.files[0]);
                      }}
                    />
                    <div className="mt-2 d-flex">
                      <label htmlFor="select-image" className="me-2">
                        <span className="btn btn-sm btn-light">
                          <i className="bi bi-file-earmark me-1"></i> Select
                        </span>
                      </label>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={uploadDp}
                      >
                        <i className="bi bi-cloud-arrow-up-fill me-1"></i>{" "}
                        {/* Upload DP */}
                      </button>
                      <button
                        className="btn btn-outline-danger ms-2"
                        onClick={Deletedp}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="ms-3 mb-2">
                  <h1 className="fw-bold team-name">{team}</h1>
                  <div className="mt-2">
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => {
                        window.open("http://localhost:3000", "_blank");
                      }}
                    >
                      <i className="bi bi-chat-dots-fill me-1"></i> Message
                    </button>
                    <button className="btn btn-success">
                      <Link to="/booking">
                        <i className="bi bi-people-fill me-1"></i> Match Up
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Left Column - Status Section */}
            <div className="col-md-5 mb-4">
              <div className="card shadow-sm">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Share an Update</h5>
                </div>
                <div className="card-body">
                  <textarea
                    className="form-control mb-3"
                    rows="3"
                    placeholder="What's on your mind?"
                    onChange={(event) => setStatus(event.target.value)}
                    value={status}
                  ></textarea>
                  <button
                    className="btn btn-primary float-end"
                    onClick={addStatus}
                    type="button"
                  >
                    <i className="bi bi-send-fill me-1"></i> Share
                  </button>
                </div>
              </div>

              {/* Status Posts */}
              {statusArray &&
                statusArray.map((statusText, index) => (
                  <div key={index} className="card shadow-sm my-3 status-card">
                    <div className="card-header bg-white d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        {dp_Url && (
                          <img
                            src={dp_Url}
                            className="status-profile-pic rounded-circle me-2"
                            alt=""
                          />
                        )}
                        <h4 className="mb-0">{team}</h4>
                      </div>
                      {/* <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={(e) => deleteStatus(e, index)}
                      >
                        <i className="bi bi-trash"></i>
                      </button> */}
                    </div>
                    <div className="card-body">
                      <h5 className="card-text">{statusText}</h5>
                    </div>
                    <div className="card-footer bg-white text-muted small">
                      {/* <i className="bi bi-clock me-1"></i> Just now */}
                    </div>
                  </div>
                ))}
            </div>

            {/* Right Column - Timeline Gallery */}
            <div className="col-md-7">
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-white">
                  <h4 className="mb-0">Team Timeline</h4>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">
                      Upload a photo to your timeline
                    </label>
                    <div className="input-group">
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        onChange={(event) => {
                          setImageUpload(event.target.files[0]);
                        }}
                      />
                      <button className="btn btn-primary" onClick={uploadImage}>
                        <i className="bi bi-cloud-arrow-up-fill me-1"></i>{" "}
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Images */}
              <div className="timeline-gallery">
                <div className="row g-3">
                  {imageList &&
                    imageList.map((url, index) => (
                      <div key={index} className="col-md-6 col-lg-4">
                        <div className="card timeline-image-card h-100">
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={url}
                              className="card-img-top timeline-image"
                              alt="Timeline"
                            />
                          </a>
                          <div className="card-body p-2">
                            <button
                              className="btn btn-sm btn-outline-danger w-100"
                              onClick={(e) => deletePicture(e, index)}
                            >
                              <i className="bi bi-trash-fill me-1"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
