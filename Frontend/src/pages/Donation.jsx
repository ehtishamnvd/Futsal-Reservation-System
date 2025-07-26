import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const Donation = () => {
  
  const handleClick = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51RM4BkCmOKAbrS6mBpxoTrNV2weQwz1azKTYFZW325v4KaCJ6R0J6k9OtAmlgyfSjrE29bV4SuaKBuxFROzXWDkv00jXIsZHcn"
      );

      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            price: "price_1RfHRGCmOKAbrS6mktz4dbpM",
            quantity: 1,
          },
        ],
        mode: "payment",
        successUrl: "http://localhost:3000/donation",
        cancelUrl: "http://localhost:3000/login",
      });

      if (error) {
        console.error("Stripe Checkout error:", error);
        alert("Payment failed to initiate. Please try again.");
      }
    } catch (err) {
      console.error("Error loading Stripe:", err);
      alert("An error occurred. Please refresh the page.");
    }
  };

  return (
    <>
      <div>
        <img
          src="./images/iii.jpeg"
          className="bggimg"
          alt="Donation background"
        />
        <h1 className="centerr">D O N A T I O N</h1>
        <p className="centerr1">
          Sport has the power to change the world. It has the power to inspire.
          It has the power to unite people in a way that little else does. It
          speaks to youth in a language they understand. Sport can create hope
          where once there was only despair.
        </p>
      </div>
      <div>
        <button
          id="buttonn1"
          style={{ fontSize: "14px" }}
          onClick={handleClick}
        >
          Donate 500 PKR Now
        </button>
        <button id="buttonn2" style={{ fontSize: "14px" }}>
          Discover
        </button>
      </div>
    </>
  );
};

export default Donation;
