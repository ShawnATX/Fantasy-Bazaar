import React, { useState, useEffect } from "react";
import "./App.css";
// import { HashRouter, Switch, Route } from "react-router-dom";
import { useRoutes } from "hookrouter";
import routes from "./utils/ReactRoutes";
import UserContext from "./utils/userContext";
import NoMatch from "./pages/NoMatch";

function App() {
  const match = useRoutes(routes);
  useEffect(() => {}, [match]);

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
      {/* <HashRouter> */}
      <main className='app'>
        {match || <NoMatch />}
        {/* <Switch>
            <Route exact path='/' render={() => <Landing />}></Route>
            <Route
              exact
              path='/newusertype'
              render={() => <NewUserType />}
            ></Route>
            <Route
              exact
              path='/newusercreds/player'
              render={() => <NewUserCreds type={"player"} />}
            ></Route>
            <Route
              exact
              path='/newusercreds/gm'
              render={() => <NewUserCreds />}
            ></Route>
            <Route
              exact
              path='/newCharacter'
              render={() => <NewCharacter />}
            ></Route>
            <Route exact path='/newbazaar' render={() => <NewBazaar />}></Route>

            <Route path='/userhome' render={() => <UserHome />}></Route>

            <Route exact path='/login' render={() => <Login />}></Route>

            <Route exact path='/logout' render={() => <Logout />}></Route>

            <Route exact path='/about' render={() => <About />}></Route>

            <Route path='*'>
              <NoMatch />
            </Route>
          </Switch> */}
      </main>
      {/* </HashRouter> */}
    </UserContext.Provider>
  );
}

export default App;
