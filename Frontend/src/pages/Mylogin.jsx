import React from "react";

function Mylogin() {
  const login1 = (e) => {
    e.preventDefault();
    window.location.replace("/Login");
  };

  const login2 = (e) => {
    e.preventDefault();
    window.location.replace("/Login2");
  };

  return (
    <>
      {/* Full Background Image */}
      <div
        className="vh-100 vw-100 d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: "url('./images/grass3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Centered Login Buttons */}
        <div className="text-center bg-white bg-opacity-50 rounded shadow">
          <div style={{ padding: "8rem" }}>
            <span
              className="mb-5"
              style={{ fontWeight: "bold", fontSize: "3rem" }}
            >
              Login As
            </span>

            <button
              className="btn btn-success w-100 py-3 mb-4"
              style={{ fontSize: "1.3rem", marginTop: "30px" }}
              onClick={login1}
            >
              Login As Team
            </button>

            <button
              className="btn btn-primary w-100 py-3"
              style={{ fontSize: "1.3rem" }}
              onClick={login2}
            >
              Login As Ground
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mylogin;
