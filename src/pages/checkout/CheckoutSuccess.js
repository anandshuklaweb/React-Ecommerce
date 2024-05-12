import React from "react";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <section
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
      }}
    >
      <div className="container --center-all">
        <h2>Checkout Successful</h2>
        <p>Thank you for your purchase</p>
        <br />

        <button className="--btn --btn-danger --button">
          <Link to="/order-history">View Order Status</Link>
        </button>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
