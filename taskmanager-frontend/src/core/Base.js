import React from "react";
import Navbar from "./navbar";
const Base = ({
  title = "My Title",
  description = "My description",
  className = "text-white p-4",
  children,
}) => (
  <div>
    <Navbar />
    <div className="container-fluid">
      <div className="jumbotron  text-white text-center my-4">
        <h2 className="display-6">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>

    <footer className="footer">
      <div className="container-fluid bg-info text-white text-center py-3 d-flex">
        <h4>Manage your daily task on our platform with an exprience</h4>
        <button className="btn btn-warning ms-3">Contact Us</button>
      </div>
      <div className="container">
        <span className="text-muted">
          An Amazing platform for
          <span className="text-white"> Task management</span>
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
