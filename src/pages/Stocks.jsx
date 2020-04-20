import React, { Component } from "react";
import "../App.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import { Container, Row } from "reactstrap";

let url = "http://131.181.190.87:3000/stocks/symbols?";

class Stocks extends Component {
  // Setup the table data
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: "Name",
          field: "name",
          filter: "agTextColumnFilter",
          filterParams: { defaultOption: "contains" },
          suppressAndOrCondition: true,
        },
        {
          headerName: "Symbol",
          field: "symbol",
          filter: "agTextColumnFilter",
          filterParams: { defaultOption: "contains" },
          suppressAndOrCondition: true,
        },
        {
          headerName: "Industry",
          field: "industry",
          filter: "agTextColumnFilter",
          filterParams: { defaultOption: "contains" },
          suppressAndOrCondition: true,
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

  // state.api.sizeColumnsToFit()

  render() {
    
    return (
      <div className="page_content">
        <Container>
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
                floatingFilter={true}
                animateRows={true}
              ></AgGridReact>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Stocks;
