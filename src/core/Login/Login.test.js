import React from "react";
import Login from "./Login";
import { renderWithRouter } from "../../misc/shared/helper-funcs";
import { useStore } from "../../misc/store/store-core";
jest.mock("../../misc/store/store-core");

beforeEach(() => {
  useStore.mockReturnValue([
    {
      authenticated: false,
      errorAuth: {
        output: ""
      }
    },
    () => {}
  ]);
});

describe("Login", () => {
  it("finds a required input of type text with a label of 'login'", () => {
    const { getByLabelText } = renderWithRouter(<Login />);
    const el = getByLabelText(/login/i);
    expect(el).toBeVisible();
    expect(el).toBeRequired();
  });

  it("finds a required input of type password with a label of 'password' auto complete set to 'current-password'", () => {
    const { getByLabelText } = renderWithRouter(<Login />);
    const el = getByLabelText(/password/i);
    expect(el).toBeVisible();
    expect(el).toBeRequired();
    expect(el).toHaveAttribute("autocomplete", "current-password");
  });
});
