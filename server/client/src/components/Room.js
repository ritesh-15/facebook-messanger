import { CloseOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectUser } from "../features/users/user";
import axios from "../axios";

function Room({ setRoom }) {
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const user = useSelector(selectUser);

  const create = () => {
    if (!image || !name || !type) return;

    const imgform = new FormData();

    imgform.append("file", image);

    axios
      .post("/upload/profile", imgform, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-us,en;q=0.8",
          "Content-Type": `multipart/form-data;boundary=${imgform._boundary}`,
        },
      })
      .then((res) => {
        const data = {
          name: name,
          fileName: res.data.fileName,
          userId: user?.currentUser._id,
          type: type,
        };

        axios
          .post("/new/room", data)
          .then((res) => {
            setRoom(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Main>
        <Close onClick={(e) => setRoom(false)}>
          <CloseOutlined style={{ cursor: "pointer" }} />
        </Close>
        <h1>New room</h1>
        <div>
          <label>Room name</label>
          <input onChange={(e) => setName(e.target.value)} type="text" />
          <label>Choose room type</label>
          <select onChange={(e) => setType(e.target.value)}>
            <option defaultValue value="">
              Room type
            </option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          <label>Choose room profile </label>
          <label htmlFor="file">
            <Avatar
              style={
                image
                  ? {
                      background: `url(${URL.createObjectURL(
                        image
                      )}) no-repeat center center/cover`,
                    }
                  : {
                      background: `url("https://i.stack.imgur.com/l60Hf.png") no-repeat center center/cover`,
                    }
              }
            />
          </label>
          <input
            accept="image/jpeg , images/png"
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button onClick={create}>Create</button>
        </div>
      </Main>
    </Container>
  );
}

export default Room;

const Container = styled.div`
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
  z-index: 10;
  display: flex;
  z-index: 20;
  justify-content: center;
`;

const Close = styled.div`
  margin-left: auto;
  max-width: 30px;
`;

const Avatar = styled.div`
  width: 100%;
  max-width: 90px;
  height: 90px;
  border-radius: 50%;
  cursor: pointer;
  margin: 0 auto;
`;

const Main = styled.div`
  background: #2f3031;
  width: 90%;
  height: 520px;
  max-width: 500px;
  box-shadow: 0 0 30px 10px rgba(0, 0, 0, 0.08);
  padding: 1em 2rem;
  margin-top: 1rem;
  border-radius: 20px;

  h1 {
    text-align: center;
    font-size: 1.3rem;
    font-size: bold;
    color: #fff;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;

    button {
      padding: 0.7em 1em;
      outline: none;
      width: 100%;
      background: #1877f2;
      border: none;
      border-radius: 8px;
      color: #fff;
      cursor: pointer;
      font-size: 1.15rem;
      font-weight: bold;
      max-width: 100%;
      margin-top: 1rem;
    }

    label {
      margin-bottom: 0.5em;
      font-size: 1rem;
    }

    select {
      height: 45px;
      font-size: 1rem;
      outline: none;
      border-radius: 8px;
      border: 1px solid #dddfe2;
      padding: 0 1em;
      margin-bottom: 1rem;
      cursor: pointer;
      background-color: #242526;
      color: #fff;

      &:focus {
        border-color: #1877f2;
      }
    }

    input {
      height: 45px;
      font-size: 1rem;
      outline: none;
      border-radius: 8px;
      border: 1px solid #dddfe2;
      padding: 1em;
      margin-bottom: 1em;
      background-color: #242526;
      color: #fff;

      &:focus {
        border-color: #1877f2;
      }
    }
  }
`;
