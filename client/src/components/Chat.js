import axios from "../axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/users/user";
import {
  setMessages,
  selectMessages,
  setNewMessage,
} from "../features/messages/message";
import { selectSocket } from "../features/socket/socket";

function Chat() {
  const { id } = useParams();
  const [room, setRoom] = useState();
  const [messages, setMessages] = useState([]);
  const user = useSelector(selectUser);
  const socket = useSelector(selectSocket);

  useEffect(() => {
    axios
      .get(`/get/messages/${id}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  useEffect(() => {
    const container = document.getElementById("message-div");
    container.scrollTop = container.scrollHeight;
  }, [messages]);

  useEffect(() => {
    axios
      .get(`/get/details/${id}`)
      .then((res) => setRoom(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <Container>
      <ChatTop>
        <Center>
          <Avatar
            style={{
              background: `url(${room?.roomPhotoURL}) no-repeat center center/cover`,
            }}
          />
          <Text>
            <h6>{room?.roomName}</h6>
            <p>Created by {room?.roomOwner.userName}</p>
            <p>Published at {new Date(room?.createdAt).toLocaleDateString()}</p>
          </Text>
        </Center>
      </ChatTop>

      <MessageMain id="message-div">
        {messages?.map((msg) => {
          if (msg.senderId === user?.currentUser._id) {
            return (
              <Message
                key={msg._id}
                message={msg.message}
                profile={msg.photoURL}
                image={msg.image}
                sender
              />
            );
          } else if (msg.senderId !== user?.currentUser._id) {
            return (
              <Message
                key={msg._id}
                message={msg.message}
                profile={msg.photoURL}
                image={msg.image}
              />
            );
          }
        })}
      </MessageMain>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

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
  width: 100%;
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
