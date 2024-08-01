import React from "react";
import { render, screen } from "@testing-library/react";
import { WeekView } from "./WeekView";

test("renders learn react link", () => {
  render(<WeekView />);
  const hello = screen.getByText(/hello/i);
  expect(hello).toBeInTheDocument();
  const notHello = screen.queryByText(/react/i);
  expect(notHello).toBeNull();
});
