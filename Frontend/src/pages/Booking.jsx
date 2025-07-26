import React, { useState, useEffect } from "react";
import abc from "../images/abc.jpg";
import * as CONSTANT from "../Constant/constant";

const Booking = () => {
  const [Grounds, setGrounds] = useState([]);

  useEffect(() => {
    window.localStorage.removeItem("groundID");
    window.localStorage.removeItem("groundName");
    getAllGround();
  });

  const getAllGround = async () => {
    await CONSTANT.API.get("/ground/test").then((res) => {
      setGrounds(res.data);
    });
  };
  
  const Bookingg2 = (e) => {
    // e.preventDefault();
    window.location.replace("/Booking2");
  };

  const [filter, setFilter] = useState("");
  const searchText = (event) => {
    setFilter(event.target.value);
  };

  return (
    <section className="search-grounds-section">
    <div className="grounds-container">
      <div className="search-box-wrapper">
        <h3 className="search-heading">Find Ground for Booking</h3>
        <div className="search-input-wrapper">
          <input
            placeholder="Search a Ground for Booking"
            type="search"
            id=""
            onChange={searchText.bind(this)}
            className="ground-search-input"
          />
          <i className="search-icon fa fa-search"></i>
        </div>
      </div>

      <div className="grounds-grid-container">
        {Grounds.map((item, index) => {
          return (
            <div
              className="ground-item-wrapper"
              key={index}
              onClick={() => {
                window.localStorage.setItem("groundID", item._id);
                window.localStorage.setItem("groundName", item.name);
              }}
            >
              <div className="ground-card-item">
                <div className="ground-image-wrapper">
                  <img
                    src={item.imgURL ? item.imgURL : abc}
                    alt={item.name}
                    className="ground-thumbnail"
                  />
                </div>
                <div className="ground-details-container">
                  <h4 className="ground-title">{item.name}</h4>
                  <h4 className="location-label">Location</h4>
                  <p className="address-text">{item.address}</p>
                  <button className="book-ground-btn" onClick={Bookingg2}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
  );
};
export default Booking;
