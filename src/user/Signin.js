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
        <Container className="text-center text-primary">
          <h4>Loading...</h4>
        </Container>
      )
    );
  };
  const errorMessage = () => (
    <Container
      variant="danger"
      className="mt-5 text-center text-danger"
      style={{ display: error ? "" : "none" }}
    >
      <h5>{error}</h5>
    </Container>
  );

  const signinForm = () => {
    return (
      <div>
        <Container>
          <Row
            className="justify-content-md-center"
            style={{ paddingBottom: "90px" }}
          >
            <Col md={5} className="p-2">
              <Form>
                <Form.Group controlId="formBasicEmail" className="pt-2">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={handleChange("email")}
                    value={email}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="pt-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={handleChange("password")}
                    value={password}
                  />
                </Form.Group>

                <Button
                  className="form-control"
                  variant="warning"
                  type="submit"
                  onClick={onSubmit}
                  style={{
                    marginTop: "15px",
                    backgroundColor: "rgb(280, 200, 15)",
                  }}
                >
                  Signin
                </Button>
              </Form>
              <h6
                style={{
                  marginTop: "16px",
                  color: "grey",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Don't have an account.Please <br />
                <Link to="/signup" className="text-light">
                  Signup Here
                </Link>
              </h6>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
  return (
    <Base title="Signin for User" description=" userSignin here...">
      {performRedirect()}
      {loadingMessage()}
      {errorMessage()}
      {signinForm()}
    </Base>
  );
};

export default Signin;
