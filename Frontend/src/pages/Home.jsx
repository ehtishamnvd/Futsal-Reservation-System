import React from "react";

function Home() {
  const Bookingg = (e) => {
    e.preventDefault();
    window.location.replace("/Booking");
  };

  return (
    <>
       <section className="hero_section">
        <div className="background-img">
          <img src="./images/home2.jpg" className="bg" />

          {/* Buttons over image */}
          <div
            className="position-absolute top-50 start-50 translate-middle d-flex gap-4" style={{marginTop:"300px", marginLeft:"80px"}}
          >
            <a href="#" onClick={Bookingg}>
              <button className="btn btn-success btn-lg px-5 py-3 shadow">
                Book Now
              </button>
            </a>

            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn btn-primary btn-lg px-5 py-3 shadow">
                Message
              </button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
