import React, { useState, useEffect } from "react";
import * as CONSTANT from "../Constant/constant.js";

const Academyform = () => {
  const [ground, setGround] = useState([]);
  const [academy, setAcademy] = useState({
    studentname: "",
    fathername: "",
    email: "",
    age: "",
    contact: "",
    address: "",
    myacademy: "",
  });

  useEffect(() => {
    getGrounds();
  });

  const getGrounds = async () => {
    await CONSTANT.API.get("/ground/test").then((res) => {
      if (res.data.message) {
        alert("Something Went Wrong");
      } else {
        setGround(res.data);
      }
    });
  };

  const onSubmits = (event) => {
    event.preventDefault();
  };

  const inputEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);

    setAcademy({ ...academy, [name]: value });
  };

  const academyformregister = () => {
    const { studentname, fathername, email, age, contact, address, myacademy } =
      academy;

    if (
      studentname &&
      fathername &&
      email &&
      age &&
      contact &&
      address &&
      myacademy
    ) {
      CONSTANT.API.post("/academy/academyformregister", academy).then((res) => {
        alert(res.data.message);
      });
    } else {
      alert("Not posted");
    }
  };
  return (
    <>
      <div
        className="container-fluid d-flex justify-content-center align-items-center min-vh-100 "
        style={{ background: "#1e3046" }}
      >
        <div
          className=" bg-gradient shadow-lg "
          style={{ width: "100%", maxWidth: "500px", background: "#1e3046", color:"white", padding:"30px" }}
        >
          <div className="card-body">
            <h1 className="text-center mb-4 text-primary border-bottom pb-3">
              REGISTRATION FORM
            </h1>

            <form onSubmit={onSubmits} className="needs-validation" noValidate style={{color:"white"}}>
              {/* Student Name */}
              <div className="mb-3">
                <label htmlFor="studentname" className="form-label">
                  Student Name
                </label>
                <input
                  type="text"
                  className="form-control p-2"
                  id="studentname"
                  name="studentname"
                  onChange={inputEvent}
                  value={academy.studentname}
                  required
                />
                <div className="invalid-feedback">
                  Please enter student name
                </div>
              </div>

              {/* Father Name */}
              <div className="mb-3">
                <label htmlFor="fathername" className="form-label">
                  Father Name
                </label>
                <input
                  type="text"
                  className="form-control p-2"
                  id="fathername"
                  name="fathername"
                  onChange={inputEvent}
                  value={academy.fathername}
                  required
                />
                <div className="invalid-feedback">Please enter father name</div>
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control p-2"
                  id="email"
                  name="email"
                  onChange={inputEvent}
                  value={academy.email}
                  required
                />
                <div className="invalid-feedback">
                  Please enter a valid email
                </div>
              </div>

              {/* Age */}
              <div className="mb-3">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <input
                  type="number"
                  className="form-control p-2"
                  id="age"
                  name="age"
                  onChange={inputEvent}
                  value={academy.age}
                  min="1"
                  required
                />
                <div className="invalid-feedback">Please enter valid age</div>
              </div>

              {/* Contact */}
              <div className="mb-3">
                <label htmlFor="contact" className="form-label">
                  Contact Number
                </label>
                <input
                  type="tel"
                  className="form-control p-2"
                  id="contact"
                  name="contact"
                  onChange={inputEvent}
                  value={academy.contact}
                  required
                />
                <div className="invalid-feedback">
                  Please enter contact number
                </div>
              </div>

              {/* Address */}
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control p-2"
                  id="address"
                  name="address"
                  onChange={inputEvent}
                  value={academy.address}
                  required
                />
                <div className="invalid-feedback">Please enter address</div>
              </div>

              {/* Academy Select */}
              <div className="mb-4">
                <label htmlFor="myacademy" className="form-label">
                  Select Academy
                </label>
                <select
                  className="form-select p-2"
                  id="myacademy"
                  name="myacademy"
                  onChange={inputEvent}
                  value={academy.myacademy}
                  required
                >
                  <option value="">--Choose--</option>
                  {ground.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">Please select an academy</div>
              </div>

              {/* Submit Button */}
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  onClick={academyformregister}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Academyform;
