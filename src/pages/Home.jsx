import React from "react";
import { Container } from "reactstrap";

export default function Home() {
  return (
    <main>
      <HomeContent />
    </main>
  );
}

// Home content
const HomeContent = () => (
  <Container>
      <div className="page_content">
        <p>
          Welcome to the Stock Analyst portal. Click on Stocks to see the
          available companies, Quote to get the latest price information by stock
          symbol, or choose Price History to sample from the most recent one
          hundred days of information for any particular stock.
        </p>
      </div>
  </Container>
);



