import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { createMemoryHistory } from "history";
import { Router, HashRouter, MemoryRouter } from "react-router-dom";
import { createHashHistory } from "history";

import Landing from "./pages/landing";
import NoMatch from "./pages/NoMatch";
import NewUserType from "./pages/newUserType";
import NewUserCreds from "./pages/newUserCreds";
import NewCharacter from "./pages/newCharacter";
import Login from "./pages/login";
import NewBazaar from "./pages/newBazaar";
import UserHome from "./pages/userHome";
import Logout from "./pages/logout";
import About from "./pages/about";

import App from "./App";

describe("Base App working...", () => {
  const history = createHashHistory({ initialEntries: ["/"] });
  test("app loads and hits landing page", () => {
    render(
      <HashRouter history={history}>
        <App />
      </HashRouter>
    );
    const allButtons = screen.getAllByRole("button");
    expect(allButtons[0]).toHaveTextContent("Get Started");
    expect(allButtons[1]).toHaveTextContent("Login Here");
    expect(allButtons[2]).toHaveTextContent("About");
  });

  test("no match page loads on a bad route", () => {
    history.push("/bogusRoute");
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );
    expect(screen.getByText(/Head back Home/i)).toBeInTheDocument();
  });
});
