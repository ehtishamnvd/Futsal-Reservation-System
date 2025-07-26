import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Menu from "../pages/Menu";
import Home from "../pages/Home";
import Groundsfrontpage from "../pages/Groundsfrontpage";
import Teamfrontpages from "../pages/Teamfrontpages";
import Academydisplaypage from "../pages/Academydisplaypage";
import Login from "../pages/Login";
import Login2 from "../pages/Login2";
import Mylogin from "../pages/Mylogin";
import Footer from "../pages/Footer";
import Teamform from "../pages/Teamform";
import Groundform from "../pages/Groundform";
import Groundprofile from "../pages/Groundprofile";
import Academyform from "../pages/Academyform";
import Academyfrontpage from "../pages/Academyfrontpage";
import Donation from "../pages/Donation";
import Donationform from "../pages/Donationform";
import Profile from "../pages/Profile";
import Booking from "../pages/Booking";
import Booking2 from "../pages/Booking2";
import VisitorProfile from "../pages/VisitorProfile.jsx";
import VisitorGroundProfile from "../pages/VisitorGroundProfile";
import AcademyUsers from "../pages/AcademyUsers";
import { useSelector } from "react-redux";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

function Routes() {
  const storedTeamId = localStorage.getItem("teamId");
  const reduxTeamId = useSelector((state) => state?.teamSlice?.teamId);
  const teamId = storedTeamId || reduxTeamId;
  console.log("teamId", teamId);
  
  const storedGroundId = localStorage.getItem("groundId");
  const reduxGroundId = useSelector((state) => state?.groundSlice?.groundId);
  const groundId = storedGroundId || reduxGroundId;
  console.log("groundId", groundId);

  const [teamlogin, setTeamLogin] = useState({});
  const [groundlogin, setGroundLogin] = useState({});
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <Router>
      <Menu />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/donation">
          <Donation />
        </Route>
        <Route path="/donationform">
          <Donationform />
        </Route>
        <Route path="/academyuser">
          <AcademyUsers />
        </Route>
        <Route path="/visitorprofile">
          <VisitorProfile />
        </Route>
        <Route path="/visitorgroundprofile">
          <VisitorGroundProfile />
        </Route>
        <Route path="/academies">
          <Academyfrontpage />
        </Route>
        <Route path="/academydisplaypage">
          <Academydisplaypage />
        </Route>
        <Route path="/grounds">
          <Groundsfrontpage />
        </Route>
        <Route eaxct path="/teams">
          <Teamfrontpages />
        </Route>
        <Route path="/booking">
          {teamId || groundId ? <Booking /> : <Login setTeamLogin={setTeamLogin} />}
        </Route>
        {/* <Route eaxct path="/booking">
          <Booking />
        </Route> */}
        <Route path="/booking2">
          <Booking2 />
        </Route>
        <Route path="/teamform">
          <Teamform />
        </Route>
        <Route path="/groundform">
          <Groundform />
        </Route>
        <Route path="/academyform">
          <Academyform />
        </Route>
        <Route path="/mylogin">
          <Mylogin />
        </Route>

        <Route path="/groundprofile">
          {groundId ? (
            <Groundprofile setGroundLogin={setGroundLogin} />
          ) : (
            <Login2 setGroundLogin={setGroundLogin} />
          )}
        </Route>
        <Route path="/login2">
          <Login2 setGroundLogin={setGroundLogin} />
        </Route>

        <Route path="/profile">
          {teamId ? (
            <Profile setTeamLogin={setTeamLogin} />
          ) : (
            <Login setTeamLogin={setTeamLogin} />
          )}
        </Route>
        <Route path="/login">
          <Login setTeamLogin={setTeamLogin} />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
