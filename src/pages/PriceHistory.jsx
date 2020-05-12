import React, { useEffect, useState } from "react";
import "../App.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import { Container, Row } from "reactstrap";

const base_url = "http://131.181.190.87:3000/stocks/";


export default function PriceHistory(props) {
  // Setup the table data
  const [rowData, setRowData] = useState();
  const [gridApi, setGridApi] = useState(null);

  const columnDefs = [
    {
      headerName: "Date",
      field: "date",
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
      headerName: "Low",
      field: "low",
    },
    {
      headerName: "High",
      field: "high",
    },
    {
      headerName: "Volumes",
      field: "volumes",
    },
  ];

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  function dateFormatter(timestamp) {
    let date = new Date(timestamp);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }

    return year + "-" + month + "-" + day;
  }

  useEffect(() => {
    let url = base_url + props.stock_symbol;
    fetch(url)
      .then((result) => result.json())
      .then((stock) => {
        return [{
            date: dateFormatter(stock.timestamp),
            open: stock.open,
            close: stock.close,
            low: stock.low,
            high: stock.high,
            volumes: stock.volumes,
        }];
      })
      .then(stocks => setRowData(stocks))
      .catch(function (error) {
        console.log(error);
      });
  });

  // Render the page
  return (
    <div className="page_content">
      <Container>
        <p>{props.stock_symbol}</p>

        <Row>
          <div
            className="ag-theme-material"
            style={{
              width: "100%",
            }}
          >
            <AgGridReact
              domLayout={"autoHeight"}
              columnDefs={columnDefs}
              rowData={rowData}
              animateRows={true}
              onGridReady={onGridReady}
            ></AgGridReact>
          </div>
        </Row>
      </Container>
    </div>
  );
}
