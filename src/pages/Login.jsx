import jwt from "jsonwebtoken"
import React from "react";
import "../App.css";

import {
  Container,
  Row,
  Form,
  FormGroup,
  Col,
  Input,
  Button,
} from "reactstrap";

export default function Login() {
  const API_URL = "http://131.181.190.87:3000";

  function loginUser(email, password) {
    const url = `${API_URL}/user/login`;

    return fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((result) => result.json())
      .then((result) => {
        console.log(result.token);
        localStorage.setItem("token", result.token);
      });
  }

  // Render the page
  return (
    <div className="page_content">
      <Container>
          <Row>
            <h2 className="user_detail_text user_detail_content">Login</h2>
          </Row>
          <Row>
            <Form
              className="user_detail_content"
              onSubmit={(event) => {
                event.preventDefault();
                let email = event.target.elements.userLogin.value;
                let password = event.target.elements.userPassword.value;                                            

                loginUser(email, password);
              }}
            >
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  id="userLogin"
                  placeholder="Email..."
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  id="userPassword"
                  placeholder="Password..."
                />
              </FormGroup>
              <Button className="submit-button">Login</Button>
            </Form>
          </Row>
          <Row>
            <p className="user_detail_text user_detail_content">
              Don't have an account? <br></br> Create one{" "}
              <a href="/register">here</a>
            </p>
          </Row>
      </Container>
    </div>
  );
}
