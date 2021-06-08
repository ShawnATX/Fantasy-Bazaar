import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Splash from "./pages/splash";
import NoMatch from "./pages/NoMatch";
import UserHome from "./pages/userHome";
import GmHome from "./pages/gmHome";
import NewUserType from "./pages/newUserType";
import NewUserCreds from "./pages/newUserCreds";
import NewCharacter from "./pages/newCharacter";
import UserContext from "./utils/userContext";
import Login from "./pages/login";
import NewBazaar from "./pages/newBazaar";

function App() {
  const [authenticationState, setAuthenticationState] = useState({
    updates: 0,
    isAuthenticated: false,
    user: {},
    userHasAuthenticated: (auth, userData) => {
      setAuthenticationState({
        ...authenticationState,
        isAuthenticated: auth,
        user: userData,
        updates: authenticationState.updates++,
      });
    },
  });

  return (
    <UserContext.Provider value={{ authenticationState }}>
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route exact path="/">
              <Splash />
            </Route>

            <Route exact path="/userhome">
              <UserHome />
            </Route>

            <Route exact path="/gmhome">
              <GmHome />
            </Route>

            <Route exact path="/newusertype">
              <NewUserType />
            </Route>

            <Route exact path="/newusercreds/player">
              <NewUserCreds type={"player"} />
            </Route>

            <Route exact path="/newCharacter">
              <NewCharacter />
            </Route>

            <Route exact path="/newusercreds/gm">
              <NewUserCreds type={"gm"} />
            </Route>

            <Route exact path="/newbazaar">
              <NewBazaar />
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
