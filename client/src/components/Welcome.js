import React from "react";
import styled from "styled-components";

function Welcome() {
  return (
    <Container>
      <Main>
        <img src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c526.png" />
        <h1>Welcome to messanger</h1>
      </Main>
    </Container>
  );
}

export default Welcome;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.div`
  max-width: 300px;
  text-align: center;

  img {
    width: 100%;
    object-fit: contain;
    max-width: 150px;
    margin: 0 auto;
  }

  h1 {
    text-align: center;
    margin-top: 1rem;
    text-transform: capitalize;
  }
`;
