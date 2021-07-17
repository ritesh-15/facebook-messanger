import React from "react";
import styled from "styled-components";

function Message({ sender, message, profile }) {
  return (
    <Container
      style={
        sender
          ? {
              justifyContent: "flex-start",
              flexDirection: "row-reverse",
            }
          : { justifyContent: "flex-start", flexDirection: "row" }
      }
    >
      <Avatar
        style={{
          background: `url(${profile}) no-repeat center center/cover`,
        }}
      />
      <Content
        style={
          sender
            ? { background: "var(--secondary)", marginRight: "0.5rem" }
            : { background: " var(--bg)" }
        }
      >
        <p>{message}</p>
      </Content>
    </Container>
  );
}

export default Message;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  margin: 1rem 0;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  border-radius: 20px;
  font-size: 1rem;
  width: fit-content;
  max-width: 500px;
  background: var(--bg);
  padding: 0.7em 1em;
  height: 100%;
  margin-left: 0.5em;

  p {
    margin: 0;
    line-height: 1.5;
  }
`;

const Avatar = styled.div`
  width: 100%;
  max-width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
`;
