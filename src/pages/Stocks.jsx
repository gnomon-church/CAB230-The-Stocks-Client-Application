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
  ButtonGroup,
} from "reactstrap";

// let url = "http://131.181.190.87:3000/stocks/symbols?";
let url;

function ConsumerDiscretionary() {
  url =
    "http://131.181.190.87:3000/stocks/symbols?industry=Consumer%20Discretionary";
  return <Stocks />;
}

function ConsumerStaples() {
  return <Stocks />;
}

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
              <ButtonGroup vertical>
                <Row>
                  <ButtonGroup>
                    <Button href="/stocks">All</Button>
                    <Button href="/stocks/consumerdiscretionary">
                      Consumer Discretionary
                    </Button>
                    <Button href="/stocks/consumerstaples">
                      Consumer Staples
                    </Button>
                    <Button>Energy</Button>
                    <Button>Financials</Button>
                    <Button>Health Care</Button>
                  </ButtonGroup>
                </Row>
                <Row>
                  <ButtonGroup>
                    <Button>Industrials</Button>
                    <Button>Information Technology</Button>
                    <Button>Materials</Button>
                    <Button>Real Estate</Button>
                    <Button>Telecommunication Services</Button>
                    <Button>Utilities</Button>
                  </ButtonGroup>
                </Row>
              </ButtonGroup>
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
export { ConsumerDiscretionary, ConsumerStaples };
