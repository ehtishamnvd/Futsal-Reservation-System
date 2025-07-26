import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { storage } from ".//firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import * as CONSTANT from "../Constant/constant";
import MapComponent from "./mapComponent";

function VisitorGroundprofile() {
  const history = useHistory();

  // Get ground ID from local storage
  const groundId = localStorage.getItem("visitorID");

  // A single state to hold all information for the ground being viewed
  const [groundInfo, setGroundInfo] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If there's no ID, we can't fetch anything.
    if (!groundId) {
      setLoading(false);
      return;
    }

    // Function to fetch all ground details from the backend
    const getGroundDetails = async () => {
      try {
        const res = await CONSTANT.API.get(`/ground/profile/${groundId}`);
        if (res.data && !res.data.message) {
          // Set the entire fetched ground object into our state
          setGroundInfo(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch ground details:", error);
      }
    };

    // Function to fetch timeline images from Firebase
    const getTimelineImages = () => {
      const imageListRef = ref(storage, `groundtimeline/${groundId}`);
      listAll(imageListRef).then((response) => {
        const promises = response.items.map((item) => getDownloadURL(item));
        Promise.all(promises).then((urls) => {
          setImageList(urls.reverse()); // Show newest first
        });
      });
    };

    // Run both fetch operations in parallel for faster loading
    Promise.all([getGroundDetails(), getTimelineImages()]).finally(() => {
      setLoading(false);
    });
  }, [groundId]); // This effect re-runs if the visitorID changes

  // Display a loading message while data is being fetched
  if (loading) {
    return <div className="text-center p-5"><h1>Loading Profile...</h1></div>;
  }

  // Display a message if the ground could not be found
  if (!groundInfo) {
    return <div className="text-center p-5"><h1>Ground not found.</h1></div>;
  }

    // **THE FIX: Add this function to handle the button click**
  const handleGetDirections = () => {
    if (groundInfo && groundInfo.lat && groundInfo.lng) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${groundInfo.lat},${groundInfo.lng}`;
      window.open(url, "_blank");
    } else {
      alert("Location coordinates are not available for this ground.");
    }
  };

  if (loading) {
    return <div className="text-center p-5"><h1>Loading Profile...</h1></div>;
  }

  if (!groundInfo) {
    return <div className="text-center p-5"><h1>Ground not found.</h1></div>;
  }

  // Once loaded, render the full profile
  return (
    <div className="ground-page">
      {/* Hero Section with Cover Photo */}
      <div className="ground-hero-section">
        <div className="ground-cover-container">
          {/* **THE FIX**: This now correctly uses groundInfo.coverURL */}
          {groundInfo.coverURL ? (
            <img src={groundInfo.coverURL} className="ground-cover-image" alt="Cover" />
          ) : (
            <div className="ground-cover-placeholder">
              <span>{groundInfo.name}</span>
            </div>
          )}
        </div>
      </div>

      <div className="container ground-content-container">
        <div className="row">
          {/* Left Column */}
          <div className="col-md-4">
            {/* Profile Card */}
            <div className="ground-profile-card">
              <div className="ground-dp-section">
                <div className="ground-dp-container">
                  {/* Use groundInfo.imgURL for the logo */}
                  {groundInfo.imgURL ? (
                    <img src={groundInfo.imgURL} className="ground-dp-image" alt="Logo" />
                  ) : (
                    <div className="ground-dp-placeholder">
                      <i className="bi bi-shield-shaded"></i>
                    </div>
                  )}
                </div>
              </div>
              <div className="ground-info-section">
                <h1 className="ground-name">{groundInfo.name}</h1>
                <p className="ground-description">
                  Owned by: {groundInfo.ownername}
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
                    onClick={() => history.push("/academyuser", { groundName: groundInfo.name })}
                  >
                    <i className="bi bi-trophy me-2"></i>Academy
                  </button>

                  <button
                    className="btn btn-success"
                    onClick={handleGetDirections}
                  >
                    <i className="bi bi-geo-alt-fill me-2"></i>Get Directions
                  </button>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="ground-profile-card mt-4">
              <div className="ground-info-section">
                <h2 className="ground-timeline-title">
                  <i className="bi bi-geo-alt-fill me-2"></i>Location
                </h2>
                <p className="ground-description">{groundInfo.address}</p>
                <MapComponent address={groundInfo.address} lat={groundInfo.lat} lng={groundInfo.lng} />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-md-8">
            <div className="ground-timeline-section">
              <div className="ground-timeline-header">
                <h2 className="ground-timeline-title">
                  <i className="bi bi-images me-2"></i>Ground Timeline
                </h2>
              </div>
              <div className="ground-timeline-gallery">
                <div className="row g-3">
                  {imageList.length > 0 ? (
                    imageList.map((url, index) => (
                      <div key={index} className="col-lg-6 col-md-12">
                        <div className="ground-gallery-item">
                          <img src={url} className="ground-gallery-image" alt="Timeline" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="ground-empty-gallery col-12">
                      <div className="text-center p-5">
                        <i className="bi bi-camera-fill ground-empty-icon"></i>
                        <h4>No Images in Timeline</h4>
                        <p>This ground has not uploaded any timeline photos yet.</p>
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

export default VisitorGroundprofile;
