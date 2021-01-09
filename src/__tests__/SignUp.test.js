import React from "react";
import { render, screen } from "@testing-library/react";
import SignUp from "../SignUp";

describe("Module SignUp", () => {
  // Test all element are in the Document
  test("Test all element are in the Document", () => {
    render(<SignUp />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "SIGN UP"
    );
    expect(screen.getByTestId("inputFirstname")).toBeInTheDocument();
    expect(screen.getByTestId("inputLastname")).toBeInTheDocument();
    expect(screen.getByTestId("inputEmail")).toBeInTheDocument();
    expect(screen.getByTestId("inputPassword")).toBeInTheDocument();
    expect(screen.getByTestId("inputPassword2")).toBeInTheDocument();
    expect(screen.getByTestId("buttonSignUp")).toBeInTheDocument();
  });
});
