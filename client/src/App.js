import React, { useState } from 'react';
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Splash from "./pages/splash";
import NewPlayer from "./pages/newPlayer";
import NoMatch from "./pages/NoMatch";
import PlayerHome from "./pages/playerHome"
import GmHome from "./pages/gmHome"

import UserContext from "./utils/userContext";
import Login from "./pages/login";

function App() {
  const [authenticationState, setAuthenticationState] = useState({
    updates: 0,
    isAuthenticated: false,
    user: {},
    userHasAuthenticated: (auth, userData) => {
      setAuthenticationState({...authenticationState, isAuthenticated: auth, user: userData, updates: authenticationState.updates++ })
    }
  });

  return (
    <UserContext.Provider value={{ authenticationState }}>
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route exact path="/" >
              <Splash />
            </Route>

            <Route exact path="/playerhome">
              <PlayerHome />
            </Route>

            <Route exact path="/gmhome">
              <GmHome />
            </Route>

            <Route exact path="/newplayer">
              <NewPlayer />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>

            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
