import React from "react";
import "../App.css";

import {
  Container,
  Row,
  Form,
  Button,
} from "reactstrap";

import { useHistory } from "react-router-dom";


export default function Logout() {
  let history = useHistory();

  // Render the page
  return (
    <div className="page_content">
      <Container>
        <Row>
          <h2 className="user_detail_text user_detail_content">Logout</h2>
        </Row>
        <Row>
          <p>Are you sure you wan't to logout?</p>
        </Row>
        <Row>
          <Form
            className="user_detail_content"
            onSubmit={(event) => {
              event.preventDefault();
              localStorage.removeItem("token");
              history.push("/stocks");
              window.location.reload();
            }}
          >
            <Button className="submit-button">Logout</Button>
          </Form>
        </Row>
      </Container>
    </div>
  );
}
