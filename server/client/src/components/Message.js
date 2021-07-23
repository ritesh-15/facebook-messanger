import React, { useState } from "react";
import styled from "styled-components";

function Message({ sender, message, profile, image }) {
  const [error, setError] = useState(true);
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
      <div>
        {image && (
          <ImageDiv
            style={
              error
                ? {
                    backgroundColor: "rgba(199, 199, 199, 0.2)",
                    animation: "loading infinite  2.5s ease",
                  }
                : {
                    backgroundColor: "transparent",
                    animation: "none",
                  }
            }
          >
            <img
              className="img"
              src={image}
              onLoad={(e) => setError(false)}
              onError={() => {
                setError(true);
                document.querySelectorAll("img").forEach((div) => {
                  div.style.display = "none";
                });
              }}
            />
          </ImageDiv>
        )}
        {message && (
          <Content
            style={
              sender
                ? {
                    background: "#0084FF",
                    marginRight: "0.5rem",
                    color: "#fff",
                  }
                : { background: " #3a3b3c" }
            }
          >
            <p>{message}</p>
          </Content>
        )}
      </div>
    </Container>
  );
}

export default Message;

const ImageDiv = styled.div`
  width: 100%;
  height: 250px;
  min-width: 400px;
  border: none !important;
  overflow: hidden;
  position: relative;
  border-radius: 20px;

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
  }

  img {
    width: 100%;
    object-fit: contain;
    height: 100%;
    max-width: 400px;
    border-radius: 20px;
    border: none !important;
    z-index: 10;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  margin: 1.5rem 0;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  font-size: 1rem;
  width: fit-content;
  max-width: 400px;
  background: #3a3b3c;
  height: 100%;
  margin-left: 0.5em;
  color: #e4e6eb;
  font-weight: 500;
  padding: 0.2rem 1em !important;

  p {
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
