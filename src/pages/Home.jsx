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
          Welcome to Super Stocks, the best portal for stock analytics on the market! 
          To view stocks please click the stocks button in the top right, then you may
          select a specific stock to see more information.
          <br></br><br></br>
          Please consider registering an account to access more functionality!
        </p>
      </div>
  </Container>
);



