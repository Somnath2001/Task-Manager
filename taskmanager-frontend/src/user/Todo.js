import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { getAllTodosById, deleteTodo } from "../todo/helper/todo";
import Base from "../core/Base";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    user: { _id },
    token,
  } = isAuthenticated();

  //loading all todos
  const loadTodos = () => {
    getAllTodosById(_id, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError(false);
        setTodos(data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
      loadTodos();
    }, 150);
  }, []);

  //delete todo
  const deleteTheTodo = (todoId) => {
    deleteTodo(todoId, _id, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        loadTodos();
      }
    });
  };

  //error message
  const errorMessage = () => (
    <Container>
      <Alert
        variant="light"
        className="mt-5 text-center text-dark"
        style={{ display: error ? "" : "none", borderRadius: "11px" }}
      >
        <h5>{error}</h5>
        <h6
          style={{
            marginTop: "10px",
            color: "grey",
            fontWeight: "bold",
          }}
        >
          <Link to="/user/create/todo">Create Task Here</Link>
        </h6>
      </Alert>
    </Container>
  );

  //loading method
  const loadingMessage = () => {
    return (
      loading && (
        <Container variant="info" className="mt-5 text-center text-primary">
          <h2>Loading...</h2>
        </Container>
      )
    );
  };

  //listing all users todo
  const todoListing = () => {
    return (
      <div className="">
        <Container className="listingcontainer">
          <Row className="head">
            <Col className="titlecol">
              <div>Title</div>
            </Col>
            <Col className="descriptcol">
              <div>Description</div>
            </Col>
            <Col className="statuscol">
              <div>Status</div>
            </Col>
            <Col className="priocol">
              <div>Priority</div>
            </Col>

            <Col className="editcol">
              <div>Edit</div>
            </Col>
            <Col className="delcol">
              <div>Delete</div>
            </Col>
          </Row>
          {todos.map((todo, index) => {
            return (
              <ListGroup key={index}>
                <ListGroupItem
                  variant="light"
                  className="mt-2 py-0 text-dark text-center scrollmenu"
                  style={{
                    borderRadius: "10px",
                    fontFamily: "serif",
                    height: "45px",
                  }}
                >
                  <Row>
                    <Col className="mt-2 name">
                      <h4>{todo.name}</h4>
                    </Col>
                    <Col>
                      <p className="pt-1 " style={{ fontSize: "25px" }}>
                        {todo.description}
                      </p>
                    </Col>
                    <Col className="mt-2 ">
                      <h4>{todo.status}</h4>
                    </Col>
                    <Col className="mt-2 ">
                      <h4>{todo.priority}</h4>
                    </Col>
                    <Col style={{ marginRight: "3px" }}>
                      <Link to={`/user/update/todo/${todo._id}/${_id}`}>
                        <i className="bi bi-pencil-square text-info"></i>
                      </Link>

                      <i
                        className="bi bi-trash text-danger"
                        style={{
                          marginLeft: "50%",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          deleteTheTodo(todo._id);
                        }}
                      ></i>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            );
          })}
        </Container>
      </div>
    );
  };

  return (
    <Base title="Your tasks" description="follow up your tasks">
      {error ? (
        <div>{errorMessage()}</div>
      ) : (
        <div>
          {todoListing()}
          {loadingMessage()}
        </div>
      )}
    </Base>
  );
};

export default Todo;
