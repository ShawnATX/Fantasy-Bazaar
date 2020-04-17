import React, { useState } from 'react';
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Splash from "./pages/splash";
import NewPlayer from "./pages/newPlayer";
import NoMatch from "./pages/NoMatch";
import playerHome from "./pages/playerHome"
import UserContext from "./utils/userContext";
import Login from "./pages/login";

function App() {
  const [authenticationState, setAuthenticationState] = useState({
    updates: 0,
    isAuthenticated: false,
    user: {},
    userHasAuthenticated: (auth, userData) => {
      //console.log(auth, userData);
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
            <Route exact path="/playerhome" component={playerHome} isPrivate />

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
