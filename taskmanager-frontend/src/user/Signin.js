import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Redirect, Link, useHistory } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper/index";
import Base from "../core/Base";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
  });

  const { email, password, error, loading } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const history = useHistory();
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values });
          });
        }
      })
      .catch(console.log("Signin request failed"));
    setTimeout(() => {
      history.push("/user/todo");
    }, 1000);
  };
  const performRedirect = () => {
    if (isAuthenticated()) {
      return <Redirect to="/user/todo" />;
    }
  };
  const loadingMessage = () => {
    return (
      loading && (
        <Container>
          <Alert variant="info" className="mt-5 text-center">
            <h2>Loading...</h2>
          </Alert>
        </Container>
      )
    );
  };
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
  const signinForm = () => {
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
                <Form.Group controlId="formBasicEmail" className="p-2">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={handleChange("email")}
                    value={email}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="p-2">
                  <Form.Control
                    type="password"
                    placeholder="Password"
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
                  Signin
                </Button>
              </Form>
              <h6
                style={{
                  marginTop: "10px",
                  color: "grey",
                  fontWeight: "bold",
                }}
              >
                Don't have an account.Please (
                <Link to="/signup" className="text-info">
                  Signup Here
                </Link>
                )
              </h6>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
  return (
    <Base title="Signin for User" description="welcome to usersignin page">
      {performRedirect()}
      {loadingMessage()}
      {errorMessage()}
      {signinForm()}
    </Base>
  );
};

export default Signin;
