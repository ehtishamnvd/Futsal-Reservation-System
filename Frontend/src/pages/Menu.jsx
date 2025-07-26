import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setTeamId,
  setAddress,
  setCaptainName,
  setEmail,
  setPhone,
  setTeamName,
} from ".././redux/slices/teamSlice";

import {
  setGroundId,
  setOwnerName,
  setGroundName,
} from ".././redux/slices/groundSlice";

function Menu() {
  const login = localStorage.getItem("login");
  const dispatch = useDispatch();

  const Logout = () => {
    const { localStorage } = window;
    localStorage.clear();
    window.localStorage.clear();
    dispatch(setTeamId(""));
    dispatch(setTeamName(""));
    dispatch(setCaptainName(""));
    dispatch(setEmail(""));
    dispatch(setPhone(""));
    dispatch(setAddress(""));
    dispatch(setGroundId(""));
    dispatch(setGroundName(""));
    dispatch(setOwnerName(""));
    window.location.replace("/");
  };

  const Login = (e) => {
    window.location.replace("/Mylogin");
  };

  return (
    <>
      <nav className="main-nav">
        <div className="logo">
          <Link to="/">
            <img src="./images/bms.png" alt="Logo" />
          </Link>
        </div>
        <div className="menu-link">
          <ul>
            <li>
              <Link to="/"> Home </Link>{" "}
            </li>
            <li>
              <Link to="/teams"> TEAMS </Link>{" "}
            </li>
            <li>
              <Link to="/grounds"> GROUNDS </Link>
            </li>
            <li>
              <Link to="/academies"> ACADEMY </Link>
            </li>
            <li>
              <Link to="/donation"> DONATION </Link>
            </li>
            <li>
              <Link to="/booking"> BOOKINGS </Link>
            </li>
          </ul>
        </div>

        {/*login button*/}
        <div className="login">
          <a className="cta">
            <button
              className={
                login
                  ? "btn btn-danger btn-lg px-5 py-3"
                  : "btn btn-success btn-lg px-5 py-3"
              }
              onClick={login ? Logout : Login}
            >
              {login ? "Logout" : "Login"}
            </button>
          </a>
        </div>
      </nav>
    </>
  );
}

export default Menu;
