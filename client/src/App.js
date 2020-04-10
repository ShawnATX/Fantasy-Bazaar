import React, { useState } from 'react';
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Splash from "./pages/splash";
import NewPlayer from "./pages/newPlayer";
import NoMatch from "./pages/NoMatch";
import playerHome from "./pages/playerHome"
import UserContext from "./utils/userContext";


function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  return (
    <UserContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>

      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" >
              <Splash />
            </Route>
            <Route path="/playerhome" component={playerHome} isPrivate />

            <Route exact path="/newplayer">
              <NewPlayer />
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
