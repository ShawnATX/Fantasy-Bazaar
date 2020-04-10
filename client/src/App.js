import React from 'react';
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Splash from "./pages/splash";
import NewPlayer from "./pages/newPlayer";
import NoMatch from "./pages/NoMatch";


function App() {
  return (
    <BrowserRouter>
    <div>
      <Switch>
          <Route exact path="/" >
            <Splash />
          </Route>
          <Route exact path="/newplayer">
            <NewPlayer />
          </Route>


          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
