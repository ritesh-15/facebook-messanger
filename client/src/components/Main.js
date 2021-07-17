import React from "react";
import styled from "styled-components";
import Chat from "./Chat";
import MainTop from "./MainTop";
import MainBottom from "./MainBottom";

function Main() {
  return (
    <Container>
      <MainTop />
      <Chat />
      <MainBottom />
    </Container>
  );
}

export default Main;

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  padding-bottom: 0;
  height: 100vh;
  display: grid;
  grid-template-rows: 0.25fr 3fr 0.13fr;
`;
