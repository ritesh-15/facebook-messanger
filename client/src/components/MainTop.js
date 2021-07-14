import React from "react";
import styled from "styled-components";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";
import VideocamIcon from "@material-ui/icons/Videocam";
import ErrorIcon from "@material-ui/icons/Error";

function MainTop() {
  return (
    <Container>
      <Left>
        <Avatar
          style={{
            background: `url(https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60) no-repeat center center/cover`,
          }}
        />
        <Text>
          <h6>ritesh khore</h6>
          <p>Active 29 min ago</p>
        </Text>
      </Left>
      <Right>
        <LocalPhoneIcon
          style={{
            color: "var(--secondary)",
            marginRight: "0.8rem",
            cursor: "pointer",
            fontSize: "1.8rem",
          }}
        />
        <VideocamIcon
          style={{
            color: "var(--secondary)",
            marginRight: "0.8rem",
            cursor: "pointer",
            fontSize: "1.8rem",
          }}
        />
        <ErrorIcon
          style={{
            color: "var(--secondary)",
            marginRight: "0.8rem",
            cursor: "pointer",
            fontSize: "1.8rem",
          }}
        />
      </Right>
    </Container>
  );
}

export default MainTop;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5em;
  border-bottom: 1px solid #393a3b;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
`;

const Avatar = styled.div`
  width: 100%;
  max-width: 50px;
  height: 50px;
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
    font-weight: bold;
    cursor: pointer;
  }

  p {
    font-size: 0.9rem;
    color: #b0b3b8;
    width: 200px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Right = styled.div``;
