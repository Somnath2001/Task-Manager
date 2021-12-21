import React from "react";
import Base from "./Base";
import leadimg from "./base4.svg";

const Home = () => {
  return (
    <Base
      title="Welcome to the Task Manager"
      description="Create your daily task and finish it with ❤️"
    >
      <img src={leadimg} alt="img" className="leadingimg" />
      <br />
      {/* <div style={{ textAlign: "center", marginTop: "90px" }}>
        <h5>code by somnath </h5>
      </div> */}
    </Base>
  );
};
export default Home;
