import React, { useState, useEffect } from "react";
import Teamform from "./Teamform";
import { Link } from "react-router-dom";
import axios from "axios";
import * as CONSTANT from "../Constant/constant.js";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setTeamId,
  setAddress,
  setCaptainName,
  setEmail,
  setPhone,
  setTeamName,
} from "../redux/slices/teamSlice";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { Typography } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setTeamLogin }) => {
  const teamId = useSelector((state) => state?.teamSlice.teamId);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    window.localStorage.removeItem("dpUrl");
    window.localStorage.removeItem("coverUrl");
  }, []);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  //Snackbar
  const [snackBarstate, setSnackBar] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    type: "success",
    message: "",
  });
  const { vertical, horizontal, open } = snackBarstate;
  const handleCloseSnackBar = () => {
    setSnackBar({ ...snackBarstate, open: false });
  };

  const inputEvent2 = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setUser({ ...user, [name]: value });
  };

  const onSubmits = (event) => {
    event.preventDefault();
  };

  const { localStorage } = window;

  const setTeamData = (res) => {
    localStorage.setItem("teamId", res.data.team._id);
    localStorage.setItem("teamname", res.data.team.name);
    localStorage.setItem("captainname", res.data.team.captainName);
    localStorage.setItem("email", res.data.team.email);
    localStorage.setItem("phone", res.data.team.phone);
    localStorage.setItem("address", res.data.team.address);
    localStorage.setItem("from", "team");
    localStorage.setItem("login", true);
    setDpUrl(res.data.team._id);
    setCoverUrl(res.data.team._id);

    dispatch(setTeamId(res.data.team._id));
    dispatch(setTeamName(res.data.team.name));
    dispatch(setCaptainName(res.data.team.captainName));
    dispatch(setEmail(res.data.team.email));
    dispatch(setPhone(res.data.team.phone));
    dispatch(setAddress(res.data.team.address));
  };

  const setDpUrl = (teamId) => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `teamdp/${teamId}`))
      .then((url) => {
        console.log("DP URL: ", url);
        localStorage.setItem("dpUrl", url);
      })
      .catch((err) => console.log(err));
  };

  const setCoverUrl = (teamId) => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `teamcover/${teamId}`))
      .then((url) => {
        console.log("Cover URL: ", url);
        localStorage.setItem("coverUrl", url);
      })
      .catch((err) => console.log(err));
  };

  const login = () => {
    CONSTANT.API.post("/team/login", user).then((res) => {
      //localStorage.setItem("id",res.data.team._id)
      if (res.data.message == "Login Successsfully") {
        console.log(res.data);
        setTeamData(res);

        setTeamLogin(res.data.team);

        setSnackBar({
          ...snackBarstate,
          type: "success",
          message: "Success: Login Successfully ",
          open: true,
        });
        toast.success("Login Successfully");
        history.push("/profile");
      } else {
        alert(res.data.message);
      }
    });
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: "url('./images/loginpic.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh", 
          position: "absolute",
          width: "100%",
          marginTop: "70px", 
          paddingTop: "40px",
          paddingBottom: "40px",
          zIndex: "-100",
        }}
      >
        {/* Centered Form Box */}
        <div
          className="bg-white bg-opacity-25 p-5 rounded shadow"
          style={{ width: "100%", maxWidth: "420px", marginLeft: "430px" }}
        >
          <form id="teamform" onSubmit={onSubmits}>
            <h3 className="text-secondary fw-bold mb-4 text-center">
              Sign In as Team
            </h3>

            <div className="mb-3" style={{marginTop:"30px"}}>
              <input
                type="text"
                name="email"
                placeholder="Enter Your Email"
                onChange={inputEvent2}
                value={user.email}
                className="form-control form-control-lg p-3 shadow-sm"
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={inputEvent2}
                value={user.password}
                className="form-control form-control-lg p-3 shadow-sm"
              />
            </div>

            <p className="text-end mb-2">
              <a href="#" className="text-decoration-none text-primary">
                Forgot Password?
              </a>
            </p>

            <button
              type="submit"
              className="btn btn-primary btn-lg w-100 mb-3"
              onClick={login}
            >
              Log in
            </button>

            <p className="text-center">
              No account?{" "}
              <Link
                to="/teamform"
                className="text-decoration-none text-success fw-bold"
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Snackbar (Toast Alert) */}
      <Snackbar
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={5000}
        onClose={handleCloseSnackBar}
        key={vertical + horizontal}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackBar}
          severity={snackBarstate.type}
        >
          <Typography style={{ color: "#fff" }}>
            {snackBarstate.message}
          </Typography>
        </MuiAlert>
      </Snackbar>
    </>
  );
};
export default Login;
