import React, { Component } from "react";
import "../App.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import {
  Container,
  Row,
  FormGroup,
  Label,
  Form,
  Input,
  Button,
} from "reactstrap";

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
      rowData: [],
    };
  }

  // Fetch stocks from API and populate table row data
  componentDidMount() {
    const url = "http://131.181.190.87:3000/stocks/symbols";
    fetch(url)
      .then((result) => result.json())
      .then((rowData) => this.setState({ rowData }));
  }


  render() {
    return (
      <div className="page_content">
        <Container>
          <Row>
            <Form inline>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="industrySelect" className="mr-sm-2">
                  Filter by Industry
                </Label>
                <Input type="select" name="select" id="industrySelect">
                  <option >All</option>
                  <option >Consumer Discretionary</option>
                  <option >Consumer Staples</option>
                  <option >Energy</option>
                  <option >Financials</option>
                  <option >Health Care</option>
                  <option >Industrials</option>
                  <option >Information Technology</option>
                  <option >Materials</option>
                  <option >Real Estate</option>
                  <option >Telecommunication Services</option>
                  <option >Utilities</option>
                </Input>
              </FormGroup>
              <Button>Filter</Button>
            </Form>
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
                enableSorting={true}
                columnDefs={this.state.columnDefs}
                rowData={this.state.rowData}
              ></AgGridReact>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Stocks;
