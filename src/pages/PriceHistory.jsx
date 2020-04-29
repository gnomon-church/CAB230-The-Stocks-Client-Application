import React, { Component } from "react";
import "../App.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import { Container, Row } from "reactstrap";

const base_url = "http://131.181.190.87:3000/stocks/";

// let date = new Date(out.timestamp);

// let year = date.getFullYear();
// let month = date.getMonth() + 1;
// let day = date.getDate();

// if (day < 10) {
//   day = "0" + day;
// }
// if (month < 10) {
//   month = "0" + month;
// }

// rowNode.setDataValue("timestamp", year + "/" + month + "/" + day);

class PriceHistory extends Component {
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

  componentDidMount = () => {
    let url = base_url + this.props.stock_symbol;
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

  // componentDidMount = () => {
  //   let url = base_url + this.props.stock_symbol;
  //   console.log(url);

  //   fetch(url)
  //     .then((result) => result.json())
  //     .then((rowData) => this.setState({ rowData }));
  // };

  // Render the page
  render() {
    return (
      <div className="page_content">
        <Container>
          <p>{this.props.stock_symbol}</p>

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
                onGridReady={this.onGridReady}
                getRowNodeId={this.state.getRowNodeId}
                rowSelection={this.state.rowSelection}
              ></AgGridReact>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default PriceHistory;
