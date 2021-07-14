import React, { useState } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import GifIcon from "@material-ui/icons/Gif";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import styled from "styled-components";
import { SendOutlined } from "@material-ui/icons";

function MainBottom() {
  const [message, setMessage] = useState("");

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

const Input = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  width: 100%;
  background: var(--bg);
  padding: 0.3em 1em;
  border-radius: 999px;

  input {
    width: 100%;
    height: 100%;
    background: transparent;
    color: #fff;
    outline: none;
    border: none;
    resize: none;
    font-size: 1rem;
    font-family: "Segoe UI", sans-serif;
  }
`;
