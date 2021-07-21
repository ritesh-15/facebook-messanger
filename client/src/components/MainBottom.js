import React, { useEffect, useState } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import styled from "styled-components";
import { SendOutlined } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/users/user";
import { selectMessages, setMessages } from "../features/messages/message";
import { setSocket, selectSocket } from "../features/socket/socket";

function MainBottom() {
  const [message, setMessage] = useState("");
  const user = useSelector(selectUser);
  const { id } = useParams();
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);
  const socket = useSelector(selectSocket);
  const [send, setSend] = useState();

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message) return;

    const data = {
      userName: user?.currentUser.userName,
      email: user?.currentUser.emailId,
      photoURL: user?.currentUser.photoURL,
      message: message,
      senderId: user?.currentUser._id,
      recieverId: id,
      roomId: id,
    };

    axios
      .post("/new/message", data)
      .then((res) => {
        setMessage("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Icons>
        <AddCircleIcon
          style={{
            color: "var(--secondary)",
            marginRight: "0.8rem",
            cursor: "pointer",
            fontSize: "1.5rem",
          }}
        />
        <InsertPhotoIcon
          style={{
            color: "var(--secondary)",
            marginRight: "0.8rem",
            cursor: "pointer",
            fontSize: "1.5rem",
          }}
        />
      </Icons>
      <Input>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Aa"
        />
        <button
          type="submit"
          style={{ display: "none" }}
          onClick={(e) => sendMessage(e)}
        >
          submit
        </button>
        <EmojiEmotionsIcon
          style={{
            color: "var(--secondary)",
            marginRight: "0.8rem",
            cursor: "pointer",
            fontSize: "1.5rem",
          }}
        />
      </Input>

      {message ? (
        <SendOutlined
          style={{
            color: "var(--secondary)",
            marginRight: "0.8rem",
            cursor: "pointer",
            fontSize: "1.5rem",
            marginLeft: "1rem",
          }}
          onClick={(e) => sendMessage(e)}
        />
      ) : (
        <ThumbUpAltIcon
          style={{
            color: "var(--secondary)",
            marginRight: "0.8rem",
            cursor: "pointer",
            fontSize: "1.5rem",
            marginLeft: "1rem",
          }}
        />
      )}
    </Container>
  );
}

export default MainBottom;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em 0;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.form`
  display: flex;
  align-items: center;
  flex: 1;
  width: 100%;
  background: #f0f2f5;
  padding: 0.3em 1em;
  border-radius: 999px;

  input {
    width: 100%;
    height: 100%;
    background: #f0f2f5;
    color: #65676b;
    outline: none;
    border: none;
    resize: none;
    font-size: 1rem;
    font-family: "Segoe UI", sans-serif;
  }
`;
