import React from "react";
import BurgerMenu from "./BurgerMenu";
import { render } from "@testing-library/react";

describe("BurgerMenu", () => {
  it("finds a screen readable (hidden or not) text 'Menu'", () => {
    const { getByText } = render(<BurgerMenu handleClick={() => {}} />);
    const text = getByText(/menu/i);
    expect(text).toBeInTheDocument();
  });
});
