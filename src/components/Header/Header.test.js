import React from "react";
import Header from "./Header";
import { renderWithRouter } from "../../misc/shared/helper-funcs";

describe("Header", () => {
  it("finds a navigation menu", () => {
    const { getByRole } = renderWithRouter(<Header />);
    const menu = getByRole("navigation");
    expect(menu).toBeInTheDocument();
    expect(menu).toHaveClass("-hidden");
  });

  it("finds a logo with an alt text", () => {
    const { getByAltText } = renderWithRouter(<Header />);

    const menu = getByAltText(/logo/i);
    expect(menu).toBeInTheDocument();
  });

  it("finds a menu button", () => {
    const { getByRole } = renderWithRouter(<Header />);
    const menuBtn = getByRole("button");
    expect(menuBtn).toBeInTheDocument();
  });
});
