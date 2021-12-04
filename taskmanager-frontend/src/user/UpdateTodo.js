import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Col, Row, Container, Button, Alert } from "react-bootstrap";
import { updateTodo, getTodoById } from "../todo/helper/todo";
import { isAuthenticated } from "../auth/helper/index";
import Base from "../core/Base";

const UpdateTodo = ({ match }) => {
  const {
    user: { _id },
    token,
  } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    status: "",
    priority: "",
    error: "",
    success: false,
  });

  const { name, description, status, priority, error, success } = values;

  //loading todo
  const loadTodos = (todoId) => {
    getTodoById(todoId, _id, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          status: data.status,
          priority: data.priority,
          error: "",
        });
      }
    });
  };

  useEffect(() => {
    loadTodos(match.params.todoId);
  }, []);

  const history = useHistory();
  //on submit
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "" });
    updateTodo(match.params.todoId, _id, token, values).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
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
    }, 1000);
  };

  //handle change
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  //success message
  const successMessage = () => (
    <Container
      variant="success"
      className="mt-5 text-center text-success"
      style={{ display: success ? "" : "none" }}
    >
      <h5>Task updated successfully</h5>
    </Container>
  );

  //error message
  const errorMessage = () => (
    <Container
      variant="danger"
      className="mt-5 text-center"
      style={{ display: error ? "" : "none" }}
    >
      <h5>{error}</h5>
    </Container>
  );

  //todo update form
  const updateTodoForm = () => {
    return (
      <div>
        <Container>
          <Row className="justify-content-md-center">
            <Col md={5} className="p-2">
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
                  Update
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  return (
    <Base title="Update your tasks" description="manage your daily task">
      {errorMessage()}
      {successMessage()}
      {updateTodoForm()}
    </Base>
  );
};

export default UpdateTodo;
