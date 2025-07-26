import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
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
import { useDispatch } from "react-redux";

import { getStorage, deleteObject } from "firebase/storage";
import { Link } from "react-router-dom/cjs/react-router-dom.js";

function Profile() {
  const { localStorage } = window;
  const userEmail = useSelector((state) => state?.utilitySlice?.userEmail);
  const teamId = useSelector((state) => state?.teamSlice?.teamId);
  const [id, setID] = useState(localStorage.getItem("visitorID"));
  const [team, setTeam] = useState(window.localStorage.getItem("visitiorName"));
  const imageListRef = ref(storage, `teamtimeline/${id}`);
  const [imageList, setImageList] = useState([]);
  useEffect(() => {
    setCover();
    setDp();
  });

  useEffect(() => {
    setImageList([]);
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          let AllURL = imageList;
          AllURL.push(url);
          setImageList([...AllURL]);
        });
      });
    });
  }, []);
  //Dp
  const [dp_Url, setDpUrl] = useState(localStorage.getItem("visitordpUrl"));

  useEffect(() => {
    setTimeout(() => {
      setDpUrl(localStorage.getItem("visitordpUrl"));
      getAllStatus();
    }, 1000);
  }, [dp_Url]);

  //Cover
  const [cover_Url, setCoverUrl] = useState(
    localStorage.getItem("visitorcoverUrl")
  );

  useEffect(() => {
    setTimeout(() => {
      setCoverUrl(localStorage.getItem("visitorcoverUrl"));
      getAllStatus();
    }, 1000);
  }, [cover_Url]);

  //Status
  const [statusArray, setStatusArray] = useState([]);

  const getAllStatus = async () => {
    const response = await CONTANT.API.get(`/team/getStatus/${id}`);
    if (response?.data) {
      setStatusArray(response.data.statusArray);
    }
  };
  const setDp = () => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `teamdp/${id}`))
      .then((url) => {
        // setDpUrl(url);
        localStorage.setItem("visitordpUrl", url);
      })
      .catch((err) => console.log(err));
  };
  const setCover = () => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `teamcover/${id}`))
      .then((url) => {
        // setCoverUrl(url);
        localStorage.setItem("visitorcoverUrl", url);
      })
      .catch((err) => console.log(err));
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

              {/* <div
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
            </div> */}
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
                  {/* <div className="profile-picture-edit">
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
                    </button>
                    <button
                      className="btn btn-outline-danger ms-2"
                      onClick={Deletedp}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div> */}
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
              {/* <div className="card shadow-sm">
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
            </div> */}

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
                {/* <div className="card-body">
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
              </div> */}
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
                          {/* <div className="card-body p-2">
                          <button
                            className="btn btn-sm btn-outline-danger w-100"
                            onClick={(e) => deletePicture(e, index)}
                          >
                            <i className="bi bi-trash-fill me-1"></i>
                          </button>
                        </div> */}
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
