import React, { Component } from "react";
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
          sortable: true,
        },
        {
          headerName: "Symbol",
          field: "symbol",
          sortable: true,
        },
        {
          headerName: "Industry",
          field: "industry",
          sortable: true,
        },
      ],
      rowData: [
        {
          id: "row",
          symbol: "",
          name: "",
          industry: "",
        },
      ],
      getRowNodeId: function (data) {
        return data.id;
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  // Fetch stocks from API and populate table row data
  componentDidMount() {
    fetch(all_url)
      .then((result) => result.json())
      .then((rowData) => this.setState({ rowData }));
  }

  setValues = (url) => {
    let rowNode = this.gridApi.getRowNode("row");
    fetch(url)
      .then((result) => result.json())
      .then((out) => {
        rowNode.setDataValue("symbol", out.symbol);
        rowNode.setDataValue("name", out.name);
        rowNode.setDataValue("industry", out.industry);
      });
  };

  render() {
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
                  let url_suffix = event.target.elements.industry.value.replace(
                    / /g,
                    "%20"
                  );
                  let url = industry_url + url_suffix;
                  console.log(url)
                  this.setValues(url);
                }}
              >
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Label for="industry" className="mr-sm-2">
                    Stock Symbol
                  </Label>
                  <Input type="text" name="industry" id="industry" />
                </FormGroup>
                <Button>Search</Button>
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
                columnDefs={this.state.columnDefs}
                rowData={this.state.rowData}
                animateRows={true}
                getRowNodeId={this.state.getRowNodeId}
                onGridReady={this.onGridReady}
                onFirstDataRendered={this.onFirstDataRendered.bind(this)}
              ></AgGridReact>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Stocks;
