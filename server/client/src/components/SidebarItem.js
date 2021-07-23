import React from "react";
import styled from "styled-components";

function SidebarItem({ img, name, message, active, lastMsg }) {
  return (
    <Container
      style={active ? { background: "#252F3C " } : { background: "inherit" }}
    >
      <Avatar
        style={{
          background: `url(${img}) no-repeat center center/cover`,
        }}
      />
      <Text>
        <h6>{name}</h6>
        <p>{lastMsg}</p>
      </Text>
    </Container>
  );
}

export default SidebarItem;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5em 0;
  padding-left: 0.4em;
  transition: all 0.25s ease-in;
  border-radius: 10px;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: #3a3b3c !important;
  }
`;

const Avatar = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  cursor: pointer;
`;

const Text = styled.div`
  margin-left: 1rem;
  max-width: 200px;
  text-overflow: ellipsis;

  h6 {
    font-size: 1rem;
    font-weight: normal;
    text-transform: capitalize;
    color: #e4e6eb;
  }

  p {
    font-size: 0.8rem;
    margin-top: 0.25rem;
    color: #8f959b;
    width: 200px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
