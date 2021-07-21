import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Landing from "./landing";
import React from "react";
import { MemoryRouter } from "react-router-dom";

describe("Landing Page", () => {
  test("renders buttons", () => {
    //Arrange
    render(<Landing />, { wrapper: MemoryRouter });
    //Act
    //Assert
    const allButtons = screen.getAllByRole("button");
    expect(allButtons[0]).toHaveTextContent("Get Started");
    expect(allButtons[1]).toHaveTextContent("Login Here");
    expect(allButtons[2]).toHaveTextContent("About");
  });

  test("Get Started button goes to New User page", () => {
    //Arrange
    render(<Landing />, { wrapper: MemoryRouter });
    //Act
    const getStartedBtn = screen.getByText("Get Started");
    //Assert
    userEvent.click(getStartedBtn);
    const allButtons = screen.getAllByRole("button");
    expect(allButtons[0]).toHaveTextContent("Create a new Bazaar");
    expect(allButtons[1]).toHaveTextContent("Join a Bazaar");
  });
});
