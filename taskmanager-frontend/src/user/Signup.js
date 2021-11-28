import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signup } from "../auth/helper/index";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import Base from "../core/Base";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, lastName, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const history = useHistory();
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, lastName, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          lastName: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
    setTimeout(() => {
      history.push("/signin");
    }, 2000);
  };
  const signupForm = () => {
    return (
      <div>
        <Container>
          <Row className="justify-content-md-center">
            <Col
              md={6}
              style={{
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "grey",
              }}
              className="p-5"
            >
              <Form>
                <Form.Group className="p-2">
                  <Form.Control
                    type="name"
                    placeholder="Enter First Name"
                    onChange={handleChange("name")}
                    value={name}
                  />
                </Form.Group>
                <Form.Group className="p-2">
                  <Form.Control
                    type="name"
                    placeholder=" Enter Last Name"
                    onChange={handleChange("lastName")}
                    value={lastName}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail" className="p-2">
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    onChange={handleChange("email")}
                    value={email}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="p-2">
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    onChange={handleChange("password")}
                    value={password}
                  />
                </Form.Group>

                <Button
                  className="form-control"
                  variant="info"
                  type="submit"
                  onClick={onSubmit}
                  style={{
                    marginTop: "10px",
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
                }}
              >
                Already have an account.Please (
                <Link to="/signin" className="text-info">
                  Login Here
                </Link>
                )
              </h6>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
  const successMessage = () => (
    <Container>
      <Alert
        variant="success"
        className="mt-5 text-center"
        style={{ display: success ? "" : "none" }}
      >
        <h5>
          New account was created successfully.Please (
          <Link to="/signin">Login Here</Link>)
        </h5>
      </Alert>
    </Container>
  );
  const errorMessage = () => (
    <Container>
      <Alert
        variant="danger"
        className="mt-5 text-center"
        style={{ display: error ? "" : "none" }}
      >
        <h5>{error}</h5>
      </Alert>
    </Container>
  );
  return (
    <Base title="Signup for User" description="welcome to usersignup page">
      {errorMessage()}
      {successMessage()}
      {signupForm()}
    </Base>
  );
};

export default Signup;
