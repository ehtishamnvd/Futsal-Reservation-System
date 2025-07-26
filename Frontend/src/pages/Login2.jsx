import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as CONTANT from "../Constant/constant.js";
import { useDispatch } from "react-redux";
import {
  setGroundId,
  setAddress,
  setGroundName,
  setEmail,
  setPhone,
  setOwnerName,
  setLat, 
  setLng, 
} from "../redux/slices/groundSlice";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const Login2 = ({ setGroundLogin }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    window.localStorage.clear(); 
  }, []);

  const [user2, setUser2] = useState({
    email: "",
    password: "",
  });

  const inputEvent2 = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser2({ ...user2, [name]: value });
  };

  const onSubmits = (event) => {
    event.preventDefault();
  };

  const { localStorage } = window;

  // This function now saves ALL ground data, including lat and lng
  const setGroundData = (res) => {
    const groundData = res.data.ground;

    // Save all data to localStorage
    localStorage.setItem("groundId", groundData._id);
    localStorage.setItem("groundname", groundData.name);
    localStorage.setItem("ownername", groundData.ownername);
    localStorage.setItem("email", groundData.email);
    localStorage.setItem("phone", groundData.phone);
    localStorage.setItem("address", groundData.address);
    localStorage.setItem("lat", groundData.lat); 
    localStorage.setItem("lng", groundData.lng); 
    localStorage.setItem("from", "ground");
    localStorage.setItem("login", true);

    // Dispatch all data to Redux store
    dispatch(setGroundId(groundData._id));
    dispatch(setGroundName(groundData.name));
    dispatch(setOwnerName(groundData.ownername));
    dispatch(setEmail(groundData.email));
    dispatch(setPhone(groundData.phone));
    dispatch(setAddress(groundData.address));
    dispatch(setLat(groundData.lat)); 
    dispatch(setLng(groundData.lng)); 

  
    setDpUrl(groundData._id);
    setCoverUrl(groundData._id);
  };

  const setDpUrl = (groundId) => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `grounddp/${groundId}`))
      .then((url) => {
        localStorage.setItem("dpUrl", url);
      })
      .catch((err) => console.log("DP not found:", err.code));
  };

  const setCoverUrl = (groundId) => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `groundcover/${groundId}`))
      .then((url) => {
        localStorage.setItem("coverUrl", url);
      })
      .catch((err) => console.log("Cover not found:", err.code));
  };

  const login2 = () => {
    if (!user2.email || !user2.password) {
      alert("Please fill in all fields.");
      return;
    }
    CONTANT.API.post("/ground/login2", user2).then((res) => {
      if (res.data.message === "Login Successsfully") {
        setGroundData(res);
        alert(res.data.message);
        setGroundLogin(res.data.ground);
        history.push("/groundprofile");
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
          backgroundImage: "url('./images/Loginpagepic.png')",
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
        <div
          className="bg-white bg-opacity-25 p-5 rounded shadow"
          style={{ width: "100%", maxWidth: "420px", marginLeft: "430px" }}
        >
          <form id="teamform" onSubmit={onSubmits}>
            <h3 className="text-secondary fw-bold mb-4 text-center">
              Sign In as Ground Owner
            </h3>

            <div className="mb-3" style={{ marginTop: "30px" }}>
              <input
                type="text"
                name="email"
                placeholder="Enter Your Email"
                onChange={inputEvent2}
                value={user2.email}
                className="form-control form-control-lg p-3 shadow-sm"
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={inputEvent2}
                value={user2.password}
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
              onClick={login2}
            >
              Log in
            </button>

            <p className="text-center">
              No account?{" "}
              <Link
                to="/groundform"
                className="text-decoration-none text-success fw-bold"
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login2;
