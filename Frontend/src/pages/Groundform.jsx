import React, { useEffect, useState } from "react";
import axios from "axios";
import * as CONTANT from "../Constant/constant.js";

import { useHistory } from "react-router-dom";

function Groundform() {
  const history = useHistory();
  useEffect(() => {
    window.localStorage.removeItem("dpUrl");
    window.localStorage.removeItem("coverUrl");
  }, []);

  const [ground, setGround] = useState({
    groundname: "",
    ownername: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  // // const [teamname, setteamname] = useState("")
  // // const [captainname, setcaptainname] = useState("")
  // // const [youremail, setyouremail] = useState("")
  // // const [yourpassword, setyourpassword] = useState("")
  // // const [mobileno, setmobileno] = useState("")
  // // const [address, setaddress] = useState("")

  const onSubmits = (event) => {
    event.preventDefault();
  };

  const inputEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);

    setGround({ ...ground, [name]: value });
  };

  const register = () => {
    const data = {
      name: ground.groundname,
      ownername: ground.ownername,
      email: ground.email,
      password: ground.password,
      phone: ground.phone,
      address: ground.address,
    };

    if (
      data.name &&
      data.ownername &&
      data.email &&
      data.password &&
      data.phone &&
      data.address
    ) {
      CONTANT.API.post("/ground/register", data).then((res) => {
        if (res.data.message == "Successfully Registered, Please Login Now") {
          alert(res.data.message);
          history.push("/login2");
        } else {
          alert(res.data.message);
        }
      });
    } else {
      alert("Not posted");
    }
  };

  return (
    <>
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: "url('./images/groundspic.png')",
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
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent background for contrast
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Soft shadow around the form
          width: "80%", // Width of the form, adjust as necessary
          maxWidth: "420px", // Max width for responsiveness
          marginLeft: "430px",
        }}
      >
        <form id="teamform" onSubmit={onSubmits}>
          <h3 className="text-secondary fw-bold mb-4 text-center">
            SIGN UP AS GROUND'S OWNER
          </h3>
  
          <input
            type="text"
            name="groundname"
            autoComplete="off"
            placeholder="Enter Ground's Name"
            onChange={inputEvent}
            value={ground.groundname}
            className="form-control mb-3 p-3"
          />
  
          <input
            type="text"
            name="ownername"
            autoComplete="off"
            placeholder="Enter Ground's Owner Name"
            onChange={inputEvent}
            value={ground.ownername}
            className="form-control mb-3 p-3"
          />
  
          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Enter Your Email"
            onChange={inputEvent}
            value={ground.email}
            className="form-control mb-3 p-3"
          />
  
          <input
            type="password"
            name="password"
            autoComplete="off"
            placeholder="Enter Your Password"
            onChange={inputEvent}
            value={ground.password}
            className="form-control mb-3 p-3"
          />
  
          <input
            type="number"
            name="phone"
            autoComplete="off"
            placeholder="Enter Your Mobile Number"
            onChange={inputEvent}
            value={ground.phone}
            className="form-control mb-3 p-3"
          />
  
          <input
            type="text"
            name="address"
            autoComplete="off"
            placeholder="Enter Ground's Address"
            onChange={inputEvent}
            value={ground.address}
            className="form-control mb-4 p-3"
          />
  
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary w-100 p-3"
              onClick={register}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
  
  );
}

export default Groundform;
