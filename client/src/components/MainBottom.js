import React, { useEffect, useState } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import styled from "styled-components";
import { Close, SendOutlined } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { selectUser } from "../features/users/user";
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";

function MainBottom() {
  const [message, setMessage] = useState("");
  const user = useSelector(selectUser);
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const send = (e) => {
    e.preventDefault();
    if (!image) return;
    setLoading(true);
    const formdata = new FormData();
    formdata.append("file", image);

    axios
      .post("/upload/profile", formdata)
      .then((res) => {
        const data = {
          userName: user?.currentUser.userName,
          email: user?.currentUser.emailId,
          photoURL: user?.currentUser.photoURL,
          message: message,
          senderId: user?.currentUser._id,
          recieverId: id,
          roomId: id,
          image: `http://localhost:9000/profile/${res.data.fileName}`,
        };

        axios
          .post("/new/message", data)
          .then((res) => {
            setLoading(false);
            setMessage("");
            setImage("");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

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
      image: "",
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
        <label htmlFor="image">
          <AddCircleIcon
            style={{
              color: "var(--secondary)",
              marginRight: "0.8rem",
              cursor: "pointer",
              fontSize: "1.5rem",
            }}
          />
        </label>

        <input
          accept="image/png , image/jpg , image/jpeg"
          type="file"
          id="image"
          style={{ display: "none" }}
          onChange={(e) => setImage(e.target.files[0])}
        />

        <label htmlFor="image">
          <InsertPhotoIcon
            style={{
              color: "var(--secondary)",
              marginRight: "0.8rem",
              cursor: "pointer",
              fontSize: "1.5rem",
            }}
          />
        </label>
      </Icons>

      <MessageImg
        style={
          !image
            ? { transform: "translateY(100vh) translateX(-16px)" }
            : { transform: "translateY(0) translateX(-16px)" }
        }
      >
        {loading && (
          <Loading>
            <CircularProgress style={{ color: "#0084FF" }} />
          </Loading>
        )}

        <Preview>
          <CloseBtn
            onClick={(e) => setImage("")}
            style={{ cursor: "pointer" }}
          />
          <h1>Preview</h1>
        </Preview>

        <ImagePrev>
          <img
            style={loading ? { opacity: "0.5" } : { opacity: "1" }}
            src={image && URL.createObjectURL(image)}
          />
        </ImagePrev>
        <Text>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Add a caption..."
          />
          <button onClick={send} type="submit" style={{ display: "none" }} />
          <SendOutlined
            style={{
              color: "var(--secondary)",
              marginRight: "0.8rem",
              cursor: "pointer",
              fontSize: "2rem",
              marginLeft: "1rem",
            }}
            onClick={(e) => sendMessage(e)}
          />
        </Text>
      </MessageImg>

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

const Loading = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  top: 40%;
  left: 45%;
  z-index: 10;
`;

const CloseBtn = styled(Close)``;

const MessageImg = styled.div`
  position: fixed;
  top: 4.7rem;
  background: #3a3b3c;
  width: 90%;
  transition: all 0.25s ease-in;
  height: 100%;
  padding: 1rem;
  transform-origin: bottom;
`;

const Preview = styled.div`
  display: flex;
  align-items: center;

  h1 {
    font-size: 1.25rem;
    margin-left: 1rem;
  }
`;

const ImagePrev = styled.div`
  width: 100%;
  height: 100%;
  max-height: 500px;
  margin: 2rem auto;
  transform: translateX(-4rem);
  max-width: 650px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Text = styled.form`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  transform: translateX(-4rem);
  display: flex;
  align-items: center;

  input {
    width: 100%;
    height: 40px;
    padding: 0 1em;
    outline: none;
    border: none;
    background: transparent;
    font-size: 1rem;
    color: #fff;
    border-bottom: 2px solid var(--secondary);
  }
`;

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
  background: #3a3b3c;
  padding: 0.3em 1em;
  border-radius: 999px;

  input {
    width: 100%;
    height: 100%;
    max-height: 30px;
    background: #3a3b3c;
    color: #fff;
    outline: none;
    border: none;
    resize: none;
    font-size: 1rem;
    font-family: "Segoe UI", sans-serif;
  }
`;
