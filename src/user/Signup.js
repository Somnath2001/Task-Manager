import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signup } from "../auth/helper/index";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import Base from "../core/Base";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
      if (!data.error) {
        setTimeout(() => {
          history.push("/signin");
        }, 2000);
      } else {
        setTimeout(() => {
          history.push("/signup");
          // window.location.reload();
        }, 1000);
      }
    });
  };

  const signupForm = () => {
    return (
      <div>
        <Container>
          <Row className="justify-content-md-center">
            <Col md={5} style={{ paddingBottom: "80px" }}>
              <Form>
                <Form.Group className="pt-3">
                  <Form.Control
                    type="name"
                    placeholder="Enter Name"
                    onChange={handleChange("name")}
                    value={name}
                  />
                </Form.Group>
                {/* <Form.Group className="pt-3">
                  <Form.Control
                    type="name"
                    placeholder=" Enter Last Name"
                    onChange={handleChange("lastName")}
                    value={lastName}
                  />
                </Form.Group> */}

                <Form.Group controlId="formBasicEmail" className="pt-3">
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    onChange={handleChange("email")}
                    value={email}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="pt-3">
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    onChange={handleChange("password")}
                    value={password}
                  />
                </Form.Group>

                <Button
                  className="form-control"
                  type="submit"
                  variant="warning"
                  onClick={onSubmit}
                  style={{
                    marginTop: "15px",
                    backgroundColor: "rgb(280, 200, 15)",
                  }}
                >
                  Signup
                </Button>
              </Form>
              <h6
                style={{
                  marginTop: "10px",
                  color: "grey",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Already have an account.Please <br />
                <Link to="/signin" className="text-light">
                  Login Here
                </Link>
              </h6>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
  const successMessage = () => (
    <Container
      className="mt-5 text-center text-success"
      style={{ display: success ? "" : "none" }}
    >
      <h5>New account was created successfully</h5>
    </Container>
  );
  const errorMessage = () => (
    <Container
      variant="danger"
      className="mt-5 text-center text-danger"
      style={{ display: error ? "" : "none" }}
    >
      <h5>{error}</h5>
    </Container>
  );
  return (
    <Base title="Signup for User" description="userSignup here...">
      {errorMessage()}
      {successMessage()}
      {signupForm()}
    </Base>
  );
};

export default Signup;
