import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

window.IntersectionObserver = jest.fn(function (
  this: IntersectionObserver,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) {
  this.observe = jest.fn();
  return this;
});

test("renders Infinite Loader Component", () => {
  render(<App />);
  const linkElement = screen.getByTestId("infinite_loader");
  expect(linkElement).toBeInTheDocument();
});
