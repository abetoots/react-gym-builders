import React from "react";
import Footer from "./Footer";
import { render } from "@testing-library/react";

describe("Footer", () => {
  it("has a copyright", () => {
    const { getByText } = render(<Footer />);
    const el = getByText(/copyright/i);
    expect(el).toBeVisible();
  });
});
