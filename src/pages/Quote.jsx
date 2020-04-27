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

const base_url = "http://131.181.190.87:3000/stocks/";

class Quote extends Component {
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
      ],
      rowData: [
        {
          id: "row",
          symbol: "",
          name: "",
          industry: "",
          open: "",
          high: "",
          low: "",
          close: "",
          volumes: "",
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
    this.gridColumnApi.autoSizeColumns();
  };

  setValues = (url) => {
    let rowNode = this.gridApi.getRowNode("row");
    fetch(url)
      .then((result) => result.json())
      .then((out) => {
        rowNode.setDataValue("symbol", out.symbol);
        rowNode.setDataValue("name", out.name);
        rowNode.setDataValue("industry", out.industry);
        rowNode.setDataValue("open", out.open);
        rowNode.setDataValue("high", out.high);
        rowNode.setDataValue("low", out.low);
        rowNode.setDataValue("close", out.close);
        rowNode.setDataValue("volumes", out.volumes);
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
                  let url_suffix = event.target.elements.stockSymbol.value.toUpperCase();
                  let url = base_url + url_suffix;
                  this.setValues(url);
                }}
              >
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Label for="stockSymbol" className="mr-sm-2">
                    Indsutry
                  </Label>
                  <Input type="text" name="stockSymbol" id="stockSymbol" />
                </FormGroup>
                <Button>Filter</Button>
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

export default Quote;
