import React from "react";
import Base from "./Base";
import leadimg from "./bg.jpeg";

const Home = () => {
  return (
    <Base
      title="Welcome to the Task Manager"
      description="Manage all of your Tasks here"
    >
      <img src={leadimg} alt="img" className="leadingimg" />
    </Base>
  );
};

export default Home;
