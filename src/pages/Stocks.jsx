import React, { useEffect, useState } from "react";
import "../App.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import {
  Container,
  Row,
  Form,
  Label,
  Input,
  Button,
  Col,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";

import { useHistory } from "react-router-dom";

const API_URL = "http://131.181.190.87:3000";

export default function Stocks() {
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  let history = useHistory();

  const columnDefs = [
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
  ];

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  // USE ME TO DEAL WITH ERRORS:
  // https://stackoverflow.com/questions/51859358/how-to-read-json-file-with-fetch-in-javascript

  // Fetch data from URL provided as parameter an set it to the ag-grid
  function setValues(url, industry) {
    fetch(url)
      .then((result) => result.json())
      .then((data) =>
        data.map((stock) => {
          return {
            symbol: stock.symbol,
            name: stock.name,
            industry: stock.industry,
          };
        })
      )
      .then((stocks) => setRowData(stocks))
    .catch(function (error) {
      alert("Industry " + industry + " not found!")
    });
  }

  // Handle the cell rows being clicked
  function onRowClicked(row) {
    // console.log(row.data.symbol);
    history.push("/stocks/" + row.data.symbol);
  }

  // Initially, call the setValues function with the base url to display all data
  useEffect(() => {
    setValues(`${API_URL}/stocks/symbols?`, null);
  }, []);

  // Render the page
  return (
    <div className="page_content">
      <Container>
        <Row>
          <Col>
            <Label for="industry">Filter by industry:</Label>
          </Col>
          <Col xs="auto">
            <Form
              inline
              onSubmit={(event) => {
                event.preventDefault();

                if (event.target.elements.industry.value === "") {
                  let url = `${API_URL}/stocks/symbols?`;
                  setValues(url, null);
                } else {
                  let url_suffix = event.target.elements.industry.value.replace(
                    / /g,
                    "%20"
                  );

                  let url = `${API_URL}/stocks/symbols?industry=` + url_suffix;
                  setValues(url, event.target.elements.industry.value);
                }
              }}
            >
              <InputGroup>
                <Input type="text" name="industry" id="industry" />
                <InputGroupAddon addonType="append">
                  <Button color="secondary">Apply Filter</Button>
                </InputGroupAddon>
              </InputGroup>
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
              pagination={true}
              paginationPageSize={15}
              columnDefs={columnDefs}
              rowData={rowData}
              animateRows={true}
              onGridReady={onGridReady}
              onRowClicked={onRowClicked}
            ></AgGridReact>
          </div>
        </Row>
      </Container>
    </div>
  );
}
