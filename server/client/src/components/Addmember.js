import React, { useState } from "react";
import axios from "../axios";
import styled from "styled-components";
import { CloseOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { selectUser } from "../features/users/user";

function Addmember({ setAdd, room }) {
  const [user, setUser] = useState();
  const [error, setError] = useState(false);
  const activeUser = useSelector(selectUser);

  const updateUser = () => {
    axios
      .post("/add/user/room", {
        email: user.emailId,
        id: room.roomId,
        name: room.roomName,
        data: room,
      })
      .then((res) => {
        setAdd(false);
        axios
          .get(`/update/room/users?roomId=${room.roomId}`)
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const checkUser = (e) => {
    if (e.target.value.length > 7) {
      setError(true);
      axios
        .get(`/user/${e.target.value}`)
        .then((res) => {
          if (res.data) {
            setError(false);
          }
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const alreadyAdded = () => {
    if (user?.rooms.length === 0) return true;

    let done;
    user.rooms.map((r) => {
      if (r.roomId === room.roomId) {
        done = false;
      } else {
        done = true;
      }
    });

    return done;
  };

  return (
    <Container>
      <Main>
        <Close onClick={(e) => setAdd(false)}>
          <CloseOutlined style={{ cursor: "pointer" }} />
        </Close>
        <h1>Add a member</h1>
        <div>
          <label>Person's email id</label>
          <input
            style={user ? { borderColor: "green" } : { borderColor: "#dddfe2" }}
            onChange={checkUser}
            type="email"
          />
          {error && <span>No user found !</span>}
        </div>
        {user && (
          <User>
            <Avatar
              style={{
                background: `url(${user.photoURL}) no-repeat center center/cover`,
              }}
            />
            <div>
              <h1>{user.userName}</h1>
              <p>{user.emailId}</p>
              {user._id !== activeUser?.currentUser._id && alreadyAdded() ? (
                <button onClick={updateUser}>Add</button>
              ) : (
                ""
              )}
              {!alreadyAdded() && <h4>Already in room</h4>}
            </div>
          </User>
        )}
      </Main>
    </Container>
  );
}

export default Addmember;

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
  justify-content: center;
  box-shadow: 0 0 5px 0px rgba(36, 37, 38, 0.5);
  z-index: 20;
`;

const Close = styled.div`
  margin-left: auto;
  max-width: 30px;
  margin-top: 0 !important;
`;

const Main = styled.div`
  background: #2f3031;
  width: 90%;
  height: fit-content;
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

    span {
      color: #ff0000;
    }

    button {
      padding: 0.5em 1em;
      outline: none;
      width: 100%;
      background: #1877f2;
      border: none;
      border-radius: 8px;
      color: #fff;
      cursor: pointer;
      font-size: 1rem;
      font-weight: bold;
      max-width: 100%;
      margin-top: 1rem;
    }

    label {
      margin-bottom: 0.5em;
      font-size: 1rem;
    }

    input {
      height: 45px;
      font-size: 1rem;
      outline: none;
      border-radius: 8px;
      border: 1px solid #dddfe2;
      padding: 1em;
      margin-bottom: 1em;
      border-color: #dddfe2;
      background-color: #242526;
      color: #fff;

      &:focus {
        border-color: #1877f2 !important;
      }
    }
  }
`;

const Avatar = styled.div`
  width: 100%;
  max-width: 80px;
  height: 80px;
  border-radius: 50%;
  cursor: pointer;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row !important;
  margin-top: 0 !important;
  justify-content: space-between;
  margin-bottom: 1rem;

  div {
    text-align: right !important;
    h1,
    p {
      font-size: 1rem;
      margin: 0 !important;
      text-align: right !important;
    }

    p {
      font-size: 0.9rem;
    }
  }
`;
