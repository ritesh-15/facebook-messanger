import React from "react";
import styled from "styled-components";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import CreateIcon from "@material-ui/icons/Create";
import SearchIcon from "@material-ui/icons/Search";
import SidebarItem from "./SidebarItem";
import { useSelector } from "react-redux";
import { selectUser } from "../features/users/user";

function Sidebar() {
  const user = useSelector(selectUser);
  console.log(user);

  return (
    <Container>
      <Top>
        <Avatar
          style={{
            background: `url(${user?.currentUser.photoURL}) no-repeat center center/cover`,
          }}
        />

        <TopRight>
          <div>
            <MoreHorizIcon />
          </div>
          <div>
            <VideoCallIcon />
          </div>
          <div>
            <CreateIcon />
          </div>
        </TopRight>
      </Top>

      <Search>
        <SearchIcon style={{ color: "#96989B" }} />
        <input type="text" placeholder="Search Messanger" />
      </Search>
      <Items>
        <SidebarItem
          img="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          name="ritesh khore"
          message="Hi this is first message"
          active
        />
        <SidebarItem
          img="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          name="ritesh khore"
          message="Hi this is first message"
        />
      </Items>
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 1rem;
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

  h1 {
    font-size: 1.5rem;
  }
`;

const TopRight = styled.div`
  display: flex;
  align-items: center;

  div {
    background: var(--bg);
    border-radius: 50%;
    margin-right: 0.5rem;
    padding: 0.35rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all 0.25s ease-in;

    &:hover {
      background: rgba(58, 59, 60, 0.7);
    }
  }
`;

const Search = styled.div`
  width: 100%;
  background: var(--bg);
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
    color: #fff;
  }
`;

const Items = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
