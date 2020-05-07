import React, { useEffect, useState } from "react";
import "../App.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import { Container, Row } from "reactstrap";

import { useHistory } from "react-router-dom";

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

export default function PriceHistory(props) {
  // Setup the table data
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  let history = useHistory();

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

  // let rowData = [
  //   {
  //     id: "row",
  //     open: "",
  //     high: "",
  //     low: "",
  //     close: "",
  //     volumes: "",
  //   },
  // ];

  function getRowNodeId(data) {
    return data.id;
  }

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };


  // useEffect(() => {
  //   let rowNode = gridApi.getRowNode("row");
  //   let url = base_url + props.stock_symbol;
  //   fetch(url)
  //     .then((result) => result.json())
  //     .then((stock) => {
  //       rowNode.setDataValue("date", stock.timestamp);
  //       rowNode.setDataValue("open", stock.open);
  //       rowNode.setDataValue("high", stock.high);
  //       rowNode.setDataValue("low", stock.low);
  //       rowNode.setDataValue("close", stock.close);
  //       rowNode.setDataValue("volumes", stock.volumes);
  //     });
  // });


  // useEffect(() => {
  //   let url = base_url + props.stock_symbol;
  //   fetch(url)
  //     .then((result) => result.json)
  //     .then(data =>
  //       data.map((stock) => {
  //         return {
  //             date: stock.timestamp,
  //             open: stock.open,
  //             close: stock.close,
  //             low: stock.low,
  //             high: stock.high,
  //             volumes: stock.volumes,
  //           };
  //       })
  //     )
  //     .then((stocks) => setRowData(stocks));
  // });


  useEffect(() => {
    let url = base_url + props.stock_symbol;
    let stock_file = fetch(url);
    console.log(JSON.stringify(stock_file));
  })

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
              getRowNodeId={getRowNodeId}
            ></AgGridReact>
          </div>
        </Row>
      </Container>
    </div>
  );
}
