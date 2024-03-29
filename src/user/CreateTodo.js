import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Col, Row, Container, Button, Alert } from "react-bootstrap";
import { createTodo } from "../todo/helper/todo";
import { isAuthenticated } from "../auth/helper/index";
import "bootstrap-icons/font/bootstrap-icons.css";
import Base from "../core/Base";
const CreateTodo = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    status: "",
    priority: "",
    error: "",
    success: false,
  });

  const { name, description, status, priority, error, success } = values;

  const {
    user: { _id },
    token,
  } = isAuthenticated();

  const history = useHistory();
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "" });
    createTodo(_id, token, values).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        errorMessage();
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          status: "",
          priority: "",
          error: "",
          success: true,
        });
      }
    });
    setTimeout(() => {
      history.push("/user/todo");
    }, 2000);
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <Container
      variant="success"
      className="mt-5 text-center text-info"
      style={{ display: success ? "" : "none" }}
    >
      <h5>Todo created successfully</h5>
    </Container>
  );

  const errorMessage = () => {
    <Container
      variant="danger"
      className="mt-5 text-center"
      style={{ display: error ? "" : "none" }}
    >
      <h5>{error}</h5>
    </Container>;
  };

  const createTodoForm = () => {
    return (
      <div>
        <Container>
          <Row className="justify-content-md-center">
            <Col md={6} style={{}} className="p-4 m-3">
              <Form>
                <Form.Group className="pt-2">
                  <Form.Control
                    type="name"
                    placeholder="Enter Title"
                    onChange={handleChange("name")}
                    value={name}
                  />
                </Form.Group>

                <Form.Group className="pt-2">
                  <Form.Control
                    type="name"
                    placeholder="Description"
                    onChange={handleChange("description")}
                    value={description}
                  />
                </Form.Group>
                <Form.Group className="pt-2">
                  <Form.Control
                    as="select"
                    style={{ WebkitAppearance: "menulist" }}
                    onChange={handleChange("status")}
                    value={status}
                  >
                    <option>Pending</option>
                    <option>Half Done</option>
                    <option>Completed</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="pt-2">
                  <Form.Control
                    as="select"
                    style={{ WebkitAppearance: "menulist" }}
                    onChange={handleChange("priority")}
                    value={priority}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </Form.Control>
                </Form.Group>
                <Button
                  className="form-control"
                  variant="warning"
                  type="submit"
                  style={{
                    marginTop: "10px",
                  }}
                  onClick={onSubmit}
                >
                  Create Todo
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  return (
    <Base title="Create your Todo Here" description="personalize your todo">
      {errorMessage()}
      {successMessage()}
      {createTodoForm()}
    </Base>
  );
};

export default CreateTodo;
