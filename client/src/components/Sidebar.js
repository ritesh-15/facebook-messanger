import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import CreateIcon from "@material-ui/icons/Create";
import SearchIcon from "@material-ui/icons/Search";
import SidebarItem from "./SidebarItem";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setLogOut } from "../features/users/user";
import { CloseOutlined } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "../axios";
import { Link, useHistory, useParams } from "react-router-dom";
import { selectMessages } from "../features/messages/message";
import Room from "./Room";
import { selectSocket } from "../features/socket/socket";

function Sidebar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
  const [chats, setChats] = useState([]);
  const history = useHistory();
  const { id } = useParams();
  const [room, setRoom] = useState(false);
  const socket = useSelector(selectSocket);

  useEffect(() => {
    axios
      .get("/all/rooms")
      .then((res) => setChats(res.data))
      .catch((err) => console.log(err));
  }, []);

  socket.on("roomAdded", (room) => {
    setChats([...chats, room]);
  });

  const logout = () => {
    axios
      .get("/logout")
      .then((res) => {
        history.push("/login");
        dispatch(setLogOut());
      })
      .catch((err) => console.log(err));
  };

  const checkRoom = (chat) => {
    let result;
    user?.currentUser.rooms.map((room) => {
      if (room.roomId === chat.roomId) {
        result = true;
      }
    });

    return result;
  };

  return (
    <Container>
      <Top>
        <Avatar
          style={{
            background: `url(${user?.currentUser.photoURL}) no-repeat center center/cover`,
          }}
          onClick={() => setShowProfile(true)}
        />

        <TopRight>
          <div>
            <MoreHorizIcon />
          </div>
          <div>
            <VideoCallIcon />
          </div>
          <div>
            <Create onClick={(e) => setRoom(true)} />
          </div>
        </TopRight>

        {room && <Room setRoom={setRoom} />}

        {showProfile && (
          <User>
            <p>
              <Close onClick={() => setShowProfile(false)} />
            </p>
            <div>
              <UserProfile
                style={{
                  background: `url(${user?.currentUser.photoURL}) no-repeat center center/cover`,
                }}
              />
              <h1>{user?.currentUser.userName}</h1>
              <h3>{user?.currentUser.emailId}</h3>
              <button onClick={logout}>
                <ExitToAppIcon />

                <span>Log out</span>
              </button>
            </div>
          </User>
        )}
      </Top>

      <Search>
        <SearchIcon style={{ color: "#96989B" }} />
        <input type="text" placeholder="Search Messanger" />
      </Search>
      <Items>
        {chats.map((chat) => {
          if (
            chat.type === "public" ||
            chat.createdId === user?.currentUser._id ||
            checkRoom(chat)
          ) {
            return (
              <Link key={chat._id} to={`/room/${chat.roomId}`}>
                <SidebarItem img={chat.roomPhotoURL} name={chat.roomName} />
              </Link>
            );
          }
        })}
      </Items>
    </Container>
  );
}

export default Sidebar;

const Create = styled(CreateIcon)``;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 1rem;
  max-width: 500px;
  border-right: 1px solid #393a3b;
`;

const Avatar = styled.div`
  width: 100%;
  max-width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  h1 {
    font-size: 1.5rem;
  }
`;

const User = styled.div`
  position: fixed;
  width: 90%;
  max-width: 300px;
  background: #3a3b3c;
  padding: 1rem;
  height: fit-content;
  z-index: 10;
  top: 3%;
  left: 5%;
  border-radius: 6px;
  box-shadow: 0 0 30px 10px rgba(0, 0, 0, 0.08);

  p {
    text-align: right;
  }

  div {
    h1 {
      text-align: center;
      font-size: 1.5rem;
      margin-top: 0.5rem;
      text-transform: capitalize;
      color: #e4e6de;
    }

    h3 {
      text-align: center;
      margin: 0.5rem 0;
      color: #b0b3b8;
    }

    button {
      margin-top: 1rem;
      width: 100%;
      padding: 0.6rem 1rem;
      font-size: 1rem;
      background: transparent;
      border-radius: 8px;
      outline: none;
      border: none;
      color: #4a4a4a;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 160ms ease-in-out;

      &:hover {
        background: #f0f2f5;
      }

      span {
        margin-left: 1rem;
        font-weight: bold;
        text-transform: capitalize;
      }
    }
  }
`;

const UserProfile = styled(Avatar)`
  max-width: 120px;
  height: 120px;
  margin: 0.5rem auto;
`;

const Close = styled(CloseOutlined)`
  cursor: pointer !important;
`;

const TopRight = styled.div`
  display: flex;
  align-items: center;

  div {
    background: #3a3b3c;
    border-radius: 50%;
    margin-right: 0.5rem;
    padding: 0.35rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all 0.25s ease-in;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const Search = styled.div`
  width: 100%;
  background: #3a3b3c;
  padding: 0.5rem;
  margin-top: 1em;
  border-radius: 999px;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  input {
    background: transparent;
    border: none;
    outline: none;
    margin-left: 0.5em;
    font-size: 1em;
    color: #b0b3b8;
  }
`;

const Items = styled.div`
  width: 100%;
  height: 85vh;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
