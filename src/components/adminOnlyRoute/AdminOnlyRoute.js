import React from "react";
import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/slice/authSlice";
import { Link } from "react-router-dom";

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "anandshukla.web@gmail.com") {
    return children;
  } else {
    return (
      <section style={{ height: "80vh" }}>
        <div className="container">
          <h2>Permission Denied</h2>
          <p>This page can be view by an Admin user.</p>
          <br />
          <Link to="/">
            <button className="--btn">&larr; Back to Home</button>
          </Link>
        </div>
      </section>
    );
  }
};

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "anandshukla.web@gmail.com") {
    return children;
  } else {
    return null;
  }
};

export default AdminOnlyRoute;
