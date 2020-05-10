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

const all_url = "http://131.181.190.87:3000/stocks/symbols?";
const industry_url = "http://131.181.190.87:3000/stocks/symbols?industry=";

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
  function setValues(url) {
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
      .then((stocks) => setRowData(stocks));
  }

  // Handle the cell rows being clicked
  function onRowClicked(row) {
    // console.log(row.data.symbol);
    history.push("/stocks/" + row.data.symbol);
  }

  // Initially, call the setValues function with the base url to display all data
  useEffect(() => {
    setValues(all_url);
  }, []);

  // Render the page
  return (
    <div className="page_content">
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <Label for="industry">Filter by industry:</Label>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col xs="auto">
            <InputGroup>
              <Form
                inline
                onSubmit={(event) => {
                  event.preventDefault();
                  setValues(all_url);
                }}
              >
                <InputGroupAddon addonType="prepend">
                  <Button color="secondary">Clear Filter</Button>
                </InputGroupAddon>
              </Form>
              <Form
                inline
                onSubmit={(event) => {
                  event.preventDefault();
                  let url_suffix = event.target.elements.industry.value.replace(
                    / /g,
                    "%20"
                  );

                  let url = industry_url + url_suffix;
                  setValues(url);
                }}
              >
                <Input type="text" name="industry" id="industry" />
                <InputGroupAddon addonType="append">
                  <Button color="secondary">Apply Filter</Button>
                </InputGroupAddon>
              </Form>
            </InputGroup>
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
              // getRowNodeId={getRowNodeId}
              onGridReady={onGridReady}
              onRowClicked={onRowClicked}
              // onFirstDataRendered={onFirstDataRendered.bind(this)}
              // onSelectionChanged={onSelectionChanged.bind(this)}
              // rowSelection={rowSelection}
            ></AgGridReact>
          </div>
        </Row>
      </Container>
    </div>
  );
}
