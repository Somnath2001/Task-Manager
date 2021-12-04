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
      <div
        className="jumbotron  text-white text-center"
        style={{ marginTop: "70px" }}
      >
        <h2 className="display-6 titletxt">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>

    {/* <footer className="footer">
      <div className=" footertxt container-fluid">
        <h4>Manage your daily task here...</h4>
      </div>
    </footer> */}
  </div>
);

export default Base;
