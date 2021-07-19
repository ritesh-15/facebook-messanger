import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";
import VideocamIcon from "@material-ui/icons/Videocam";
import ErrorIcon from "@material-ui/icons/Error";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { AddOutlined } from "@material-ui/icons";
import Addmember from "./Addmember";
import { useSelector } from "react-redux";
import { selectUser } from "../features/users/user";

function MainTop() {
  const { id } = useParams();
  const [room, setRoom] = useState();
  const [add, setAdd] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    axios
      .get(`/get/details/${id}`)
      .then((res) => setRoom(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <Container>
      <Left>
        <Avatar
          style={{
            background: `url(${room?.roomPhotoURL}) no-repeat center center/cover`,
          }}
        />
        <Text>
          <h6>{room?.roomName}</h6>
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
        {user?.currentUser._id === room?.createdId && (
          <Add
            onClick={(e) => setAdd(true)}
            style={{
              color: "var(--secondary)",
              marginRight: "0.8rem",
              cursor: "pointer",
              fontSize: "1.8rem",
            }}
          />
        )}
      </Right>
      {add && <Addmember setAdd={setAdd} room={room} />}
    </Container>
  );
}

export default MainTop;

const Add = styled(AddOutlined)``;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5em;
  border-bottom: 1px solid #e5e5e5;
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
