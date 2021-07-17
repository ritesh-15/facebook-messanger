import React, { useEffect, useState } from "react";
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
import { CircularProgress } from "@material-ui/core";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    setLoading(true);
    axios
      .get("/isUser")
      .then((res) => {
        setLoading(false);
        dispatch(setLogin(res.data));
      })
      .catch((err) => setLoading(false));
  }, []);

  return (
    <div className="App">
      {loading && (
        <div className="loading">
          <div className="loading-div">
            <CircularProgress className="spinner" />
          </div>
        </div>
      )}
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
