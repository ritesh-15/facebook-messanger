import React from "react";
import styled from "styled-components";

function Message({ sender, message, profile, image }) {
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
            ? { background: "#0084FF", marginRight: "0.5rem", color: "#fff" }
            : { background: " #3a3b3c" }
        }
      >
        {image && (
          <div>
            <img src={image} />
          </div>
        )}
        {message && <p>{message}</p>}
      </Content>
    </Container>
  );
}

export default Message;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  margin: 1.5rem 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  font-size: 1rem;
  width: fit-content;
  max-width: 500px;
  background: #3a3b3c;
  height: 100%;
  margin-left: 0.5em;
  color: #e4e6eb;
  font-weight: 500;

  div {
    width: 100%;
    height: 300px;
    background-color: rgba(0, 0, 0, 0.4);
    min-width: 500px;
    border-radius: 20px;

    img {
      width: 100%;
      object-fit: cover;
      height: 300px;
      border-radius: 20px;
    }
  }

  p {
    line-height: 1.5;
    padding: 0.2rem 1em;
  }
`;

const Avatar = styled.div`
  width: 100%;
  max-width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
`;
