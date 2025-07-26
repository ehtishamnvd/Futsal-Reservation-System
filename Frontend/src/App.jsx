import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Routes from "./routes/Routes";
import Chatbot from "./pages/chatbot";
import {
  setTeamId,
  setTeamName,
  setCaptainName,
  setEmail as setTeamEmail,
  setPhone as setTeamPhone,
  setAddress as setTeamAddress,
} from "./redux/slices/teamSlice";
import {
  setGroundId,
  setGroundName,
  setOwnerName,
  setEmail as setGroundEmail,
  setPhone as setGroundPhone,
  setAddress as setGroundAddress,
  setLat,
  setLng,
} from "./redux/slices/groundSlice";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./chatbot.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInVia = localStorage.getItem("from");

    if (loggedInVia === "team") {
      const teamId = localStorage.getItem("teamId");
      if (teamId) {
        dispatch(setTeamId(teamId));
        dispatch(setTeamName(localStorage.getItem("teamname")));
        dispatch(setCaptainName(localStorage.getItem("captainname")));
        dispatch(setTeamEmail(localStorage.getItem("email")));
        dispatch(setTeamPhone(localStorage.getItem("phone")));
        dispatch(setTeamAddress(localStorage.getItem("address")));
      }
    } else if (loggedInVia === "ground") {
      const groundId = localStorage.getItem("groundId");
      if (groundId) {
        dispatch(setGroundId(groundId));
        dispatch(setGroundName(localStorage.getItem("groundname")));
        dispatch(setOwnerName(localStorage.getItem("ownername")));
        dispatch(setGroundEmail(localStorage.getItem("email")));
        dispatch(setGroundPhone(localStorage.getItem("phone")));
        dispatch(setGroundAddress(localStorage.getItem("address")));
        dispatch(setLat(parseFloat(localStorage.getItem("lat"))));
        dispatch(setLng(parseFloat(localStorage.getItem("lng"))));
      }
    }
  }, [dispatch]);

  return (
    <div>
      <Routes />
      {/* This line USES the imported component, which resolves the warning. */}
      <Chatbot />
    </div>
  );
}

export default App;
