import React from "react";
import styled from "styled-components";
import Message from "./Message";

function Chat() {
  return (
    <Container>
      <ChatTop>
        <Center>
          <Avatar
            style={{
              background: `url(https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60) no-repeat center center/cover`,
            }}
          />
          <Text>
            <h6>ritesh khore</h6>
            <p>You are freind on facebook</p>
            <p>Lives in baramati</p>
          </Text>
        </Center>
      </ChatTop>

      <MessageMain>
        <Message sender />
        <Message sender />
        <Message />
        <Message sender />
      </MessageMain>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChatTop = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
`;

const Avatar = styled.div`
  width: 100%;
  max-width: 70px;
  height: 70px;
  border-radius: 50%;
  cursor: pointer;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Text = styled.div`
  max-width: 100%;
  text-overflow: ellipsis;
  margin-top: 0.5em;
  line-height: 1.5;

  h6 {
    font-size: 1rem;
    font-weight: normal;
    text-transform: capitalize;
    cursor: pointer;
  }

  p {
    font-size: 0.9rem;
    color: #b0b3b8;
    width: 200px;
    text-overflow: ellipsis;
  }
`;

const MessageMain = styled.div`
  height: 100%;
`;
