import React from "react";
import styled from "styled-components";

function Message({ sender }) {
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
          background: `url(https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60) no-repeat center center/cover`,
        }}
      />
      <Content
        style={
          sender
            ? { background: "var(--secondary)", marginRight: "0.5rem" }
            : { background: " var(--bg)" }
        }
      >
        <p>
          Dear all, Virtual lab session of basic Electronics Engineering is
          scheduled tomorrow at 2:45 pm... This session is for all three classes
          FE-1,2,3. It's mandatory to attend session Link will be posted 10 min
          before scheduled time on your classroom...
        </p>
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
  max-width: 300px;
  background: var(--bg);
  padding: 0.6em 1em;
  height: 100%;
  margin-left: 0.5em;

  p {
    margin: 0;
  }
`;

const Avatar = styled.div`
  width: 100%;
  max-width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
`;
