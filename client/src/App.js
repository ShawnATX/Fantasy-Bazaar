import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserContext from "./utils/userContext";
import Splash from "./pages/splash";
import NoMatch from "./pages/NoMatch";
import CharacterHome from "./pages/characterHome";
import GmHome from "./pages/gmHome";
import NewUserType from "./pages/newUserType";
import NewUserCreds from "./pages/newUserCreds";
import NewCharacter from "./pages/newCharacter";
import BazaarHome from "./pages/bazaarHome";
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
            <Route exact path="/" render={() => <Splash />}></Route>
            <Route
              exact
              path="/characterhome"
              render={() => <CharacterHome />}
            ></Route>
            <Route exact path="/gmhome">
              <GmHome />
            </Route>
            <Route
              exact
              path="/newusertype"
              render={() => <NewUserType />}
            ></Route>
            <Route
              exact
              path="/newusercreds/player"
              render={() => <NewUserCreds type={"player"} />}
            ></Route>
            <Route
              exact
              path="/newusercreds/gm"
              render={() => <NewUserCreds />}
            ></Route>
            <Route
              exact
              path="/newCharacter"
              render={() => <NewCharacter />}
            ></Route>
            <Route exact path="/newbazaar" render={() => <NewBazaar />}></Route>
            <Route
              exact
              path="/bazaarhome"
              render={() => <BazaarHome />}
            ></Route>
            <Route exact path="/login" render={() => <Login />}></Route>
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
