import React, { useState, useEffect } from "react";
import "./App.css";
import { useRoutes } from "hookrouter";
import routes from "./utils/ReactRoutes";
import UserContext from "./utils/userContext";
import NoMatch from "./pages/NoMatch";

function App() {
  const match = useRoutes(routes);

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
      <main className='app'>{match || <NoMatch />}</main>
    </UserContext.Provider>
  );
}

export default App;
