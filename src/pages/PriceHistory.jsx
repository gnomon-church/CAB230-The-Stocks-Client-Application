import React, { useEffect, useState } from "react";
import "../App.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import { Container, Row, Form, Button } from "reactstrap";

const API_URL = "http://131.181.190.87:3000";
const token = localStorage.getItem("token");
const headers = {
  accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

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

  // Format date into more readable format
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

  // Set table data
  function setValues(url) {
    if (token !== null) {
      fetch(url, { headers })
        .then((result) => result.json())
        .then((data) =>
          data.map((stock) => {
            if (data.error === true) {
              alert(data.message)
            }
            return {
              date: dateFormatter(stock.timestamp),
              open: stock.open,
              close: stock.close,
              low: stock.low,
              high: stock.high,
              volumes: stock.volumes,
            };
          })
        )
        .then((stocks) => setRowData(stocks))
        .catch(function (error) {
          alert("Invalid date range!")
        });
    } else {
      alert("You must be logged in to perform this action!");
    }
  }

  // Set initial table data
  function initialSetValues() {
    let url = `${API_URL}/stocks/${props.stock_symbol}`;

    fetch(url)
      .then((result) => result.json())
      .then((stock) => {
        return [
          {
            date: dateFormatter(stock.timestamp),
            open: stock.open,
            close: stock.close,
            low: stock.low,
            high: stock.high,
            volumes: stock.volumes,
          },
        ];
      })
      .then((stocks) => setRowData(stocks))
      .catch(function (error) {
        console.log(error);
      });
  }

  // Call initialSetValues on page render
  useEffect(() => {
    initialSetValues();
  }, []);


  let date_selector

  if (token !== null) {
    date_selector = (
      <Row>
        <label htmlFor="first_date">From: </label>
        <input type="date" id="first_date" />
        <label htmlFor="second_date">to: </label>
        <input type="date" id="second_date" />
        <Button>Apply</Button>
      </Row>
    );
  } else {
    date_selector = 
      <p>Please login to view more dates</p>
  }

  // Render the page
  return (
    <div className="page_content">
      <Container>
        <Row>
          <h2>{props.stock_symbol}</h2>
        </Row>

        <Form
          onSubmit={(event) => {
            event.preventDefault();
            let start_date = event.target.elements.first_date.value;
            let end_date = event.target.elements.second_date.value;

            let url_suffix =
              "/stocks/authed/" +
              props.stock_symbol +
              "?from=" +
              start_date +
              "&to=" +
              end_date;
            console.log(API_URL + url_suffix);
            setValues(API_URL + url_suffix);
          }}
        >
          {date_selector}
        </Form>

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
              pagination={true}
              paginationPageSize={15}
            ></AgGridReact>
          </div>
        </Row>
      </Container>
    </div>
  );
}
