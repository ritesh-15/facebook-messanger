import React, { useState } from "react";
import styled from "styled-components";
import WarningIcon from "@material-ui/icons/Warning";
import axios from "../axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [register, setRegister] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(false);
  const [image, setImage] = useState(null);

  const registerUser = () => {
    if (!name || !image || !email || !password) return;

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
          userName: name,
          password: password,
          email: email,
          fileName: res.data.fileName,
          path: res.data.path,
        };

        axios
          .post("/new/user", data)
          .then((res) => {
            setProfile(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const login = (e) => {
    e.preventDefault();

    if (!email || !password) {
      showError("Please fill information");
      return;
    }

    if (password.length < 7) {
      showError("Password is to short");
      return;
    }
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 2000);
  };

  const selectImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }

    return;
  };

  return (
    <Container>
      <Content>
        {profile ? (
          <Profile>
            <h1>Set Profile Photo</h1>
            <label htmlFor="file">
              <Avatar
                style={
                  image
                    ? {
                        background: `url(${URL.createObjectURL(
                          image
                        )})no-repeat center center/cover`,
                      }
                    : {
                        background: `url(https://png.pngtree.com/png-clipart/20190516/original/pngtree-vector-add-user-icon-png-image_3773557.jpg)no-repeat center center/cover`,
                      }
                }
              />
            </label>
            <input
              onChange={(e) => selectImage(e)}
              type="file"
              style={{ display: "none" }}
              id="file"
              accept="image/jpeg, image/png"
            />
            <button onClick={registerUser} disabled={!image ? true : false}>
              Continue
            </button>
          </Profile>
        ) : (
          <div>
            <form>
              <img src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" />

              {error && (
                <div>
                  <WarningIcon />
                  <p>{error}</p>
                </div>
              )}

              {register && (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Username"
                />
              )}
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email address"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
              {register ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (!name || !email || !password) {
                      showError("Please fill information");
                      return;
                    }

                    setProfile(true);
                  }}
                >
                  Continue
                </button>
              ) : (
                <button onClick={(e) => login(e)} type="submit">
                  Log In
                </button>
              )}
              <a>Forgot password?</a>
            </form>

            <div>
              <button
                onClick={() => {
                  if (register) {
                    setEmail("");
                    setName("");
                    setPassword("");
                    setRegister(false);
                  } else {
                    setEmail("");
                    setName("");
                    setPassword("");
                    setRegister(true);
                  }
                }}
              >
                {register ? "Log In" : "Create new account"}
              </button>
            </div>
          </div>
        )}
      </Content>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  background: #f0f2f5;
`;

const Content = styled.div`
  width: 90%;
  background: #ffffff;
  max-width: 430px;
  padding: 2em;
  border-radius: 20px;
  box-shadow: 0px 0 50px 5px rgba(0, 0, 0, 0.08);

  div {
    width: 100%;
    text-align: center;
    margin-top: 2rem;

    button {
      background: #39a922;
      padding: 0.7em 1em;
      outline: none;
      width: 100%;
      max-width: 250px;
      border: none;
      border-radius: 8px;
      color: #fff;
      cursor: pointer;
      font-size: 1.1rem;
      font-weight: bold;
      text-transform: capitalize;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #dddfe2;
    padding-bottom: 1rem;

    div {
      color: #000;
      margin-bottom: 1rem;
      border: 1px solid #fa3e3e;
      padding: 0.7em 1em;
      margin-top: 0;
      border-radius: 8px;
      color: #fa3e3e;
      display: flex;
      align-items: center;

      p {
        margin-left: 1rem;
      }
    }

    img {
      width: 100%;
      object-fit: contain;
      max-width: 200px;
      margin: 0 auto;
      position: relative;
      top: -40px;
    }

    input {
      height: 50px;
      margin-bottom: 1em;
      outline: none;
      border: 1px solid #dddfe2;
      padding: 0.5em 1em;
      font-size: 1rem;
      border-radius: 6px;

      &:focus-within {
        border-color: #1877f2;
      }
    }

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
    }

    a {
      color: var(--secondary);
      text-align: center;
      margin: 1rem auto;
      cursor: pointer;
      border-bottom: 1px solid #1877f2;
      width: fit-content;
      border-color: transparent;

      &:hover {
        border-color: #1877f2;
      }
    }
  }
`;

const Profile = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #000;
  margin: 0 !important;

  h1 {
    font-size: 1.5rem;
    font-weight: normal;
  }

  label {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  button {
    margin-top: 1rem;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
`;

const Avatar = styled.div`
  width: 100%;
  max-width: 100px;
  height: 100px;
  border-radius: 999px;
  cursor: pointer;
  margin: 0 auto !important;
  margin-top: 1rem !important;
`;
