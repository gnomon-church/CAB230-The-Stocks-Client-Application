import React, { Component, useState, useEffect } from "react";
import "../App.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import {
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
} from "reactstrap";

const base_url = "http://131.181.190.87:3000/stocks/AAL";


export default function Quote() {
  const [rowData, setRowData] = useState([]);

  // Setup the table data
  const columns = [
    {
      headerName: "Timestamp",
      field: "timestamp",
    },
    {
      headerName: "Name",
      field: "name",
    },
    {
      headerName: "Symbol",
      field: "symbol",
    },
    {
      headerName: "Industry",
      field: "industry",
    },
    {
      headerName: "Open",
      field: "open",
    },
    {
      headerName: "Close",
      field: "close",
    },
    {
      headerName: "High",
      field: "high",
    },
    {
      headerName: "Low",
      field: "low",
    },
    {
      headerName: "Volumes",
      field: "volumes",
    },
  ];

  useEffect(() => {
    fetch(base_url)
      .then((res) => res.json())
      .then(console.log(res.json()))
      .then((data) =>
        data.map((book) => {
          return {
            timestamp: book.timestamp,
            symbol: book.symbol,
            name: book.name,
            industry: book.industry,
            open: book.open,
            high: book.high,
            low: book.low,
            close: book.close,
            volumes: book.volumes,
          };
        })
      )
      .then((books) => setRowData(books));
  }, []);

  return (
    <div className="page_content">
      <Container>
        <Row>
          <Col></Col>
          <Col xs="auto">
            <Form
              inline
              onSubmit={(event) => {
                event.preventDefault();
                let url_suffix = event.target.elements.stockSymbol.value;
                let url = base_url + url_suffix;
              }}
            >
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="stockSymbol" className="mr-sm-2">
                  Stock Symbol
                </Label>
                <Input type="text" name="stockSymbol" id="stockSymbol" />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <div
            className="ag-theme-material"
            style={{
              width: "100%",
            }}
          >
            <AgGridReact
              domLayout={"autoHeight"}
              columnDefs={columns}
              rowData={rowData}
              animateRows={true}
            ></AgGridReact>
          </div>
        </Row>
      </Container>
    </div>
  );
}

