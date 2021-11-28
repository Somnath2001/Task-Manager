import React, { Fragment } from "react";
import logo from "./brand.png";
import { Link, withRouter, Redirect } from "react-router-dom";
import { FcMenu } from "react-icons/fc";
import { isAuthenticated, signout } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#000000" };
  } else {
    return { color: "#FFFFFF" };
  }
};
const Menu = ({ history }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg  bg-info">
        <div className="container-fluid">
          <a className="navbar-brand text-light" href="/">
            <img
              src={logo}
              alt="img"
              width="35"
              height="30"
              className="d-inline-block align-text-top"
            />
            <span className="text-light">Task</span>
            <span className="text-primary">Manager</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggler"
            aria-controls="navbarToggler"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon p-1">
              <FcMenu />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarToggler">
            <ul className="nav navbar-nav ms-auto me-3 text-center">
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/")}
                  className="nav-link"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {!isAuthenticated() && ( //conditional rendering when not Authenticated
                <Fragment>
                  <li className="nav-item">
                    <Link
                      style={currentTab(history, "/signup")}
                      className="nav-link"
                      to="/signup"
                    >
                      SignUp
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      style={currentTab(history, "/signin")}
                      className="nav-link"
                      to="/signin"
                    >
                      SignIn
                    </Link>
                  </li>
                </Fragment>
              )}
              {isAuthenticated() && ( //conditional rendering when Authenticated
                <Fragment>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-light"
                      style={currentTab(history, "/user/todo")}
                      className="nav-link"
                      to="/user/todo"
                    >
                      Tasks
                    </Link>
                  </li>

                  <i className="bi bi-envelope text-center"></i>
                  <li className="nav-item ">
                    <Link to="/user/todo" className="nav-link">
                      {isAuthenticated().user.email}
                    </Link>
                  </li>

                  <Link to="/user/create/todo">
                    <i className="bi bi-plus text-light"></i>
                  </Link>
                  <li className="nav-item">
                    <span
                      className="nav-link text-danger"
                      onClick={() => {
                        signout(() => {
                          history.push("/signin");
                        });
                      }}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      Signout
                    </span>
                  </li>
                  <i className="bi bi-person-circle text-center"></i>
                </Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Menu);
