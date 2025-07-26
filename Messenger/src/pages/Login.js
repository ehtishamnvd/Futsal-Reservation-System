import React, { useState, useEffect, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import * as CONSTANT from "../Constant/constant";
import { AuthContext } from "../context/auth";

const Login = () => {
  const { user, setUser } = useContext(AuthContext);
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
    type: null,
  });
  useEffect(() => {
    window.localStorage.removeItem("onlineID");
    window.localStorage.removeItem("onlineName");
    window.localStorage.removeItem("from");
  }, []);

  const history = useHistory();

  const { email, password, error, loading, type } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!email || !password || type == null) {
      setData({ ...data, error: "All fields are required" });
    } else {
      try {
        let k = data.type == "team" ? "login" : "login2";
        await CONSTANT.API.post(`/${data.type}/${k}`, {
          email: data.email,
          password: data.password,
        }).then((res) => {
          if (res.data.message == "Login Successsfully") {
            if (res.data.team) {
              window.localStorage.setItem("onlineID", res.data.team._id);
              window.localStorage.setItem("onlineName", res.data.team.name);
              window.localStorage.setItem("from", "team");
              setUser(res.data.team);
            } else {
              window.localStorage.setItem("onlineID", res.data.ground._id);
              window.localStorage.setItem("onlineName", res.data.ground.name);
              window.localStorage.setItem("from", "ground");
              setUser(res.data.ground);
            }
            setData({
              email: "",
              password: "",
              error: null,
              loading: false,
            });
            history.replace("/");
          } else {
            setData({ ...data, loading: false });
            alert(res.data.message);
          }
        });
        // const result = await signInWithEmailAndPassword(auth, email, password);

        // await updateDoc(doc(db, "users", result.user.uid), {
        //   isOnline: true,
        // });
      } catch (err) {
        setData({ ...data, error: err.message, loading: false });
      }
    }
  };
  const onChangeValue = (event) => {
    setData({ ...data, type: event.target.value });
  };
  return (
    <section>
      <h3>Log into your Account</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input_container">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="input_container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        {error ? <p className="error">{error}</p> : null}
        <div onChange={onChangeValue}>
          <input type="radio" value="team" name="gender" /> Team
          <input type="radio" value="ground" name="gender" /> Ground
        </div>
        <div className="btn_container">
          <button className="btn" disabled={loading}>
            {loading ? "Logging in ..." : "Login"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
