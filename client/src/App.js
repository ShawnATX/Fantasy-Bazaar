import React, { useState } from "react";
import "./App.css";
import { useRoutes } from "hookrouter";
import routes from "./utils/ReactRoutes";
import UserContext from "./utils/userContext";
import NoMatch from "./pages/NoMatch";
import CookieConsent from "react-cookie-consent";

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
      <main className='app'>
        {match || <NoMatch />}
        <CookieConsent
          containerClasses='col-lg-12'
          contentStyle={{
            backgroundColor: "#343a40",
          }}
          style={{
            backgroundColor: "#343a40",
            fontWeight: "1.1em",
          }}
          buttonClasses='btn btn-secondary'
          buttonStyle={{
            backgroundColor: "white",
          }}
        >
          This website uses cookies to enhance the user experience.{" "}
        </CookieConsent>
      </main>
    </UserContext.Provider>
  );
}

export default App;
