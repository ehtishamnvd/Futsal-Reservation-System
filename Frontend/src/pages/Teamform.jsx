import React, { useState } from "react";
import axios from "axios";
import * as CONTANT from "../Constant/constant.js";

import { useHistory } from "react-router-dom";
import Teamfrontpages from "./Teamfrontpages";
import { useDispatch } from "react-redux";
import { teamAction } from "../redux/actions/loadingAction";
import { setTeamData } from "../redux/slices/utilitySlice";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { Typography } from "@material-ui/core";

function Teamform() {
  const dispatch = useDispatch();
  const history = useHistory();

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

  //For Registraition List of Teams
  const [items, setItems] = useState([]);

  const [team, setTeam] = useState({
    teamName: "",
    captainName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const onSubmits = (event) => {
    event.preventDefault();
  };

  const inputEvent = (event) => {
    console.log(event);
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);

    setTeam({
      ...team,
      [name]: value,
    });
  };

  const register = () => {
    const data = {
      name: team.teamName,
      captainName: team.captainName,
      email: team.email,
      password: team.password,
      phone: team.phone,
      address: team.address,
    };

    if (
      data.name &&
      data.captainName &&
      data.email &&
      data.password &&
      data.phone &&
      data.address
    ) {
      CONTANT.API.post("/team/register", data).then((res) => {
        if (res.data.message == "Successfully Registered, Please Login Now") {
          alert(res.data.message);
          setSnackBar({
            ...snackBarstate,
            type: "success",
            message: "Success: Team Added Successfully ",
            open: true,
          });
          history.push("/login");
        } else {
          console.log(res.data);
          alert(res.data.message);
        }
      });
    } else {
      alert("Not posted");
    }
  };

  const addItem = () => {
    // value.push(team);
    // console.log(value);
    // const temp = Object.freeze([]);
    // temp.push(team);

    let newArr = [...items];
    newArr.push(team);

    setItems(newArr);
    console.log(newArr);
    dispatch(setTeamData(newArr));
    //localStorage.setItem("teams", newArr);
    // history.push("/teams");
    // if(!team.teamname)
    // {

    // }
    // else
    // {
    //     setItems([...items, team.teamname]);
    // }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: "url('./images/teamspic.png')",
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
              SIGN UP AS TEAM
            </h3>
            <input
              style={{ marginTop: "30px" }}
              type="text"
              name="teamName"
              autoComplete="off"
              placeholder="Enter Your Team's Name"
              onChange={(e) => setTeam({ ...team, teamName: e.target.value })}
              value={team.teamName}
              id=""
              className="form-control mb-3 p-3"
            />
            <input
              type="text"
              name="captainName"
              autoComplete="off"
              placeholder="Enter Captain's Name"
              onChange={(e) =>
                setTeam({ ...team, captainName: e.target.value })
              }
              value={team.captainName}
              id=""
              className="form-control mb-3 p-3"
            />
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter Your Email"
              onChange={(e) => setTeam({ ...team, email: e.target.value })}
              value={team.email}
              id=""
              className="form-control mb-3 p-3"
            />
            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Enter Your Password"
              onChange={(e) => setTeam({ ...team, password: e.target.value })}
              value={team.password}
              id=""
              className="form-control mb-3 p-3"
            />
            <input
              type="number"
              name="phone"
              autoComplete="off"
              placeholder="Enter Your Mobile Number"
              onChange={(e) => setTeam({ ...team, phone: e.target.value })}
              value={team.phone}
              id=""
              className="form-control mb-3 p-3"
            />
            <input
              type="text"
              name="address"
              autoComplete="off"
              placeholder="Enter Your Address"
              onChange={(e) => setTeam({ ...team, address: e.target.value })}
              value={team.address}
              id=""
              className="form-control mb-4 p-3"
            />

            <div className="text-center">
              <button
                type="submit"
                id=""
                className="btn btn-primary w-100 p-3"
                onClick={register}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
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
      </div>
    </>
  );
}

export default Teamform;
