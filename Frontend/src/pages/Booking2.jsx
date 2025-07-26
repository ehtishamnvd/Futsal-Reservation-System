import React, { useEffect, useState } from "react";
import abc from "../images/abc.jpg";
import abc3 from "../images/abc3.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as CONSTANT from "../Constant/constant";
import "../booking.css";
import zIndex from "@mui/material/styles/zIndex";

const Booking2 = () => {
  const [Slots, setSlots] = useState([]);
  const [_id, set_ID] = useState(null);
  const [name, setName] = useState(null);
  const [teamName, setTeamName] = useState(null);
  const [inde, setinde] = useState([]);
  const [bookedBy, setBookedBy] = useState([]);
  const times = [
    "7-8:30 am",
    "9-9:30 am",
    "10-11:30 am",
    "12-1:30 pm",
    "2-2:30 pm",
    "3-3:30 pm",
    "4-4:30 pm",
    "5-5:30 pm",
    "6-6:30 pm",
    "7-8:30 pm",
    "9-10:30 pm",
    "11-12:30 pm",
  ];
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    set_ID(window.localStorage.getItem("groundID"));
    setName(window.localStorage.getItem("groundName"));
    setTeamName(window.localStorage.getItem("teamname"));
  });
  useEffect(() => {
    set_ID(window.localStorage.getItem("groundID"));
    setTimeout(() => {
      getSlots();
    }, 1000);
  }, []);

  const getSlots = async () => {
    let today = new Date();
    let curent_date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let id;
    let k;
    if (_id == null) {
      id = window.localStorage.getItem("groundID");
    }
    if (_id == null) {
      k = id;
    } else {
      k = _id;
    }

    await CONSTANT.API.post(`/ground/getSlot`, {
      _id: k,
      date: curent_date,
    }).then((res) => {
      if (res.data.error) {
        console.log(res.data.error);
      } else {
        setSlots(res.data);
        console.log(res.data);
        setData(res.data);
      }
    });
  };
  const getSlotsFromDateChange = async (year, month, date) => {
    let curent_date = year + "-" + month + "-" + date;

    await CONSTANT.API.post(`/ground/getSlot`, { _id, date: curent_date }).then(
      (res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          setSlots(res.data);
          setData(res.data);
        }
      }
    );
  };
  const bookSlot = async (index) => {
    let curent_date =
      startDate.getFullYear() +
      "-" +
      (startDate.getMonth() + 1) +
      "-" +
      startDate.getDate();
    await CONSTANT.API.post("/ground/bookSlot", {
      index,
      _id,
      date: curent_date,
      name: teamName,
    }).then((res) => {
      alert(res.data.message);
      getSlotsFromDateChange(
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        startDate.getDate()
      );
    });
  };
  const undoSlot = async (index) => {
    let curent_date =
      startDate.getFullYear() +
      "-" +
      (startDate.getMonth() + 1) +
      "-" +
      startDate.getDate();
    await CONSTANT.API.post("/ground/undoSlot", {
      index,
      _id,
      date: curent_date,
    }).then((res) => {
      alert(res.data.message);
      getSlotsFromDateChange(
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        startDate.getDate()
      );
    });
  };
  const setData = (time) => {
    if (time.length == 0) {
      setinde([]);
    }
    let ij = [];
    let k = [];
    time.map((item, index) => {
      ij[item.in] = item.in;
      setinde([...ij]);
      k[item.in] = item.bookedby;
      setBookedBy([...k]);
    });
  };
  return (
    <>
      <div className="booking-section">
        <h1 className="groundname" style={{ marginTop: "-80px" }}>
          {name != null ? name : "hello"}
        </h1>

        <h2 className="dateheading">Select Date You Want To Select</h2>
        <form className="formdate d-flex justify-content-center mt-3">
          <div>
            <DatePicker
              id="datestart"
              minDate={new Date()}
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setinde([]);
                getSlotsFromDateChange(
                  date.getFullYear(),
                  date.getMonth() + 1,
                  date.getDate()
                );
              }}
              popperPlacement="bottom"
              popperModifiers={[
                {
                  name: "offset",
                  options: {
                    offset: [0, 10],
                  },
                },
                {
                  name: "preventOverflow",
                  options: {
                    boundary: "viewport",
                  },
                },
              ]}
              className="form-control"
            />
          </div>
        </form>

        {/* 
      <button className="allslots"> All Slots</button>
      <button className="avaslots"> Available Slots</button> */}

        <div className="slots-row" style={{ marginTop: "-40px" }}>
          {times.map((item, index) => (
            <div className="center3" key={index}>
              <div className="bookingcard">
                <div className="booking-image-container">
                  <img src={abc3} alt="Time slot" className="slot-image" />
                </div>
                <div className="container1">
                  <h4 className="time-heading">Time: {item}</h4>

                  {inde.length > 0 && inde[index] == index ? (
                    <div className="booked-info">
                      <h4
                        className="booked-by"
                        onClick={() => {
                          if (teamName == bookedBy[index]) {
                            undoSlot(index);
                          }
                        }}
                      >
                        Booked By: <b>{bookedBy[index]}</b>
                      </h4>
                    </div>
                  ) : (
                    <button
                      className="btnn2"
                      onClick={() => {
                        bookSlot(index);
                      }}
                    >
                      Book now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Booking2;
