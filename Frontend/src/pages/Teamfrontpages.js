import React, { useState, useEffect } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Teamform from "./Teamform";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from ".//firebase";

import * as CONSTANT from "../Constant/constant";

function Teamfrontpages() {
  //getting teams from redux
  //const team = useSelector((state) => state?.utilitySlice?.teamData);
  const history = useHistory();
  const [team, setTeams] = useState([]);
  const [OnlineUser, setOnlineUser] = useState(null);
  const [from, setFrom] = useState(null);

  useEffect(() => {
    window.localStorage.removeItem("visitorID");
    window.localStorage.removeItem("visitordpUrl");
    window.localStorage.removeItem("visitorcoverUrl");
    window.localStorage.removeItem("visitiorName");

    setOnlineUser(window.localStorage.getItem("email"));
    setFrom(window.localStorage.getItem("from"));
    getAllTeams();
  });

  const getAllTeams = () => {
    CONSTANT.API.get("/team/test").then((res) => {
      setTeams(res.data);
    });
  };

  const ProfileView = (email, id, teamName) => {
    if (OnlineUser == email && from == "team") {
      history.push("/profile");
    } else {
      window.localStorage.setItem("visitorID", id);
      window.localStorage.setItem("visitiorName", teamName);
      history.push("/visitorprofile");
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: "url('./images/teampicfrontmain.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          padding: "40px 0",
          overflow: "auto",
          marginTop: "70px",
        }}
      >
        <div
          className="bg-white bg-opacity-25 p-4 rounded shadow"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            width: "90%",
            maxWidth: "550px",
            maxHeight: "80vh",
            overflowY: "auto",
            marginTop: "-400px",
          }}
        >
          <input
            type="text"
            placeholder="Search Team by Name"
            className="form-control mb-4 p-3"
            style={{
              padding: "40px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
            id="teamgroundsearch"
          />

          <ul className="list-group">
            {team &&
              team.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center mb-2"
                  style={{
                    cursor: "pointer",
                    // borderRadius: "10px",
                    // backgroundColor: "rgba(255, 255, 255, 0.9)",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                  id="teamgroundpageul"
                  onClick={() => ProfileView(item.email, item._id, item.name)}
                >
                  <span>
                    <GroupsIcon style={{ marginRight: "10px" }} />
                    <strong>{item.name}</strong>
                  </span>
                  <ArrowDropDownIcon />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Teamfrontpages;
