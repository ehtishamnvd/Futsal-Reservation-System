import React from "react";

// import { useNavigate } from "react-router-dom";

function Academyfrontpage() {
  //   const navigate = useNavigate();

  const handleRegisterClick = () => {
    window.location.replace("/Academyform");

    // navigate("/Academyform");
  };

  return (
    <div
    style={{
      backgroundImage: "url('./Images/academy.png')",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right",
      height: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingLeft: "5%",
      color: "white",
    }}
  >
   <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "40px",
          borderRadius: "12px",
          maxWidth: "600px",
        }}
      >
        <h1
          style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "20px" }}
        >
          Join The Academy
        </h1>
        <p
          style={{ fontSize: "18px", lineHeight: "1.8", marginBottom: "30px" }}
        >
          Today every ground has its academy with professional training staff.
          <br />
          Train with the best coaches to improve your skills & play on a higher
          level.
          <br />
          Get registered with any of the academies in twin cities through our
          website.
        </p>
        <button
          onClick={handleRegisterClick}
          style={{
            padding: "12px 30px",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Register Now
        </button>
      </div>
  </div>
  
  );
}

export default Academyfrontpage;
