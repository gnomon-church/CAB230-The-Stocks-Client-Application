import React, { Component } from "react";
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
import { useHistory, Redirect } from "react-router-dom";

const base_url = "http://131.181.190.87:3000/stocks/";
const all_url = "http://131.181.190.87:3000/stocks/symbols?";
const industry_url = "http://131.181.190.87:3000/stocks/symbols?industry=";

class Stocks extends Component {
  // Setup the table data
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
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
      ],
      rowSelection: "single",
      rowData: [],
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onFirstDataRendered = () => {
    this.gridApi.sizeColumnsToFit();
  };

  // Handle 
  onSelectionChanged = () => {
    let selectedRow = this.gridApi.getSelectedRows();
    console.log(selectedRow[0].symbol);
    let url = base_url + selectedRow[0].symbol;
    console.log(url);
    return (
      <Redirect to="/AAL" />
    );
  };

  // Fetch data from URL provided as parameter an set it to the ag-grid
  setValues = (url) => {
    fetch(url)
      .then((result) => result.json())
      .then((rowData) => this.setState({ rowData }));
  };

  // Initially, can the setValues function with the url to display all data
  componentDidMount() {
    this.setValues(all_url);
  }

  // Render the page
  render() {
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
                    this.setValues(all_url);
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
                    this.setValues(url);
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
                columnDefs={this.state.columnDefs}
                rowData={this.state.rowData}
                animateRows={true}
                getRowNodeId={this.state.getRowNodeId}
                onGridReady={this.onGridReady}
                onFirstDataRendered={this.onFirstDataRendered.bind(this)}
                onSelectionChanged={this.onSelectionChanged.bind(this)}
                rowSelection={this.state.rowSelection}
              ></AgGridReact>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Stocks;
