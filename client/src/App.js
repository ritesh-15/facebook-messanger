import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./components/Login";
import { selectUser, setLogin } from "./features/users/user";
import { useSelector, useDispatch } from "react-redux";
import axios from "./axios";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("/isUser")
      .then((res) => dispatch(setLogin(res.data)))
      .catch((err) => err);
  }, []);

  console.log("user is", user);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            {user ? (
              <div className="main">
                <Sidebar />
                <Main />
              </div>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
