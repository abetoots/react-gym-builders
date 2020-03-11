import React from "react";
import NotFound404 from "./NotFound404";
import { renderWithRouter } from "../../misc/shared/helper-funcs";

describe("NotFound404", () => {
  it("finds a navigation link pointing to root url", () => {
    const { getByRole } = renderWithRouter(<NotFound404 />);
    const link = getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });
});
