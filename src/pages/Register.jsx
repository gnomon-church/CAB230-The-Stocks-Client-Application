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

const API_URL = "http://131.181.190.87:3000";

export default function Register() {
  function registerUser(email, password) {
    const url = `${API_URL}/user/register`;

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
        console.log(result);
      });
  }

  // Render the page
  return (
    <div className="page_content">
      <Container>
        <Col>
          <Row>
            <h2 className="user_detail_text user_detail_content">Register</h2>
          </Row>
          <Row>
            <Form
              className="user_detail_content"
              onSubmit={(event) => {
                event.preventDefault();
                let email = event.target.elements.userLogin.value;
                let password = event.target.elements.userPassword.value;
                registerUser(email, password);
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
              Already have an account? <br></br> Login <a href="/login">here</a>
            </p>
          </Row>
        </Col>
      </Container>
    </div>
  );
}
