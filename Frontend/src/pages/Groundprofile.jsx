import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { storage } from ".//firebase";
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import * as CONSTANT from "../Constant/constant";
import MapComponent from "./mapComponent";

function Groundprofile() {
  const history = useHistory();
  const { groundId, groundname, address, lat, lng } = useSelector(
    (state) => state.groundSlice
  );

  const [dpUpload, setDpUpload] = useState(null);
  const [coverUpload, setCoverUpload] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [dp_Url, setDpUrl] = useState(localStorage.getItem("dpUrl"));
  const [cover_Url, setCoverUrl] = useState(localStorage.getItem("coverUrl"));
  const [imageList, setImageList] = useState([]);

  const uploadDp = () => {
    if (!dpUpload || !groundId) return;
    const dpRef = ref(storage, `grounddp/${groundId}`);
    uploadBytes(dpRef, dpUpload).then(() => {
      getDownloadURL(dpRef).then((url) => {
        setDpUrl(url);
        window.localStorage.setItem("dpUrl", url);
        CONSTANT.API.post("/ground/dp", { _id: groundId, imgURL: url });
      });
    });
  };

  // **THE FIX: This function now correctly calls the /ground/cover endpoint**
  const uploadCover = () => {
    if (!coverUpload || !groundId) return;
    const coverRef = ref(storage, `groundcover/${groundId}`);
    
    console.log("Starting cover photo upload to Firebase...");
    uploadBytes(coverRef, coverUpload).then(() => {
      getDownloadURL(coverRef).then((url) => {
        console.log("Firebase upload successful. Got URL:", url);
        console.log("Sending URL to backend to save in database...");

        setCoverUrl(url);
        window.localStorage.setItem("coverUrl", url);
        
        // This API call saves the URL to the database
        CONSTANT.API.post("/ground/cover", { _id: groundId, coverURL: url })
          .then(response => console.log("Backend response:", response.data.message))
          .catch(err => console.error("Error posting to backend:", err));
      });
    });
  };

  const uploadImage = () => {
    if (!imageUpload || !groundId) return;
    const imageRef = ref(storage, `groundtimeline/${groundId}/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [url, ...prev]);
      });
    });
  };

  const deletePicture = (urlToDelete) => {
    const imageRef = ref(storage, urlToDelete);
    deleteObject(imageRef)
      .then(() => {
        setImageList((prev) => prev.filter((url) => url !== urlToDelete));
      })
      .catch((error) => console.error("Error deleting file:", error));
  };

  useEffect(() => {
    if (groundId) {
      const imageListRef = ref(storage, `groundtimeline/${groundId}`);
      listAll(imageListRef).then((response) => {
        const promises = response.items.map((item) => getDownloadURL(item));
        Promise.all(promises).then((urls) => {
          setImageList(urls.reverse());
        });
      });
    }
  }, [groundId]);

    const handleGetDirections = () => {
    if (lat && lng) {
      // Construct the Google Maps URL with the destination coordinates
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      // Open the URL in a new browser tab
      window.open(url, "_blank");
    } else {
      alert("Location coordinates are not available for this ground.");
    }
  };
  
  return (
    <div className="ground-page">
      <div className="ground-hero-section">
        <div className="ground-cover-container">
          {cover_Url ? (
            <img src={cover_Url} className="ground-cover-image" alt="Cover" />
          ) : (
            <div className="ground-cover-placeholder">
              <span>Add a cover photo for your ground</span>
            </div>
          )}
          <div className="ground-cover-controls">
            <input
              type="file"
              id="select-cover"
              className="ground-file-input"
              onChange={(e) => setCoverUpload(e.target.files[0])}
            />
            <label htmlFor="select-cover" className="btn btn-outline-light btn-sm">
              <i className="bi bi-image me-1"></i> Select
            </label>
            <button className="btn btn-success btn-sm" onClick={uploadCover}>
              <i className="bi bi-cloud-arrow-up-fill me-1"></i> Upload
            </button>
          </div>
        </div>
      </div>
      <div className="container ground-content-container">
        <div className="row">
          <div className="col-md-4">
            <div className="ground-profile-card">
              <div className="ground-dp-section">
                <div className="ground-dp-container">
                  {dp_Url ? (
                    <img src={dp_Url} className="ground-dp-image" alt="Logo" />
                  ) : (
                    <div className="ground-dp-placeholder">
                      <i className="bi bi-shield-shaded"></i>
                    </div>
                  )}
                </div>
                <div className="ground-dp-controls">
                  <input
                    type="file"
                    id="select-dp"
                    className="ground-file-input"
                    onChange={(e) => setDpUpload(e.target.files[0])}
                  />
                  <label htmlFor="select-dp" className="btn btn-outline-dark btn-sm">
                    <i className="bi bi-person-bounding-box me-1"></i> Select
                  </label>
                  <button className="btn btn-primary btn-sm" onClick={uploadDp}>
                    <i className="bi bi-cloud-arrow-up-fill me-1"></i> Upload
                  </button>
                </div>
              </div>
              <div className="ground-info-section">
                <h1 className="ground-name">{groundname}</h1>
                <p className="ground-description">
                  Best Ground in Twin Cities.
                  <br />
                  Here to achieve your dreams.
                </p>
                <div className="ground-action-buttons">
                  <button
                    className="btn btn-primary"
                    onClick={() => window.open("http://localhost:3001/", "_blank")}
                  >
                    <i className="bi bi-chat-dots-fill me-2"></i>Message
                  </button>
                  <Link to="/booking" className="btn btn-info">
                    <i className="bi bi-calendar-check me-2"></i>Bookings
                  </Link>
                  <button
                    className="btn btn-secondary"
                    onClick={() => history.push("/academyuser", { groundName: groundname })}
                  >
                    <i className="bi bi-trophy me-2"></i>Academy
                  </button>
                </div>
              </div>
            </div>
            <div className="ground-profile-card mt-4">
              <div className="ground-info-section">
                <h2 className="ground-timeline-title">
                  <i className="bi bi-geo-alt-fill me-2"></i>Location
                </h2>
                <p className="ground-description">{address}</p>
                <MapComponent address={address} lat={lat} lng={lng} />
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="ground-timeline-section">
              <div className="ground-timeline-header">
                <h2 className="ground-timeline-title">
                  <i className="bi bi-images me-2"></i>Ground Timeline
                </h2>
                <div className="ground-timeline-upload">
                  <input
                    type="file"
                    id="timeline-image-upload"
                    className="ground-file-input"
                    onChange={(e) => setImageUpload(e.target.files[0])}
                  />
                  <label htmlFor="timeline-image-upload" className="btn btn-outline-dark">
                    <i className="bi bi-file-earmark-image me-1"></i> Select Photo
                  </label>
                  <button className="btn btn-success" onClick={uploadImage}>
                    <i className="bi bi-cloud-arrow-up-fill me-1"></i> Add to Timeline
                  </button>
                </div>
              </div>
              <div className="ground-timeline-gallery">
                <div className="row g-3">
                  {imageList.length > 0 ? (
                    imageList.map((url, index) => (
                      <div key={index} className="col-lg-6 col-md-12">
                        <div className="ground-gallery-item">
                          <img src={url} className="ground-gallery-image" alt="Timeline" />
                          <div className="ground-gallery-actions">
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deletePicture(url)}
                            >
                              <i className="bi bi-trash me-1"></i> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="ground-empty-gallery col-12">
                      <div className="text-center p-5">
                        <i className="bi bi-camera-fill ground-empty-icon"></i>
                        <h4>No Images in Timeline</h4>
                        <p>Upload your first image to build your ground's timeline.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Groundprofile;
